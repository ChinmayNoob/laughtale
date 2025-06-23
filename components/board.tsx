import { cn, getCharacterFaceImage } from "@/utils/common";

import { Tile as TileType, createBoard, TILE_POSITION, getLocationFromPosition } from "@/utils/game";

import { useGameStore } from "@/lib/game-store";

const board = createBoard();

export function Board() {
    // Simple slicing into 4 sides
    const top = board.slice(0, 7);
    const right = board.slice(7, 12);
    const bottom = board.slice(12, 19).reverse();
    const left = board.slice(19).reverse();
    return (
        <div className="inline-block space-y-2.5 relative">
            <MarineFord />
            {/* Top row */}
            <div className="flex justify-center gap-2.5">
                {top.map((tile) => (
                    <Tile key={tile.position} tile={tile} direction="top" />
                ))}
            </div>

            {/* Middle section with left and right columns */}
            <div className="flex justify-between gap-2.5">
                {/* Left column */}
                <div className="flex flex-col gap-2.5">
                    {left.map((tile) => (
                        <Tile key={tile.position} tile={tile} direction="left" />
                    ))}
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-2.5">
                    {right.map((tile) => (
                        <Tile key={tile.position} tile={tile} direction="right" />
                    ))}
                </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-end gap-2.5">
                {bottom.map((tile) => (
                    <Tile key={tile.position} tile={tile} direction="bottom" />
                ))}
            </div>
        </div>
    );

}

type Direction = "top" | "right" | "bottom" | "left";
interface TileProps {
    tile: TileType;
    direction: Direction;
}

function Tile({ tile, direction }: TileProps) {
    const isActive = useGameStore((state) => state.position === tile.position);
    const characterName = useGameStore((state) => state.characterName);
    const location = getLocationFromPosition(tile.position).at(0)?.toUpperCase();
    const isIsland = tile.type !== "regular";

    const isBigIsland = tile.type === "amazonlily" || tile.type === "wholecake" || tile.type === "wano" || tile.type === "waterseven";
    const hasJollyRogerStop = TILE_POSITION.JOLLYROGER_STOP.includes(tile.position as any);
    return (
        <div
            className={cn(
                "shadow-[0px_6px_0px_0px_rgba(206,188,118,1)] duration-200 ease-in-out relative group/tile",
                "hover:shadow-[0px_3px_0px_0px_rgba(206,188,118,1)] hover:translate-y-1",
                tile.size === "lg" ? "size-24 rounded-3xl" : "size-16 rounded-2xl",
                isActive && "shadow-[0px_3px_0px_0px_rgba(206,188,118,1)] translate-y-1"
            )}
        >
            {hasJollyRogerStop && <JollyRogerStop direction={direction} />}
            <div
                className={cn(
                    "size-full bg-[#FFF9DE] relative flex items-center justify-center",
                    tile.size === "lg" ? "rounded-3xl" : "rounded-2xl",
                    "shadow-[inset_0px_2px_4px_0px_rgba(255,255,255,0.25),inset_0px_-2px_4px_0px_rgba(237,219,147,1)]"
                )}
            >
                {!isIsland && (
                    <div className="text-2xl font-bold text-[#F0E5B7] italic">
                        {location}
                    </div>
                )}
                {isIsland && (
                    <img
                        src={`/islands/${tile.type}.png`}
                        alt={tile.type}
                        className={cn(
                            "absolute left-1/2 -translate-x-1/2 object-contain",
                            isBigIsland ? "size-52" : "size-36",
                            tile.size === "lg" ? "" : ""
                        )}
                    />
                )}
                {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src={getCharacterFaceImage(characterName)} alt="Player" className="size-20" />
                    </div>
                )}
            </div>
        </div>
    );




}



interface JollyRogerStopProps {
    direction: Direction;
}

function JollyRogerStop({ direction }: JollyRogerStopProps) {
    return (
        <div
            className={cn(
                "absolute flex items-center justify-center size-16 bg-[#D9E682] rounded-2xl ",
                direction === "left" &&
                "-right-2.5 translate-x-full group-hover/tile:-translate-y-1",
                direction === "right" &&
                "-left-2.5 -translate-x-full group-hover/tile:-translate-y-1",
                direction === "top" &&
                "-bottom-3 translate-y-full group-hover/tile:translate-y-[calc(100%-4px)]",
                direction === "bottom" &&
                "-top-3 -translate-y-full group-hover/tile:-translate-y-[calc(100%+4px)]",
                "duration-200 ease-in-out group-hover/tile:brightness-105 "
            )}
        >
            <img src="/ship/thousandsunny.png" alt="Thousand Sunny" className="size-24 object-contain" />
        </div>
    );
}

function MarineFord() {
    return (
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 size-52 bg-[#FEF5CA]/40 rounded-4xl border-[6px] border-[#B4C957] flex items-center justify-center">
            <img src="/islands/marineford.png" alt="Marineford" className="size-60" />
        </div>
    )
}