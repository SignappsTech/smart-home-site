/** Feature/functionality content (Slovenian) for /funkcionalnosti/. */
export const featuresContent = {
  intro:
    "Pametni dom ali pisarna nista le ena naprava — sta povezana sistema, ki poskrbita za udobje, varnost in nižjo porabo. Tukaj je nekaj najpogostejših scenarijev, ki jih postavimo za vas.",

  // Highlight block: OUR custom dashboard is a real differentiator vs. a raw HA
  // panel. Honest framing — you arrange it yourself (drag & drop typed cards),
  // and WE add/configure new devices so they land as the correct card type.
  dashboard: {
    eyebrow: "Naša nadzorna plošča",
    title: "Pregledna nadzorna plošča — ne surov tehnični panel",
    text: "Namesto golega, tehničnega vmesnika dobite čisto, oblikovano nadzorno ploščo, ki jo zna uporabljati vsa družina ali ekipa. Vsaka naprava ima svojo kartico glede na tip — luči, senzorji, ogrevanje, kamere — razporeditev pa prosto urejate sami.",
    points: [
      "Čist, oblikovan vmesnik — preprost za vsakdanjo rabo",
      "Tipizirane kartice: luči, senzorji, ogrevanje, kamere …",
      "Razporeditev prilagajate sami (povleci in spusti)",
      "Nove naprave za vas dodamo in pravilno nastavimo",
      "Enaka izkušnja na telefonu, tablici in računalniku",
    ],
  },

  groups: [
    {
      title: "Razsvetljava",
      icon: "lightbulb",
      text: "Pametne luči in scene za vsak trenutek — od jutranjega prebujanja do večernega filma. Samodejni vklop ob gibanju ali mraku.",
      points: ["Philips Hue in druge pametne luči", "Scene in časovniki", "Vklop ob gibanju ali somraku", "Urniki za sejne sobe in pisarniške cone"],
    },
    {
      title: "Varnost",
      icon: "shield",
      text: "Pametne ključavnice, video zvonci in senzorji odpiranja vas obvestijo, kaj se dogaja doma — kjer koli ste.",
      points: ["Aqara ključavnice in senzorji", "Video zvonec z obvestili", "Simulacija prisotnosti"],
    },
    {
      title: "Ogrevanje in klima",
      icon: "air-vent",
      text: "Krmiljenje ogrevanja po prostorih in urnikih. Dom se ogreje, ko se vračate, in varčuje, ko ste odsotni.",
      points: ["Termostati in talno ogrevanje", "Urniki po prostorih", "Samodejno znižanje ob odsotnosti"],
    },
    {
      title: "Poraba energije",
      icon: "bolt",
      text: "Shelly meritve porabe pokažejo, kje teče energija. Vtičnice in porabnike izklopite z enim dotikom ali samodejno.",
      points: ["Spremljanje porabe v realnem času", "Pametne vtičnice", "Opozorila in samodejni izklop"],
    },
  ],
} as const;
