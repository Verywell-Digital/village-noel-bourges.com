// uniqueId.ts
let uniqueIdCounter = 0;

function randomId(prefix = ""): string {
  uniqueIdCounter++;
  return `${prefix}${uniqueIdCounter}`;
}

export const LEFT_NAVIGATION_DATA: any[] = [
  {
    id: randomId(),
    href: "/",
    name: "Accueil",
  },
  {
    id: randomId(),
    href: "/",
    name: "Visiteur",
    type: "dropdown",
    children: [
      { id: randomId(), href: "/annuaire-des-exposants", name: "Annuaire des exposants" },
      { id: randomId(), href: "/les-partenaires-du-salon", name: "Les partenaires du salon" },
      { id: randomId(), href: "/se-restaurer-sur-place", name: "Se restaurer sur place" },
      { id: randomId(), href: "/programme-animations", name: "Programme d'animations" },
      { id: randomId(), href: "/plan-du-salon", name: "Plan du salon" },
    ],
  },

  //
  {
    id: randomId(),
    href: "/exposants",
    name: "Exposants",
  },

  {
    id: randomId(),
    href: "/medias",
    name: "Médias",
  },
];

export const BUTTON_NAVIGATION_DATA: any[] = [
  {
    id: randomId(),
    href: "/",
    name: "Billeterie",
    type: "button",
  },
];

export const RIGHT_NAVIGATION_DATA: any[] = [
  {
    id: randomId(),
    href: "/informations-pratiques",
    name: "Infos pratiques",
  },
  {
    id: randomId(),
    href: "/",
    name: "Edition",
    type: "dropdown",
    children: [{ id: randomId(), href: "/", name: "2023" }],
  },
];
