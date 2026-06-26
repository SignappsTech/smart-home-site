/**
 * Signapps — Kalkulator marže (Google Apps Script)
 * ====================================================
 * HOW TO USE:
 *  1. Open a blank Google Sheet.
 *  2. Click Extensions → Apps Script.
 *  3. Delete any existing code, paste this entire file.
 *  4. Click Save, then Run → createProfitCalculator().
 *  5. Grant permissions when prompted.
 *  6. Return to the Sheet — two sheets are ready to use.
 *
 * The script is non-destructive: run it again to rebuild
 * the sheets (existing sheets named "Cenik naprav" and
 * "Kalkulacija" will be deleted and recreated).
 */

// ---------------------------------------------------------------------------
// Device catalog — same data as src/app/calculator/page.tsx
// ---------------------------------------------------------------------------
var DEVICES = [
  { name: "Luč — relay modul",   note: "npr. Shelly 1",       std: 15,  prem: 28  },
  { name: "Senčilo relay",        note: "npr. Shelly 2.5",     std: 22,  prem: 38  },
  { name: "Splošni relej",        note: "1-kanalni",           std: 12,  prem: 22  },
  { name: "Termostat",            note: "Zigbee/Wi-Fi",        std: 45,  prem: 90  },
  { name: "Pametna ključavnica",  note: "",                    std: 120, prem: 260 },
  { name: "Video zvonec",         note: "",                    std: 85,  prem: 190 },
  { name: "Senzor",               note: "gibanje / okno",      std: 16,  prem: 32  },
  { name: "Pametna vtičnica",     note: "",                    std: 18,  prem: 32  },
  { name: "RGBW svetlobni trak",  note: "na meter",            std: 12,  prem: 25  },
  { name: "Home Assistant hub",   note: "mini PC / Raspberry", std: 85,  prem: 160 },
];

// ---------------------------------------------------------------------------
// Plan defaults
// ---------------------------------------------------------------------------
var PLANS = [
  {
    name: "Osnovni",
    sellPrice: 2500,
    electricianCost: 400,
    itSplits: 2,
    defaultCounts: [3, 2, 0, 0, 0, 0, 0, 0, 0, 1],
  },
  {
    name: "Napredni",
    sellPrice: 8000,
    electricianCost: 1200,
    itSplits: 2,
    defaultCounts: [8, 5, 2, 1, 1, 1, 4, 3, 0, 1],
  },
  {
    name: "Premium",
    sellPrice: 15000,
    electricianCost: 2500,
    itSplits: 2,
    defaultCounts: [20, 12, 4, 3, 2, 2, 10, 6, 15, 1],
  },
];

// ---------------------------------------------------------------------------
// Colours
// ---------------------------------------------------------------------------
var C = {
  header:      { bg: "#1e3a5f", fg: "#ffffff" },
  input:       { bg: "#fff9c4", fg: "#1a1a1a" },
  output:      { bg: "#d4edda", fg: "#1a1a1a" },
  outputAlert: { bg: "#f8d7da", fg: "#721c24" },
  device:      { bg: "#f0f4ff", fg: "#1a1a1a" },
  label:       { bg: "#e8eaf6", fg: "#3c3c3c" },
  summary:     { bg: "#e3f2fd", fg: "#1a1a1a" },
  white:       { bg: "#ffffff", fg: "#1a1a1a" },
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------
function createProfitCalculator() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  deleteSheetIfExists(ss, "Cenik naprav");
  deleteSheetIfExists(ss, "Kalkulacija");

  buildDeviceCatalog(ss);
  buildCalculator(ss);

  // Activate the calculator sheet
  ss.setActiveSheet(ss.getSheetByName("Kalkulacija"));
  SpreadsheetApp.getUi().alert("✅ Kalkulator marže je pripravljen!\n\nVnesi podatke v rumena polja.");
}

// ---------------------------------------------------------------------------
// Sheet 1 — "Cenik naprav"
// ---------------------------------------------------------------------------
function buildDeviceCatalog(ss) {
  var sh = ss.insertSheet("Cenik naprav", 0);

  // Title
  var titleRange = sh.getRange("A1:D1");
  titleRange.merge().setValue("Cenik naprav — Signapps")
    .setBackground(C.header.bg).setFontColor(C.header.fg)
    .setFontSize(13).setFontWeight("bold").setHorizontalAlignment("center");

  // Column headers
  var headers = ["Naprava", "Opomba", "Cena standard (€)", "Cena premium (€)"];
  sh.getRange(2, 1, 1, 4).setValues([headers])
    .setBackground(C.label.bg).setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Device rows
  var rows = DEVICES.map(function(d) {
    return [d.name, d.note, d.std, d.prem];
  });
  sh.getRange(3, 1, rows.length, 4).setValues(rows)
    .setBackground(C.device.bg).setFontColor(C.device.fg);

  // Format price columns
  sh.getRange(3, 3, rows.length, 2).setNumberFormat("€#,##0.00");

  // Column widths
  sh.setColumnWidth(1, 200);
  sh.setColumnWidth(2, 180);
  sh.setColumnWidth(3, 140);
  sh.setColumnWidth(4, 140);

  // Freeze header
  sh.setFrozenRows(2);

  // Note
  sh.getRange(3 + rows.length + 1, 1).setValue("Posodobi cene tukaj — kalkulacija se samodejno posodobi.")
    .setFontStyle("italic").setFontColor("#888888").setFontSize(10);
}

