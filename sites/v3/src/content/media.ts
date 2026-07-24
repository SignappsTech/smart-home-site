/**
 * Shared photography for marketing surfaces (real room assets under /public).
 * Prefer lifestyle photos from /assets/Images/ without English UI overlays,
 * the marketing site is Slovenian.
 * Alt text is Slovenian for accessibility and SEO.
 */
export const sitePhotos = {
  hero: {
    src: "/assets/Images/open-concept-living-day.png",
    alt: "Svetel odprt bivalni prostor z velikimi okni, pametni dom v resničnem ambientu",
  },
  /** Phone / app mockup layered over the hero room photo */
  heroApp: {
    src: "/assets/Images/home-assistant.png",
    alt: "Aplikacija za pametni dom na telefonu, nadzor luči, prizorov in sob",
  },
  heroAppBg: {
    src: "/assets/Images/home-assistant-bg.png",
    alt: "Aplikacija za pametni dom na telefonu v ambientu doma",
  },
  honesty: {
    src: "/assets/Images/kitchen-dining-evening.png",
    alt: "Sodobna kuhinja in jedilnica zvečer, dom po vgradnji ostane tak, kot je bil",
  },
  moments: [
    {
      src: "/assets/Images/bedroom-evening.png",
      alt: "Spalnica zvečer z mehko razsvetlitvijo",
      caption: "Jutro in večer, ko se luči in senčila prilagodijo sami",
    },
    {
      src: "/assets/Images/living-room-ambient-evening.png",
      alt: "Dnevna soba z ambientno LED razsvetlitvijo",
      caption: "Ena aplikacija za celoten dom",
    },
    {
      src: "/assets/Images/kitchen-dining-evening.png",
      alt: "Kuhinja in jedilnica z ambientno razsvetlitvijo",
      caption: "Prizori za večer, odhod ali goste",
    },
  ],
  steps: {
    src: "/assets/Images/open-concept-living-day.png",
    alt: "Odprt bivalni prostor, hitra in čista vgradnja v že urejen dom",
  },
  experienceTeaser: {
    src: "/assets/Images/villa-pool-dusk.png",
    alt: "Sodobna hiša ob mraku z bazenom, pametni dom brez razbijanja sten",
  },
  finalCta: {
    src: "/assets/Images/bedroom-evening.png",
    alt: "Spalnica z mehko ambientno razsvetlitvijo",
  },
  funkcionalnosti: {
    src: "/assets/Images/living-room-ambient-evening.png",
    alt: "Dnevna soba z avtomatizirano ambientno razsvetlitvijo",
  },
  /** Extra photo for funkcionalnosti dashboard split */
  funkcionalnostiSplit: {
    src: "/assets/Images/tablet-dashboard-living-room.png",
    alt: "Stenska nadzorna plošča v dnevni sobi, vse v eni aplikaciji",
  },
  tehnologije: {
    src: "/assets/Images/villa-pool-lounge-dusk.png",
    alt: "Hiša in terasa ob mraku, sistem deluje lokalno in mirno",
  },
  tehnologijeBand: {
    src: "/assets/Images/open-plan-smart-overlays.png",
    alt: "Odprt bivalni prostor z avtomatizirano razsvetlitvijo in senčili",
  },
  tehnologijeSignal: [
    {
      src: "/assets/Images/relay.png",
      alt: "Pametni rele v stikalni dozi, vgradnja v obstoječo napeljavo",
    },
    {
      src: "/assets/Images/home-hub.png",
      alt: "Lokalni Signapps Smart Home Hub v omari, možgani sistema pri vas doma",
    },
    {
      src: "/assets/Images/phone-home-assistant-16-9.png",
      alt: "Aplikacija za pametni dom na telefonu, nadzor od kjerkoli",
    },
  ],
  tehnologijeDashboard: {
    src: "/assets/Images/living-room-multi-device-dashboard.png",
    alt: "Bivalni prostor z nadzorom na tablici in telefonu",
  },
  tehnologijeHonest: {
    src: "/assets/Images/living-room-ambient-evening.png",
    alt: "Dnevna soba zvečer, sistem deluje lokalno, dom ostane vaš",
  },
  kontakt: {
    src: "/assets/Images/villa-exterior-pool-night.png",
    alt: "Hiša od zunaj zvečer, ogled lokacije po dogovoru",
  },
  oNas: {
    src: "/assets/Images/open-concept-living-day.png",
    alt: "Notranjost doma, ki ga opremimo z minimalnim posegom",
  },
} as const;
