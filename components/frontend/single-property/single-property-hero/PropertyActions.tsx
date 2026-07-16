import { Property } from "@/types/property";
import Link from "next/link";
import React from "react";



const PropertyActions = () => {
  return (
    <>
      <div className="d-grid gap-2">
        <Link href="/" className="ud-btn btn-white2">
          <i className="fa-solid fa-phone pe-2"></i>
          View Contact
        </Link>
        <Link href="/" className="ud-btn btn-white2 whatsapp-btn">
          <i className="fa-brands fa-whatsapp pe-2 "></i>
          WhatsApp
        </Link>
        <Link href="/" className="ud-btn btn-white2 schedule-btn">
          <i className="fa-solid fa-calendar pe-2"></i>
          Schedule Visit
        </Link>
      </div>
    </>
  );
};

export default PropertyActions;
