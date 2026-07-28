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
  image?: string | null;
  latitude: number | null;
  longitude: number | null;
  _count: { projects: number };
};

// divIcon ke andar raw HTML jaata hai, isliye location name mein agar
// koi HTML special character ho toh usse plain text jaisa treat karne
// ke liye escape kar dete hain (basic safety measure)
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// -----------------------------------------------------------------------
// Custom pin banane ka function — pin + project count badge + neeche
// location name ka label. Har location ke liye alag icon banega
// kyunki name aur count dono alag-alag hain.
// -----------------------------------------------------------------------
function createRealEstateIcon(name: string, projectCount: number) {
  return L.divIcon({
    className: "custom-real-estate-marker", // Leaflet ka default white box hatane ke liye zaroori
    html: `
      <div class="pin-wrapper">
        <div class="pin-body">
          <i class="fal fa-building"></i>
          ${
            projectCount > 0
              ? `<div class="pin-badge">${projectCount}</div>`
              : ""
          }
        </div>
        <div class="pin-label">${escapeHtml(name)}</div>
      </div>
    `,
    iconSize: [130, 70], // width thodi zyada rakhi taaki lambe naam bhi fit ho jaayein
    iconAnchor: [65, 40], // pin ki nok (tip) exact coordinate pe touch kare — width/2, aur tip ki height
    popupAnchor: [0, -40], // popup pin ke upar khule
  });
}

export default function NaviMumbaiMap({
  locations,
}: {
  locations: MapLocation[];
}) {
  const center: [number, number] = [19.033, 73.0297];

  return (
    <>
      {/* Marker ka CSS yahin rakh diya taaki component self-contained rahe.
          Chaho toh isse global .scss file mein bhi move kar sakte ho. */}
      <style jsx global>{`
        .custom-real-estate-marker {
          background: transparent;
          border: none;
        }

        .pin-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 130px;
          transition: transform 0.2s ease;
        }

        .pin-wrapper:hover {
          transform: translateY(-4px);
        }

        .pin-body {
          position: relative;
          width: 36px;
          height: 36px;
          background: var(--primary-color); /* apni brand color yahan daal do */
          border: 3px solid #fff;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.35);
        }

        .pin-body i {
          transform: rotate(45deg);
          color: #fff;
          font-size: 15px;
        }

        .pin-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          transform: rotate(
            45deg
          ); /* pin-body ke -45deg rotation ko cancel karta hai */
          background: #1a1a1a;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          padding: 0 4px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }

        .pin-label {
          margin-top: 6px;
          background: #fff;
          color: #1a1a1a;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "600px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc) => {
          if (loc.latitude == null || loc.longitude == null) return null;

          return (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
              icon={createRealEstateIcon(loc.name, loc._count.projects)}
            >
              <Popup minWidth={150}>
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
    </>
  );
}
