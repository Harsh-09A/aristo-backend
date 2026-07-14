import React from "react";

interface SectionHeadingProps {
  heading: string;
  title: string;
  highlight: string;
  subtitle: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  heading,
  title,
  highlight,
  subtitle,
}) => {
  return (
    <>
      <div>
        <div className=" section_top_heading">{heading}</div>
        <h2 className=" section_title">
          {title} <span>{highlight}</span>
        </h2>
        <p className=" section_subtitle">{subtitle}</p>
      </div>
    </>
  );
};

export default SectionHeading;
