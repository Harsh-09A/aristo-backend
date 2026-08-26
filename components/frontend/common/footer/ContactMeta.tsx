import React from "react";

const ContactMeta = () => {
  const contactInfoList = [
    {
      title: "Total Free Customer Care",
      phone: "+919130307464",
      phoneLink: "tel:+919130307464", // Changed phoneLink to tel: URI
    },
    {
      title: "Need Live Support?",
      mail: "belapur@aristouniversal.com",
      mailLink: "mailto:belapur@aristouniversal.com", // Changed mailLink to direct email address
    },
  ];
// 022 2756 0408 / 022 2757 0408/ +919130307464
  return (
    <div className="row mb-4 mb-lg-5">
      {contactInfoList.map((contact, index) => (
        <div className="col-auto" key={index}>
          <div className="contact-info">
            <p className="info-title">{contact.title}</p>
            {contact.phone && (
              <h6 className="info-phone">
                <a href={contact.phoneLink}>{contact.phone}</a>
              </h6>
            )}
            {contact.mail && (
              <h6 className="info-mail">
                <a href={contact.mailLink}>{contact.mail}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactMeta;
