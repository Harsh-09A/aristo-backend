// data/gallery.ts
// Photos ke liye alag array, videos ke liye alag.
// Naya item add karna ho toh seedha respective array mein daal do.

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type GalleryVideo = {
  id: string;
  src: string;       // video file ka path
  thumbnail: string;  // poster/thumbnail image, video ke liye zaroori hai
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: "img-1",
    src: "/assets/images/gallery/photo-1.jpg",
    alt: "Site visit - Aristo Project",
  },
  {
    id: "img-2",
    src: "/assets/images/gallery/photo-2.jpg",
    alt: "Project exterior view",
  },
  {
    id: "img-3",
    src: "/assets/images/gallery/photo-3.jpg",
    alt: "Project exterior view",
  },
  {
    id: "img-4",
    src: "/assets/images/gallery/photo-1.jpg",
    alt: "Site visit - Aristo Project",
  },
  {
    id: "img-5",
    src: "/assets/images/gallery/photo-2.jpg",
    alt: "Project exterior view",
  },
  {
    id: "img-6",
    src: "/assets/images/gallery/photo-3.jpg",
    alt: "Project exterior view",
  },
  {
    id: "img-7",
    src: "/assets/images/gallery/photo-1.jpg",
    alt: "Project exterior view",
  },
  {
    id: "img-8",
    src: "/assets/images/gallery/photo-2.jpg",
    alt: "Project exterior view",
  },
  // ... aage aur photos yahan add karte jao
];

export const galleryVideos: GalleryVideo[] = [
  {
    id: "vid-1",
    src: "/assets/images/gallery/video-1.mp4",
    thumbnail: "/assets/images/gallery/photo-2.jpg",
    alt: "Project walkthrough video",
  },
  {
    id: "vid-2",
    src: "/assets/images/gallery/video-1.mp4",
    thumbnail: "/assets/images/gallery/photo-3.jpg",
    alt: "Project walkthrough video",
  },
  {
    id: "vid-3",
    src: "/assets/images/gallery/video-1.mp4",
    thumbnail: "/assets/images/gallery/photo-1.jpg",
    alt: "Project walkthrough video",
  },
  {
    id: "vid-4",
    src: "/assets/images/gallery/video-1.mp4",
    thumbnail: "/assets/images/gallery/photo-3.jpg",
    alt: "Project walkthrough video",
  },
  {
    id: "vid-5",
    src: "/assets/images/gallery/video-1.mp4",
    thumbnail: "/assets/images/gallery/photo-2.jpg",
    alt: "Project walkthrough video",
  },
  {
    id: "vid-6",
    src: "/assets/images/gallery/video-1.mp4",
    thumbnail: "/assets/images/gallery/photo-1.jpg",
    alt: "Project walkthrough video",
  },
  // ... aage aur videos yahan add karte jao
];