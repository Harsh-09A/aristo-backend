// components/.../reels/ReelsListings.tsx
import SectionHeading from "../common/sections/SectionHeading";
import ReelsSlider from "./ReelsSlider";
import { REELS } from "@/data/reels";
import styles from "./ReelsListings.module.css";

const ReelsListings = () => {
  if (REELS.length === 0) return null; // koi reel na ho toh section hi mat dikhao

  return (
    <section className={`${styles.reelsSection} overx-hide`}>
      <div className="container px-0">
        <div className={`${styles.reelsHeader} d-flex flex-wrap align-items-end justify-content-between gap-3`}>
          <SectionHeading
            heading={"Reels & Shorts"}
            title={"Watch"}
            highlight={"Property Reels"}
            subtitle={"Behind-the-scenes site tours, progress updates & aerial walkthroughs."}
          />
        </div>

        <ReelsSlider reels={REELS} />
      </div>
    </section>
  );
};

export default ReelsListings;