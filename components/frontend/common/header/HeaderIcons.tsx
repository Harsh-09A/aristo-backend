// import React from "react";

// const HeaderIcons = () => {
//   return (
//     <>
//       <div className="d-flex gap-3 mx-3">
//         <a href="#" className="social-icon">
//           <i className="fa-solid fa-phone"></i>
//         </a>
//         <a href="#" className="social-icon">
//           <i className="fa-brands fa-youtube"></i>
//         </a>
//         <a href="#" className="social-icon">
//           <i className="fa-brands fa-facebook"></i>
//         </a>
//         <a href="#" className="social-icon">
//           <i className="fa-brands fa-instagram"></i>
//         </a>
//         <a href="#" className="social-icon">
//           <i className="fa-brands fa-linkedin"></i>
//         </a>
//         <a href="#" className="social-icon">
//           <i className="fa-brands fa-x-twitter"></i>
//         </a>
//         <a href="#" className="social-icon">
//           <i className="fa-brands fa-threads"></i>
//         </a>
//       </div>
//     </>
//   );
// };

// export default HeaderIcons;
import React from "react";

const HeaderIcons = () => {
  const icons = [
    {
      icon: "fa-solid fa-phone",
      url: "tel:+919130307464",
      label: "Call us",
    },
    {
      icon: "fa-brands fa-youtube",
      url: "https://youtube.com/@aristorealestateconsultants",
      label: "YouTube",
    },
    {
      icon: "fa-brands fa-facebook",
      url: "https://www.facebook.com/aristo0909/",
      label: "Facebook",
    },
    {
      icon: "fa-brands fa-instagram",
      url: "https://www.instagram.com/aristo_real_estate_consultants/",
      label: "Instagram",
    },
    {
      icon: "fa-brands fa-linkedin",
      url: "https://www.linkedin.com/company/aristo-real-estate-consultants/",
      label: "LinkedIn",
    },
    {
      icon: "fa-brands fa-x-twitter",
      url: "https://x.com/aristo7464",
      label: "X",
    },
    {
      icon: "fa-brands fa-threads",
      url: "https://www.threads.com/@aristo_real_estate_consultants",
      label: "Threads",
    },
  ];

  return (
    <div className="d-flex gap-3 mx-3">
      {icons.map((item) => (
        <a
          key={item.label}
          href={item.url}
          className="social-icon"
          aria-label={item.label}
          {...(!item.url.startsWith("tel:")
            ? {
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {})}
        >
          <i className={item.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default HeaderIcons;
