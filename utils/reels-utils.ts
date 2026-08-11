// utils/reels-utils.ts
import type { Reel } from "@/data/reels";

/**
 * YouTube URL (Shorts / watch / short-link) se 11-character video ID nikalta hai.
 * Match nahi hua toh null return karta hai.
 */
export function extractYouTubeId(url: string | null | undefined): string | null {
  if (!url) return null;

  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  const shortLinkMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortLinkMatch) return shortLinkMatch[1];

  return null;
}

/** URL directly ek video file hai ya nahi (mp4/webm/ogg/mov) */
export function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

/**
 * Reel ki thumbnail decide karta hai:
 * 1. Manual `thumb` diya hai toh wahi use karo
 * 2. YouTube video hai toh YouTube ki auto thumbnail
 * 3. Direct video file hai toh thumbnail nahi milega (null)
 */
export function getReelThumbnail(reel: Reel): string | null {
  if (reel.thumb) return reel.thumb;

  const ytId = extractYouTubeId(reel.url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;

  return null;
}