// ---------------------------------------------------------------------------
// Sheet 2 — "Kalkulacija"
// ---------------------------------------------------------------------------
function buildCalculator(ss) {
  var sh = ss.insertSheet("Kalkulacija", 1);
  var catalogName = "Cenik naprav";
  var numDevices = DEVICES.length;

  // Each plan occupies 5 columns; plans start at column 2 (B), 7 (G), 12 (L)
  // Layout per plan block (col offset from plan start):
  //   0: labels
  //   1: values / inputs
  // We use a wider layout: col A = row labels, then 2-col blocks per plan

  // ---- Page title ----
  sh.getRange("A1:F1").merge()
    .setValue("Kalkulator marže — Signapps")
    .setBackground(C.header.bg).setFontColor(C.header.fg)
    .setFontSize(14).setFontWeight("bold").setHorizontalAlignment("center");

  // Summary table starts at row 2
  buildSummaryTable(sh, catalogName, numDevices);

  // Plan blocks start at row (2 + summary height + gap)
  // Summary: 1 header + 7 metric rows = 8 rows → block starts at row 11
  var planStartRow = 12;
  var planCols = [2, 5, 8]; // column indices (1-based) for plan label columns

  for (var i = 0; i < PLANS.length; i++) {
    buildPlanBlock(sh, PLANS[i], i, planCols[i], planStartRow, catalogName, numDevices);
  }

  // Column widths
  sh.setColumnWidth(1, 10);  // A: spacer
  for (var c = 0; c < 3; c++) {
    sh.setColumnWidth(planCols[c],     160); // label col
    sh.setColumnWidth(planCols[c] + 1, 120); // value col
  }
  sh.setColumnWidth(planCols[2] + 2, 20); // trailing spacer

  sh.setFrozenRows(1);
}

// ---------------------------------------------------------------------------
// Summary comparison table (rows 2–10)
// ---------------------------------------------------------------------------
function buildSummaryTable(sh, catalogName, numDevices) {
  // planStartRow for each plan block — we'll reference these cells via formulas later
  // For now build as a cross-reference. We reference the calculated cells.
  // Summary rows: 3–10 (1 header row at row 2)
  var summaryLabels = [
    "Prodajna cena (€)",
    "Strošek naprav (€)",
    "Bruto zaslužek (€)",
    "Bruto marža (%)",
    "Delež elektro (€)",
    "IT delež skupaj (€)",
    "IT delež na osebo (€)",
  ];

  var planNames = PLANS.map(function(p) { return p.name; });

  // Header row
  sh.getRange(2, 2).setValue("").setBackground(C.label.bg);
  for (var pi = 0; pi < 3; pi++) {
    sh.getRange(2, 3 + pi).setValue(planNames[pi])
      .setBackground(C.header.bg).setFontColor(C.header.fg)
      .setFontWeight("bold").setHorizontalAlignment("center");
  }
  sh.getRange(2, 2).setValue("Primerjava paketov")
    .setBackground(C.label.bg).setFontWeight("bold");

  // Metric label rows
  for (var r = 0; r < summaryLabels.length; r++) {
    sh.getRange(3 + r, 2).setValue(summaryLabels[r])
      .setBackground(C.label.bg).setFontColor(C.label.fg);
  }

  // The actual values will be filled in after plan blocks exist.
  // We use formulas that reference the plan output cells.
  // Plan block output cells (row offsets from planStartRow=12):
  //   Sell price:         row 12+2  = 14  (input row)  → col planCols[i]+1
  //   Hardware cost:      row 12+4+numDevices+1 (output block)
  // We store references as named helpers — see buildPlanBlock which returns
  // an object with the cell addresses. Instead, wire them in buildSummaryRefs.

  // Style the summary area border
  sh.getRange(2, 2, summaryLabels.length + 1, 4)
    .setBorder(true, true, true, true, true, true, "#cccccc", SpreadsheetApp.BorderStyle.SOLID);
}

