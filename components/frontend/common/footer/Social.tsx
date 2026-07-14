import React from "react";

const Social = () => {
  const socialIcons = [
    "fab fa-facebook-f",
    "fab fa-twitter",
    "fab fa-instagram",
    "fab fa-linkedin-in",
  ];

  return (
    <div className="social-style1 custom_icons">
      {socialIcons.map((iconClass, index) => (
        <a key={index} href="#">
          <i className={iconClass + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;
