const PROPERTY_CATEGORIES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

const residentialOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "studio", label: "Studio" },
  { value: "bungalow", label: "Bungalow" },
  { value: "villa", label: "Villa" },
];

const commercialOptions = [
  { value: "office", label: "Office" },
  { value: "shop", label: "Shop" },
  { value: "showroom", label: "Showroom" },
  { value: "warehouse", label: "Warehouse" },
];

const locationOptions = [
  // { value: "All Cities", label: "All Cities" },
  { value: "panvel", label: "Panvel" },
  { value: "vashi", label: "Vashi" },
  { value: "uran", label: "Uran" },
  { value: "sanpada", label: "Sanpada" },
  { value: "cbd-belapur", label: "CBD Belapur" },
  { value: "airoli", label: "Airoli" },
  { value: "kharghar", label: "Kharghar" },
];

const bhkOptions = [
  { value: 1, label: "1 BHK" },
  { value: 2, label: "2 BHK" },
  { value: 3, label: "3 BHK" },
  { value: 4, label: "4 BHK" },
  { value: 5, label: "5 BHK" },
];

const maxOptions = [
  { value: 1000000, label: "10 Lakh" },
  { value: 5000000, label: "50 Lakh" },
  { value: 10000000, label: "1 Cr" },
  { value: 100000000, label: "10 Cr" },
];

const minOptions = [
  { value: 1000000, label: "10 Lakh" },
  { value: 5000000, label: "50 Lakh" },
  { value: 10000000, label: "1 Cr" },
  { value: 100000000, label: "10 Cr" },
];

const statusOptions = [
  { value: "rtmi", label: "RTMI" },
  { value: "new_launch", label: "New Launch" },
  { value: "under_contruction", label: "Under-Contruction" },
];

export {
  PROPERTY_CATEGORIES,
  residentialOptions,
  commercialOptions,
  locationOptions,
  bhkOptions,
  maxOptions,
  minOptions,
  statusOptions,
};
