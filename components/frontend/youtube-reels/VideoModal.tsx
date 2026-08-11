"use client";
import { useEffect, useRef } from "react";
import { extractYouTubeId, isDirectVideo } from "@/utils/reels-utils";
import type { Reel } from "@/data/reels";
import styles from "./VideoModal.module.css";

interface VideoModalProps {
  reel: Reel;
  onClose: () => void;
}

const VideoModal = ({ reel, onClose }: VideoModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  // Escape key se close, aur jab tak modal khula hai background scroll lock
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Backdrop pe click (card ke bahar) → modal close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  const ytId = extractYouTubeId(reel.url);
  const direct = isDirectVideo(reel.url);
  const embedSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div ref={backdropRef} onClick={handleBackdropClick} className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={onClose} aria-label="Close" className={styles.closeBtn}>
          ✕
        </button>

        <div className={styles.videoWrap}>
          {embedSrc ? (
            <iframe
              src={embedSrc}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={reel.title}
              className={styles.iframe}
            />
          ) : direct ? (
            <video src={reel.url} controls autoPlay playsInline className={styles.video} />
          ) : (
            <div className={styles.unsupported}>Unsupported video format</div>
          )}
        </div>

        <div className={styles.caption}>
          <span className={styles.captionTag}>{reel.tag}</span>
          <p className={styles.captionTitle}>{reel.title}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;