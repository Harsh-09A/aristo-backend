import Link from "next/link";


const priceList = [
  { id: 1, title: "50L - 80L", link: "/" },
  { id: 2, title: "80L - 1Cr", link: "/" },
  { id: 3, title: "1Cr - 2Cr", link: "/" },
  { id: 4, title: "2Cr - 3Cr", link: "/" },
  { id: 5, title: "3Cr - 5Cr", link: "/" },
  { id: 6, title: "5Cr & Above", link: "/" },
];

const PricesCard = () => {
  return (
    <>
      {priceList.map((list, index) => (
        <div className="col-auto px-1 mx-1" key={index}>
          <Link href={list.link}>
            <div className="apartment-category d-flex align-items-center">
              <span className={`icon flex-shrink-0 ${"flaticon-home"}`} />
              <div className="content flex-shrink-1">
                <h6 className="title mb-0">{list.title}</h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PricesCard;
