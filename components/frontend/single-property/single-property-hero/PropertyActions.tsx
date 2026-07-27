import Link from "next/link";

type Props = {
  phone?: string | null;
};

const PropertyActions = ({ phone }: Props) => {
  // WhatsApp link ke liye phone number se non-digit characters (+, -, space) hata dete hain
  const whatsappNumber = phone ? phone.replace(/[^0-9]/g, "") : "";

  return (
    <>
      <div className="d-grid gap-2">
        <Link href={phone ? `tel:${phone}` : "#"} className="ud-btn btn-white2">
          <i className="fa-solid fa-phone pe-2"></i>
          {/* {phone ? phone : "View Contact"} */}
          View Contact
        </Link>

        <Link
          href={whatsappNumber ? `https://wa.me/${whatsappNumber}` : "/"}
          className="ud-btn btn-white2 whatsapp-btn"
          target={whatsappNumber ? "_blank" : undefined}
        >
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
