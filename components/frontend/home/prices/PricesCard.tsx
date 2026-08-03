import Link from "next/link";

// const priceList = [
//   { id: 1, title: "50L - 80L", link: "/" },
//   { id: 2, title: "80L - 1Cr", link: "/" },
//   { id: 3, title: "1Cr - 2Cr", link: "/" },
//   { id: 4, title: "2Cr - 3Cr", link: "/" },
//   { id: 5, title: "3Cr - 5Cr", link: "/" },
//   { id: 6, title: "5Cr & Above", link: "/" },
// ];

const priceList = [
  {
    id: 1,
    title: "1Cr - 2Cr",
    link: "/listings?category=Residential&min_price=10000000&max_price=20000000",
  },
  {
    id: 2,
    title: "2Cr - 3Cr",
    link: "/listings?category=Residential&min_price=20000000&max_price=30000000",
  },
  {
    id: 3,
    title: "3Cr - 4Cr",
    link: "/listings?category=Residential&min_price=30000000&max_price=40000000",
  },
  {
    id: 4,
    title: "4Cr - 5Cr",
    link: "/listings?category=Residential&min_price=40000000&max_price=50000000",
  },
  {
    id: 5,
    title: "5Cr - 7Cr",
    link: "/listings?category=Residential&min_price=50000000&max_price=70000000",
  },
  {
    id: 6,
    title: "7Cr & Above",
    link: "/listings?category=Residential&min_price=70000000",
  },
];

const PricesCard = () => {
  return (
    <>
      {priceList.map((list) => (
        // col-md-2 * 6 items = 12 columns → row ki full width exactly fill hogi
        // chhote screens pe 2-3 per row wrap ho jayega
        <div className="col-6 col-sm-4 col-md-2" key={list.id}>
          <Link href={list.link} className="text-decoration-none d-block">
            <div className="apartment-category d-flex align-items-center">
              <span className="icon flex-shrink-0 flaticon-home" />
              <div className="content flex-shrink-1">
                <h6
                  className="title mb-0 text-nowrap"
                  // style={{ fontSize: "0.85rem" }}
                >
                  {list.title}
                </h6>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default PricesCard;
