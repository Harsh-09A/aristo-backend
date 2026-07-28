// components/NaviMumbaiMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Next.js ke saath Leaflet ka default marker icon path break ho jaata hai,
// ye fix karna padta hai — sirf ek baar copy-paste karo, kabhi touch nahi karna
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type MapLocation = {
  id: string;
  name: string;
  slug: string;
  image?: string | null; // ← field naam schema ke hisaab se badal do agar zaroorat ho
  latitude: number | null;
  longitude: number | null;
  _count: { projects: number };
};

export default function NaviMumbaiMap({
  locations,
}: {
  locations: MapLocation[];
}) {
  // Navi Mumbai ka roughly center point — map isi pe khulega
  const center: [number, number] = [19.033, 73.0297];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "500px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations.map((loc) => {
        if (loc.latitude == null || loc.longitude == null) return null;

        return (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
            {/* minWidth zaroori hai warna image squeeze ho jaayegi */}
            <Popup minWidth={220}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={
                    loc.image ||
                    "/assets/images/placeholder/placeholder-image.jpg"
                  }
                  alt={loc.name}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <strong style={{ display: "block", fontSize: "15px" }}>
                  {loc.name}
                </strong>
                <p style={{ margin: "4px 0", fontSize: "13px" }}>
                  {loc._count.projects} project
                  {loc._count.projects !== 1 ? "s" : ""}
                </p>
                {/* <Link href={`/locations/${loc.slug}`}>View Projects →</Link> */}
                <Link
                className="ud-btn btn-white2"
                  href={`/locations/${loc.slug}`}
                  style={{ fontSize: "13px", fontWeight: 600 }}
                >
                  View Projects →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
