import { Location, PirateType } from "@/types/game";

export type SpawnIslandTile = "waterseven" | "wholecake" | "wano" | "amazonlily";

export type ActionIslandTile = "egghead" | "skypiea" | "onigashima";

export type RegularTile = "regular";

export type TileType = SpawnIslandTile | ActionIslandTile | RegularTile;

export type TileSize = "sm" | "lg";

export type Position = number;

export type Direction = -1 | 1;

export const TILE_POSITION = {
    AMAZONLILY: 0,
    EGGHEAD: 3,
    WATERSEVEN: 6,
    SKYPIEA: 9,
    WANO: 12,
    ONIGASHIMA: 15,
    WHOLECAKE: 18,
    JOLLYROGER_STOP: [2, 16, 21],
} as const;

export interface Tile {
    type: TileType;
    position: Position;
    size: TileSize;
}

export type Board = Tile[];

export function createBoard(): Board {
    const board: Board = [];
    const TOTAL_POSITIONS = 24;

    for (let i = 0; i < TOTAL_POSITIONS; i++) {
        let tileType: TileType = "regular";
        const tileSize = i % 6 === 0 ? "lg" : "sm";

        //Place Islands according to the their respective positions

        switch (i) {
            case TILE_POSITION.AMAZONLILY:
                tileType = "amazonlily";
                break;
            case TILE_POSITION.EGGHEAD:
                tileType = "egghead";
                break;
            case TILE_POSITION.WATERSEVEN:
                tileType = "waterseven";
                break;
            case TILE_POSITION.SKYPIEA:
                tileType = "skypiea";
                break;
            case TILE_POSITION.WANO:
                tileType = "wano";
                break;
            case TILE_POSITION.ONIGASHIMA:
                tileType = "onigashima";
                break;
            case TILE_POSITION.WHOLECAKE:
                tileType = "wholecake";
                break;
        }

        board.push({
            type: tileType,
            position: i,
            size: tileSize,
        });
    }

    return board;
}

export function getNextPosition(
    currentPosition: Position,
    direction: Direction,
    moveSize: number = 1,
    boardSize: number = 24
): Position {
    const nextPosition = (currentPosition + direction * moveSize + boardSize) % boardSize;
    return nextPosition >= 0 ? nextPosition : boardSize + nextPosition;
}

export function getLocationFromPosition(position: Position): Location {
    switch (true) {
        case position === TILE_POSITION.EGGHEAD:
            return "egghead";
        case position === TILE_POSITION.SKYPIEA:
            return "skypiea";
        case position === TILE_POSITION.ONIGASHIMA:
            return "onigashima";
        case (position >= 21 && position <= 23) || (position >= 0 && position <= 2):
            return "rookie"; // Last 3 positions (21-23) and first 3 positions (0-2)
        case position >= 3 && position <= 8:
            return "supernova"; // Positions 3-8
        case position >= 9 && position <= 14:
            return "emperor"; // Positions 9-14
        case position >= 15 && position <= 20:
            return "warlord"; // Positions 15-20
        default:
            return "rookie"; // Fallback
    }
}

export function getPositionFromPirateType(pirateType: PirateType): number {
    switch (pirateType) {
        case "rookie":
            return TILE_POSITION.AMAZONLILY;
        case "supernova":
            return TILE_POSITION.WATERSEVEN;
        case "warlord":
            return TILE_POSITION.WHOLECAKE;
        case "emperor":
            return TILE_POSITION.WANO;
        default:
            return TILE_POSITION.AMAZONLILY;
    }
}