// ---------------------------------------------------------------------------
// Per-plan block
// ---------------------------------------------------------------------------
function buildPlanBlock(sh, plan, planIndex, labelCol, startRow, catalogName, numDevices) {
  var valCol = labelCol + 1;
  var row = startRow;

  // ---- Plan title ----
  sh.getRange(row, labelCol, 1, 2).merge()
    .setValue(plan.name)
    .setBackground(C.header.bg).setFontColor(C.header.fg)
    .setFontSize(12).setFontWeight("bold").setHorizontalAlignment("center");
  row++;

  // ---- Tier selector ----
  sh.getRange(row, labelCol).setValue("Kakovostni nivo").setBackground(C.label.bg).setFontColor(C.label.fg);
  var tierCell = sh.getRange(row, valCol);
  tierCell.setValue("Standard").setBackground(C.input.bg).setFontColor(C.input.fg).setFontWeight("bold");
  var tierRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Standard", "Premium"], true).build();
  tierCell.setDataValidation(tierRule);
  var tierCellA1 = tierCell.getA1Notation();
  row++;

  // ---- Sell price ----
  sh.getRange(row, labelCol).setValue("Prodajna cena (€)").setBackground(C.label.bg).setFontColor(C.label.fg);
  var sellCell = sh.getRange(row, valCol);
  sellCell.setValue(plan.sellPrice).setBackground(C.input.bg).setFontColor(C.input.fg)
    .setNumberFormat("€#,##0.00");
  var sellCellA1 = sellCell.getA1Notation();
  row++;

  // ---- Electrician cost ----
  sh.getRange(row, labelCol).setValue("Strošek elektroinštalaterja (€)").setBackground(C.label.bg).setFontColor(C.label.fg);
  var elecCell = sh.getRange(row, valCol);
  elecCell.setValue(plan.electricianCost).setBackground(C.input.bg).setFontColor(C.input.fg)
    .setNumberFormat("€#,##0.00");
  var elecCellA1 = elecCell.getA1Notation();
  row++;

  // ---- IT splits ----
  sh.getRange(row, labelCol).setValue("Število deležev IT ekipe").setBackground(C.label.bg).setFontColor(C.label.fg);
  var splitsCell = sh.getRange(row, valCol);
  splitsCell.setValue(plan.itSplits).setBackground(C.input.bg).setFontColor(C.input.fg);
  var splitsCellA1 = splitsCell.getA1Notation();
  row++;

  // ---- Device table header ----
  sh.getRange(row, labelCol, 1, 2).merge()
    .setValue("Naprave — količine")
    .setBackground(C.label.bg).setFontWeight("bold").setHorizontalAlignment("center");
  row++;

  // ---- Sub-headers ----
  sh.getRange(row, labelCol).setValue("Naprava").setBackground(C.label.bg).setFontWeight("bold");
  sh.getRange(row, valCol).setValue("Količina").setBackground(C.label.bg).setFontWeight("bold").setHorizontalAlignment("center");
  row++;

  // ---- Device rows ----
  var deviceStartRow = row;
  var deviceValueCells = [];
  for (var di = 0; di < DEVICES.length; di++) {
    var device = DEVICES[di];
    var count = plan.defaultCounts[di] || 0;

    // Label (device name + unit price formula)
    var stdPriceRef  = "'" + catalogName + "'!C" + (3 + di);
    var premPriceRef = "'" + catalogName + "'!D" + (3 + di);
    var priceFormula = '=IF(' + tierCellA1 + '="Premium",' + premPriceRef + ',' + stdPriceRef + ')';

    sh.getRange(row, labelCol).setValue(device.name).setBackground(C.device.bg).setFontColor(C.device.fg);

    // Count input (yellow)
    var countCell = sh.getRange(row, valCol);
    countCell.setValue(count).setBackground(C.input.bg).setFontColor(C.input.fg).setHorizontalAlignment("center");
    deviceValueCells.push({ countCellA1: countCell.getA1Notation(), di: di });

    row++;
  }

  // ---- Outputs ----
  row++; // blank spacer

  // Hardware cost = SUM of (count × price per device)
  var hwParts = deviceValueCells.map(function(dvc) {
    var stdPriceRef2  = "'" + catalogName + "'!C" + (3 + dvc.di);
    var premPriceRef2 = "'" + catalogName + "'!D" + (3 + dvc.di);
    return dvc.countCellA1 + '*IF(' + tierCellA1 + '="Premium",' + premPriceRef2 + ',' + stdPriceRef2 + ')';
  });
  var hwFormula = '=' + hwParts.join('+');

  sh.getRange(row, labelCol).setValue("Strošek naprav (€)").setBackground(C.label.bg).setFontColor(C.label.fg).setFontWeight("bold");
  var hwCell = sh.getRange(row, valCol);
  hwCell.setFormula(hwFormula).setBackground(C.output.bg).setFontColor(C.output.fg)
    .setNumberFormat("€#,##0.00").setFontWeight("bold");
  var hwCellA1 = hwCell.getA1Notation();
  row++;

  // Gross profit
  sh.getRange(row, labelCol).setValue("Bruto zaslužek (€)").setBackground(C.label.bg).setFontColor(C.label.fg).setFontWeight("bold");
  var gpCell = sh.getRange(row, valCol);
  gpCell.setFormula('=' + sellCellA1 + '-' + hwCellA1)
    .setNumberFormat("€#,##0.00").setFontWeight("bold");
  conditionalOutputFormat(gpCell);
  var gpCellA1 = gpCell.getA1Notation();
  row++;

  // Gross margin %
  sh.getRange(row, labelCol).setValue("Bruto marža (%)").setBackground(C.label.bg).setFontColor(C.label.fg);
  var gmCell = sh.getRange(row, valCol);
  gmCell.setFormula('=IF(' + sellCellA1 + '>0,' + gpCellA1 + '/' + sellCellA1 + '*100,0)')
    .setNumberFormat("0.0\"%\"");
  conditionalOutputFormat(gmCell);
  row++;

  // Electrician share (just the input value for clarity)
  sh.getRange(row, labelCol).setValue("Delež elektroinštalaterja (€)").setBackground(C.label.bg).setFontColor(C.label.fg);
  sh.getRange(row, valCol).setFormula('=' + elecCellA1)
    .setBackground(C.output.bg).setFontColor(C.output.fg).setNumberFormat("€#,##0.00");
  row++;

  // IT share total
  sh.getRange(row, labelCol).setValue("IT delež skupaj (€)").setBackground(C.label.bg).setFontColor(C.label.fg).setFontWeight("bold");
  var itCell = sh.getRange(row, valCol);
  itCell.setFormula('=' + gpCellA1 + '-' + elecCellA1)
    .setNumberFormat("€#,##0.00").setFontWeight("bold");
  conditionalOutputFormat(itCell);
  var itCellA1 = itCell.getA1Notation();
  row++;

  // IT per person
  sh.getRange(row, labelCol).setValue("IT delež na osebo (€)").setBackground(C.label.bg).setFontColor(C.label.fg);
  var itppCell = sh.getRange(row, valCol);
  itppCell.setFormula('=IF(' + splitsCellA1 + '>0,' + itCellA1 + '/' + splitsCellA1 + ',0)')
    .setNumberFormat("€#,##0.00");
  conditionalOutputFormat(itppCell);
  row++;

  // ---- Wire summary table ----
  // Summary table is at rows 3–9, cols 3+planIndex
  var summaryCol = 3 + planIndex;
  var summaryRows = [sellCellA1, hwCellA1, gpCellA1, null, elecCellA1, itCellA1, null];
  // Margin % and IT/person need their own refs
  var summaryFormulas = [
    '=' + sellCellA1,
    '=' + hwCellA1,
    '=' + gpCellA1,
    '=IF(' + sellCellA1 + '>0,' + gpCellA1 + '/' + sellCellA1 + '*100,0)',
    '=' + elecCellA1,
    '=' + itCellA1,
    '=IF(' + splitsCellA1 + '>0,' + itCellA1 + '/' + splitsCellA1 + ',0)',
  ];
  var summaryFormats = ["€#,##0.00","€#,##0.00","€#,##0.00","0.0\"%\"","€#,##0.00","€#,##0.00","€#,##0.00"];
  for (var sr = 0; sr < summaryFormulas.length; sr++) {
    var sCell = sh.getRange(3 + sr, summaryCol);
    sCell.setFormula(summaryFormulas[sr]).setNumberFormat(summaryFormats[sr])
      .setBackground(C.summary.bg).setFontColor(C.summary.fg).setHorizontalAlignment("right");
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function conditionalOutputFormat(cell) {
  // Green if positive, red if negative, neutral if zero
  // We apply a fixed colour at build time based on default values,
  // then add conditional formatting rules.
  cell.setBackground(C.output.bg).setFontColor(C.output.fg);

  var sheet = cell.getSheet();
  var range = cell;
  var greenRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setBackground("#d4edda").setFontColor("#1a4731")
    .setRanges([range]).build();
  var redRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setBackground("#f8d7da").setFontColor("#721c24")
    .setRanges([range]).build();

  var rules = sheet.getConditionalFormatRules();
  rules.push(greenRule);
  rules.push(redRule);
  sheet.setConditionalFormatRules(rules);
}

function deleteSheetIfExists(ss, name) {
  var existing = ss.getSheetByName(name);
  if (existing) ss.deleteSheet(existing);
}
