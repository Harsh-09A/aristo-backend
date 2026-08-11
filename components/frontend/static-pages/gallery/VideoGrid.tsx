"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryVideo } from "@/data/gallery";
import styles from "./GalleryGrid.module.scss";

type Props = {
  items: GalleryVideo[];
};

export default function VideoGrid({ items }: Props) {
  const [selected, setSelected] = useState<GalleryVideo | null>(null);

  return (
    <>
      <div className="row g-3">
        {items.map((item) => (
          <div key={item.id} className="col-6 col-md-4 col-lg-3">
            <button
              type="button"
              className={`border-0 p-0 w-100 ${styles.thumbBtn}`}
              onClick={() => setSelected(item)}
            >
              <div className={styles.thumbWrap}>
                <Image
                  src={item.thumbnail}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
                {/* Thumbnail ke upar play icon */}
                <i className={`bi bi-play-circle-fill ${styles.playIcon}`} />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Player modal — sirf tab render hota hai jab koi video select ho */}
      {selected && (
        <div className={styles.modalBackdrop} onClick={() => setSelected(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={`btn-close btn-close-white ${styles.modalClose}`}
              onClick={() => setSelected(null)}
              aria-label="Close"
            />
            <video
              key={selected.id} // item badalne par video fresh load ho
              src={selected.src}
              controls
              autoPlay
              style={{ width: "100%", maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
}