export const wegtype = {
  1: "Gemeenteweg",
  2: "Gewestweg",
  3: "Autosnelweg",
  4: "Onbekend",
};

export const WEER = {
  1: "Normaal",
  2: "Onbekend",
  3: "Sneeuwval",
  4: "Regenval",
  5: "Hagelbui",
  6: "Mist (zichtbaarheid minder dan 100m)",
  7: "Sneeuwval+Hagelbui",
  8: "Andere (dikke rook,...)",
  9: "Sterke wind, rukwind+Sneeuwval",
  10: "Regenval+Sneeuwval",
  11: "Sterke wind, rukwind",
  12: "Regenval+Sterke wind, rukwind",
  13: "Regenval+Mist (zichtbaarheid minder dan 100m)",
  14: "Regenval+Hagelbui",
  15: "Regenval+Andere (dikke rook,...)",
  16: "Sterke wind, rukwind+Hagelbui",
};

export const BEBOUWINGSGEBIED = {
  1: "binnen bebouwde kom",
  2: "buiten bebouwde kom",
  3: "onbekend",
};

export const PROVINCIE = {
  1: "Provincie Antwerpen",
  2: "Provincie Limburg",
  3: "Provincie Oost-Vlaanderen",
  4: "Provincie West-Vlaanderen",
  5: "Provincie Vlaams-Brabant",
  6: "Provincie Waals-Brabant",
  7: "Provincie Henegouwen",
  8: "Provincie Namen",
  9: "Provincie Luxemburg",
  10: "Provincie Luik",
  11: "Brussel Gewest",
};

export const WEERLICHT = {
  1: "Nacht, openbare verlichting aanwezig en ontstoken",
  2: "Onbekend",
  3: "Dag",
  4: "Dageraad - schemering",
  5: "Nacht, geen openbare verlichting aanwezig",
  6: "Nacht, openb. verlicht. aanw., maar niet ontstoken",
};

export const REGIO = {
  1: "Brussels Hoofdstedelijk Gewest",
  2: "Vlaams Gewest",
  3: "Waals Gewest",
};

export const KRUISPUNT = {
  1: "Op Kruispunt",
  2: "Buiten Kruispunt",
  3: "onbekend",
};

export const WEGCONDITIE = {
  1: "Droog",
  2: "Onbekend",
  3: "Nat, plassen",
  4: "Ijzel, sneeuw",
  5: "Droog+Proper",
  6: "Proper",
  7: "Nat, plassen+Ijzel of sneeuw",
  8: "Nat, plassen+Proper",
  9: "Ijzel, sneeuw+Proper",
  10: "Nat, plassen+Vuil (zand, grint, bladeren,...)",
  11: "Vuil (zand, grint, bladeren,...)",
  12: "Droog+Vuil (zand, grint, bladeren,...)",
  13: "Ijzel, sneeuw+Vuil (zand, grint, bladeren,...)",
};

export const VERKEERSSLACHTOFFERS = {
  1: "met lichtgewonden",
  2: "met zwaargewonden",
  3: "Met doden",
  4: "dodelijk gewonden",
};

export const VOERTUIGTYPE1 = {
  1: "personenauto",
  2: "Fiets",
  3: "Vrachtwagen",
  4: "Lichte vrachtauto",
  5: "onbekend",
  6: "Voetganger",
  7: "Andere weggebruiker",
  8: "Bromfiets",
  9: "Motorfiets",
  10: "Autobus",
};

export const VOERTUIGTYPE2 = {
  1: "Voetganger",
  2: "personenauto",
  3: "één bestuurder, geen hindernis",
  4: "Fiets",
  5: "Lichte vrachtauto",
  6: "een weggebruiker tegen een hindernis",
  7: "Vrachtwagen",
  8: "onbekend",
  9: "Motorfiets",
  10: "Andere weggebruiker",
  11: "Bromfiets",
  12: "Autobus",
};

export const BOTSINGTYPE = {
  1: "Met een voetganger",
  2: "Tussen 2 bestuurders: Frontale botsing",
  3: "Tussen 2 bestuurders: Langs achteren",
  4: "Tss. 2 best.: langs opzij (voor-/achterkant-flank)",
  5: "Eén bestuurder, geen hindernis (incl. val)",
  6: "Kettingbotsing (3 bestuurders of meer)",
  7: "Weggebruiker tegen hindernis buiten rijbaan",
  8: "Andere of onbekend",
  9: "Weggebruiker tegen hindernis op de rijbaan",
  10: "Geen vermelding van de type aanrijding",
  11: "Tussen 2 bestuurders: Flank tegen flank",
};

export const OBSTAKELS = {
  1: "Geen hindernis",
  2: "Buiten de rijbaan: Vangrails niet overgestoken",
  3: "Buiten de rijbaan: Andere paal",
  4: "Geen vermelding van de aanwezigheid van een hindernis",
  5: "Buiten de rijbaan: Vangrails overschreden",
  6: "Andere hindernis",
  7: "Op de rijbaan: Werken (signal., aarde, toestel,…)",
  8: "Buiten de rijbaan: Boom",
  9: "Buiten de rijbaan: Gracht",
  10: "Buiten de rijbaan: Muur gebouw",
  11: "Op de rijbaan: Dier (huisdier)",
  12: "Buiten de rijbaan: Verlichtingspaal",
  13: "Geen vermelding van de type aanrijding",
  14: "Verkeersdrempel, ezelsrug, put, uitholling, straatgoot",
  15: "Buiten de rijbaan: Verkeerseiland, middenberm",
  16: "Buiten de rijbaan: Omheining",
  17: "Onbekend",
  18: "Op de rijbaan: Container",
  19: "Op de rijbaan: Lading",
  20: "Tramspoor",
  21: "Op de rijbaan: Verkeersdrempel, ezelsrug",
  22: "Op de rijbaan: Put, straatgoot, tramspoor",
  23: "Trein",
  24: "Op de rijbaan: Dier (wild dier)",
  25: "Buiten de rijbaan: Dier",
};

const DataConstants = () => {
  return null; // This component does not need to render anything
};

export default DataConstants;
