import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

/**
 * Maps character names from spawn config to their corresponding face image paths
 */
export function getCharacterFaceImage(characterName: string): string {
  // Convert character name to lowercase and extract key identifier
  const name = characterName.toLowerCase();

  if (name.includes("luffy")) {
    return "/faces/luffy.png";
  }
  if (name.includes("trafalgar") || name.includes("law")) {
    return "/faces/trafalgar.png"; // fallback to characters folder if not in faces
  }
  if (name.includes("buggy")) {
    return "/faces/buggy.png"; // not available in faces, use characters
  }
  if (name.includes("shanks")) {
    return "/faces/shanks.png"; // not available in faces, use characters
  }
  if (name.includes("kaido")) {
    return "/faces/kaido.png";
  }
  if (name.includes("zoro")) {
    return "/faces/zoro.png";
  }
  return "/faces/luffy.png";
}

