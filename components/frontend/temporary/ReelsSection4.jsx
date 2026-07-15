"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

// ─── Paste your video items here ──────────────────────────────────────────────
const REELS = [
  {
    id: 1,
    title: "Under Construction Visit",
    tag: "Site Tour",
    // YouTube Shorts URL  ↓  or replace with a direct .mp4 URL
    url: "https://www.youtube.com/shorts/JDZ-lyfNxGI",
    // Optional thumbnail override (leave "" to auto-generate from YouTube)
    thumb: "",
  },
  {
    id: 2,
    title: "Revanta Fortune Walkthrough",
    tag: "Project Highlight",
    url: "https://www.youtube.com/shorts/oyDlqIBOLV0",
    thumb: "",
  },
  {
    id: 3,
    title: "Aerial View – New Township",
    tag: "Drone Shot",
    url: "https://www.youtube.com/shorts/rY4kCFsqmF8",
    thumb: "",
  },
  {
    id: 4,
    title: "Hard-Hat Site Inspection",
    tag: "Behind the Scenes",
    url: "https://www.youtube.com/shorts/HojQXA-BJxk",
    thumb: "",
  },
  {
    id: 5,
    title: "Ready-to-Move Homes",
    tag: "Possession Ready",
    url: "https://www.youtube.com/shorts/2YVho1r6tXg",
    thumb: "",
  },
  {
    id: 6,
    title: "Construction Progress Update",
    tag: "Site Tour",
    url: "https://www.youtube.com/shorts/I7lNfzks11A",
    thumb: "",
  },
  {
    id: 7,
    title: "Ready-to-Move Homes",
    tag: "Possession Ready",
    url: "https://www.youtube.com/shorts/qAfA1UYnajk",
    thumb: "",
  },
  {
    id: 8,
    title: "Hard-Hat Site Inspection",
    tag: "Behind the Scenes",
    url: "https://www.youtube.com/shorts/ZBfjkii0WBw",
    thumb: "",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function extractYouTubeId(url) {
  if (!url) return null;
  // Shorts: /shorts/ID
  const shortsMatch = url.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];
  // Standard watch?v=ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  // youtu.be/ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  return null;
}

function isDirectVideo(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
}

function getThumbnail(reel) {
  if (reel.thumb) return reel.thumb;
  const ytId = extractYouTubeId(reel.url);
  if (ytId) return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  return null; // direct video – no thumb
}

// ─── Popup Player ─────────────────────────────────────────────────────────────
function VideoModal({ reel, onClose }) {
  const backdropRef = useRef(null);
  const videoRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  const ytId = extractYouTubeId(reel.url);
  const direct = isDirectVideo(reel.url);

  const embedSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeInBackdrop .25s ease",
        overflowY: "auto",
      }}>
      <div
        style={{
          position: "relative",
          width: "min(360px, 88vw)",
          maxHeight: "calc(100vh - 40px)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,.7)",
          background: "#000",
          animation: "popIn .3s cubic-bezier(.34,1.56,.64,1)",
          margin: "auto",
          flexShrink: 0,
        }}>
        {/* Close btn */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,.15)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            fontSize: 18,
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background .2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,.15)")
          }>
          ✕
        </button>

        {/* Video */}
        <div
          style={{
            aspectRatio: "9/16",
            width: "100%",
            maxHeight: "calc(100vh - 120px)",
            overflow: "hidden",
          }}>
          {embedSrc ? (
            <iframe
              src={embedSrc}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
              }}
              title={reel.title}
            />
          ) : direct ? (
            <video
              ref={videoRef}
              src={reel.url}
              controls
              autoPlay
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 14,
                padding: "1rem",
                textAlign: "center",
              }}>
              Unsupported video format
            </div>
          )}
        </div>

        {/* Caption */}
        <div
          style={{
            padding: "14px 16px",
            background: "linear-gradient(135deg,#1a1a2e,#16213e)",
          }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#da251c",
              // background: "rgba(249,115,22,.12)",
              background: "rgba(218, 37, 28,.12)",
              borderRadius: 20,
              padding: "2px 10px",
              marginBottom: 6,
            }}>
            {reel.tag}
          </span>
          <p
            style={{ margin: 0, color: "#fff", fontSize: 14, fontWeight: 600 }}>
            {reel.title}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInBackdrop { from { opacity:0 } to { opacity:1 } }
        @keyframes popIn {
          from { transform:scale(.85); opacity:0 }
          to   { transform:scale(1);   opacity:1 }
        }
      `}</style>
    </div>
  );
}

// ─── Reel Card ────────────────────────────────────────────────────────────────
function ReelCard({ reel, onClick }) {
  const [hovered, setHovered] = useState(false);
  const thumb = getThumbnail(reel);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 18,
        overflow: "hidden",
        aspectRatio: "9/16",
        cursor: "pointer",
        userSelect: "none",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,.45)"
          : "0 8px 24px rgba(0,0,0,.25)",
        transform: hovered ? "scale(1.03) translateY(-4px)" : "scale(1)",
        transition:
          "transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s ease",
        background: "#111",
      }}>
      {/* Thumbnail */}
      {thumb ? (
        <img
          src={thumb}
          alt={reel.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            transition: "transform .6s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg,#1a1a2e,#2d2d44)",
          }}
        />
      )}

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 50%, rgba(0,0,0,.05) 100%)",
        }}
      />

      {/* Tag pill */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#fff",
          background: "rgba(218, 37, 28,.85)",
          // background: rgba(218, 37, 28,.85);
          borderRadius: 20,
          padding: "3px 10px",
          backdropFilter: "blur(6px)",
        }}>
        {reel.tag}
      </div>

      {/* Play button */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%,-50%) scale(${hovered ? 1.15 : 1})`,
          transition: "transform .3s cubic-bezier(.34,1.56,.64,1)",
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "rgba(255,255,255,.18)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255,255,255,.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Title at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 14px 14px",
        }}>
        <p
          style={{
            margin: 0,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.3,
            textShadow: "0 1px 6px rgba(0,0,0,.5)",
          }}>
          {reel.title}
        </p>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ReelsSection4() {
  const [activeReel, setActiveReel] = useState(null);

  return (
    <>
      {/* Import Swiper CSS – add these to your _app.js or globals.css instead */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');

        .reels-section {
          font-family: 'Plus Jakarta Sans', sans-serif;
          padding: 60px 0 80px;
          background: #fafaf9;
          overflow: hidden;
        }

        .reels-header {
          padding: 0 24px;
          margin-bottom: 32px;
        }

        .reels-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #da251c;
          margin-bottom: 10px;
        }

        .reels-eyebrow::before {
          content: '';
          display: block;
          width: 24px;
          height: 2px;
          background: #da251c;
          border-radius: 2px;
        }

        .reels-title {
          font-size: clamp(26px, 4vw, 42px);
          font-weight: 800;
          color: #111;
          margin: 0 0 10px;
          line-height: 1.1;
        }

        .reels-title span {
          color: #da251c;
        }

        .reels-subtitle {
          font-size: 15px;
          color: #666;
          margin: 0;
          max-width: 500px;
        }

        /* Custom swiper nav */
        .reels-nav-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1.5px solid #e2e2e2;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .2s;
          color: #333;
          flex-shrink: 0;
        }

        .reels-nav-btn:hover {
          background: #da251c;
          border-color: #da251c;
          color: #fff;
          transform: scale(1.08);
        }

        .reels-nav-btn:disabled {
          opacity: .35;
          pointer-events: none;
        }

        .reels-swiper .swiper-slide {
          width: 200px !important;
        }

        @media (max-width: 576px) {
          .reels-swiper .swiper-slide {
            width: 160px !important;
          }
        }
      `}</style>

      <section className="reels-section">
        <div className="container px-0">
          {/* Header row */}
          <div className="reels-header d-flex flex-wrap align-items-end justify-content-between gap-3">
            <div>
              <div className="reels-eyebrow">Reels &amp; Shorts</div>
              <h2 className="reels-title">
                Watch Our <span>Property Reels</span>
              </h2>
              <p className="reels-subtitle">
                Behind-the-scenes site tours, progress updates &amp; aerial
                walkthroughs.
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="d-flex gap-2 reels-nav-wrap">
              <button
                className="reels-nav-btn"
                id="reels-prev"
                aria-label="Previous">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="reels-nav-btn"
                id="reels-next"
                aria-label="Next">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, FreeMode]}
            slidesPerView="auto"
            spaceBetween={16}
            freeMode={{ enabled: true, momentum: true }}
            navigation={{
              prevEl: "#reels-prev",
              nextEl: "#reels-next",
            }}
            slidesOffsetBefore={24}
            slidesOffsetAfter={24}
            className="reels-swiper">
            {REELS.map((reel) => (
              <SwiperSlide key={reel.id}>
                <ReelCard reel={reel} onClick={() => setActiveReel(reel)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Video popup */}
      {activeReel && (
        <VideoModal reel={activeReel} onClose={() => setActiveReel(null)} />
      )}
    </>
  );
}
