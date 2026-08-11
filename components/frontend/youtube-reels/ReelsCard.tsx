"use client";
import { getReelThumbnail } from "@/utils/reels-utils";
import type { Reel } from "@/data/reels";
import styles from "./ReelsCard.module.css";

interface ReelsCardProps {
  reel: Reel;
  onClick: () => void;
}

const ReelsCard = ({ reel, onClick }: ReelsCardProps) => {
  const thumb = getReelThumbnail(reel);

  return (
    <div className={styles.card} onClick={onClick}>
      {thumb ? (
        <img src={thumb} alt={reel.title} className={styles.thumbnail} />
      ) : (
        <div className={styles.thumbnailFallback} />
      )}

      <div className={styles.overlay} />

      <div className={styles.tag}>{reel.tag}</div>

      <div className={styles.playButton}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      <div className={styles.titleWrap}>
        <p className={styles.titleText}>{reel.title}</p>
      </div>
    </div>
  );
};

export default ReelsCard;