"use client";

import { useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/data/gallery";
import styles from "./GalleryGrid.module.scss";

type Props = {
  items: GalleryImage[];
};

export default function PhotoGrid({ items }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

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
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                  className="rounded"
                />
              </div>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox — sirf tab render hota hai jab koi photo select ho */}
      {selected && (
        <div className={styles.modalBackdrop} onClick={() => setSelected(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={`btn-close btn-close-white ${styles.modalClose}`}
              onClick={() => setSelected(null)}
              aria-label="Close"
            />
            <Image
              src={selected.src}
              alt={selected.alt}
              width={900}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      )}
    </>
  );
}