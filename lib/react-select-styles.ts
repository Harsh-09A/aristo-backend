import type { StylesConfig } from "react-select";

// Ye ek hi style object saare Select components me reuse hoga,
// taki design consistent rahe aur baar-baar likhna na pade.
export const selectStyles: StylesConfig<any, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 10,
    border: "1px solid transparent",
    backgroundColor: "#f5f5f7",
    boxShadow: "none",
    cursor: "pointer",
    ...(state.isFocused && {
      borderColor: "var(--main-color, #e9433b)",
      backgroundColor: "#fff",
    }),
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 14px" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#8a8a8a" }),
  placeholder: (base) => ({ ...base, color: "#6b6f76", fontSize: 14, fontWeight: 500 }),
  singleValue: (base) => ({ ...base, fontSize: 14, color: "#16181d", fontWeight: 600 }),
  menu: (base) => ({ ...base, borderRadius: 10, overflow: "hidden", zIndex: 30 }),
  option: (base, state) => ({
    ...base,
    fontSize: 14,
    backgroundColor: state.isSelected
      ? "var(--main-color, #e9433b)"
      : state.isFocused
      ? "#f5f5f7"
      : "#fff",
    color: state.isSelected ? "#fff" : "#222",
    cursor: "pointer",
  }),
};