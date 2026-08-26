import React from "react";

const Social = () => {
  const socialIcons = [
    {
      icon: "fab fa-facebook-f",
      url: "https://www.facebook.com/aristo0909/",
      label: "Facebook",
    },
    {
      icon: "fab fa-instagram",
      url: "https://www.instagram.com/aristo_real_estate_consultants/",
      label: "Instagram",
    },
    {
      icon: "fab fa-linkedin-in",
      url: "https://www.linkedin.com/company/aristo-real-estate-consultants/",
      label: "LinkedIn",
    },
    {
      icon: "fab fa-youtube",
      url: "https://youtube.com/@aristorealestateconsultants",
      label: "YouTube",
    },
    {
      icon: "fab fa-x-twitter",
      url: "https://x.com/aristo7464",
      label: "X",
    },
    {
      icon: "fab fa-threads",
      url: "https://www.threads.com/@aristo_real_estate_consultants",
      label: "Threads",
    },
  ];

  return (
    <div className="social-style1 custom_icons">
      {socialIcons.map((social) => (
        <a
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
        >
          <i className={`${social.icon} list-inline-item`} />
        </a>
      ))}
    </div>
  );
};

export default Social;
