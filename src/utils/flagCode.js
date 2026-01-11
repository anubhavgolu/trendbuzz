export const getFlagUrl = (short) => {
  if (!short || short === "TBC") return null;

  const FLAG_MAP = {
    IND: "in",
    PAK: "pk",
    AUS: "au",
    ENG: "gb",
    SA: "za",
    NZ: "nz",
    WI: "jm",
    SL: "lk",
    BAN: "bd",
    AFG: "af",
    USA: "us",
    NED: "nl",
    NEP: "np",
    IRE: "ie",
    OMA: "om",
    ZIM: "zw",
    CAN: "ca",
    UAE: "ae",
    ITA: "it",
    NAM: "na",
  };

  return FLAG_MAP[short]
    ? `https://flagcdn.com/w40/${FLAG_MAP[short]}.png`
    : null;
};
