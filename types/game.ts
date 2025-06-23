//Pirate types

export type PirateType = "rookie" | "supernova" | "warlord" | "emperor";

// Action Locations

export type ActionArea = "egghead" | "skypiea" | "onigashima";

export type Location = PirateType | ActionArea;

export type EffectType = "berries" | "poneglyph" | "choice" | "probability";

export type EffectMagnitude = number;
