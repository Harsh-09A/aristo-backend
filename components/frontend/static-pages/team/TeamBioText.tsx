"use client";

import { useState } from "react";

type TeamBioTextProps = {
  firstParagraph: string;
  restParagraphs: string[];
};

// Sirf bio text + read more button ka logic yahan hai.
// Desktop pe pura bio hamesha visible rahega (CSS se force kiya hai),
// mobile pe hi collapse/expand chalega.
const TeamBioText = ({ firstParagraph, restParagraphs }: TeamBioTextProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Pehla paragraph hamesha visible — mobile ho ya desktop */}
      <p className="text mb15">{firstParagraph}</p>

      {restParagraphs.length > 0 && (
        <>
          {/* `extra-bio` class default hidden hai (mobile), `is-open` class
              se mobile pe show hota hai, aur lg+ screen pe CSS media query
              se hamesha show force ho jaata hai — neeche style tag dekho */}
          <div className={`extra-bio ${isOpen ? "is-open" : ""}`}>
            {restParagraphs.map((para, i) => (
              <p className="text mb15" key={i}>
                {para}
              </p>
            ))}
          </div>

          {/* Button sirf mobile/tablet pe dikhega — `d-lg-none` Bootstrap
              utility class se desktop pe hide ho jaata hai */}
          <button
            className="btn btn-sm btn-outline-dark rounded-pill px-3 d-lg-none"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? "Read Less" : "Read More"}
          </button>

          <style jsx>{`
            .extra-bio {
              display: none;
            }
            .extra-bio.is-open {
              display: block;
            }
            /* lg breakpoint (992px) se upar — bio hamesha fully visible,
               chahe isOpen state kuch bhi ho */
            @media (min-width: 992px) {
              .extra-bio {
                display: block !important;
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default TeamBioText;