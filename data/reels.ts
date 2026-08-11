// data/reels.ts
// Reels/Shorts section ka static data. Naya video add karna ho toh bas array mein entry daal do.
// Future mein agar reels DB/CMS se aane lage, toh sirf yeh file service call se replace hogi —
// Slider/Card/Modal kuch bhi touch nahi karna padega.

export interface Reel {
  id: number;
  title: string;
  tag: string;
  /** YouTube Shorts URL, YouTube watch URL, ya direct .mp4/.webm video URL */
  url: string;
  /** Optional — khaali chhodo toh YouTube thumbnail apne aap use ho jayegi */
  thumb: string;
}

export const REELS: Reel[] = [
  { id: 1, title: "Under Construction Visit", tag: "Site Tour", url: "https://www.youtube.com/shorts/JDZ-lyfNxGI", thumb: "" },
  { id: 2, title: "Revanta Fortune Walkthrough", tag: "Project Highlight", url: "https://www.youtube.com/shorts/oyDlqIBOLV0", thumb: "" },
  { id: 3, title: "Aerial View – New Township", tag: "Drone Shot", url: "https://www.youtube.com/shorts/rY4kCFsqmF8", thumb: "" },
  { id: 4, title: "Hard-Hat Site Inspection", tag: "Behind the Scenes", url: "https://www.youtube.com/shorts/HojQXA-BJxk", thumb: "" },
  { id: 5, title: "Ready-to-Move Homes", tag: "Possession Ready", url: "https://www.youtube.com/shorts/2YVho1r6tXg", thumb: "" },
  { id: 6, title: "Construction Progress Update", tag: "Site Tour", url: "https://www.youtube.com/shorts/I7lNfzks11A", thumb: "" },
  { id: 7, title: "Ready-to-Move Homes", tag: "Possession Ready", url: "https://www.youtube.com/shorts/qAfA1UYnajk", thumb: "" },
  { id: 8, title: "Hard-Hat Site Inspection", tag: "Behind the Scenes", url: "https://www.youtube.com/shorts/ZBfjkii0WBw", thumb: "" },
];