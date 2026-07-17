// components/Pagination.tsx

import Link from "next/link";
import styles from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
  basePath: string; // e.g. "/listings" or "/developers/akshar-group"
};

// Current filters ko preserve karte hue sirf "page" number badalta hai
function buildPageHref(
  basePath: string,
  searchParams: Props["searchParams"],
  page: number
) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (key === "page" || !value) return;
    const v = Array.isArray(value) ? value[0] : value;
    if (v) params.set(key, v);
  });

  if (page > 1) params.set("page", String(page));

  const qs = params.toString();
  return `${basePath}${qs ? `?${qs}` : ""}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
  basePath,
}: Props) {
  if (totalPages <= 1) return null;

  // Current page ke aas-paas ke numbers + first + last dikhao
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <nav aria-label="Pagination" className={styles.wrap}>
      <ul className={styles.list}>
        <li>
          <Link
            href={buildPageHref(basePath, searchParams, Math.max(1, currentPage - 1))}
            className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ""}`}
          >
            Prev
          </Link>
        </li>

        {pages.map((p, idx) => (
          <li key={p} className={styles.pageItem}>
            {idx > 0 && pages[idx - 1] !== p - 1 && <span className={styles.dots}>...</span>}
            <Link
              href={buildPageHref(basePath, searchParams, p)}
              className={`${styles.pageBtn} ${p === currentPage ? styles.active : ""}`}
            >
              {p}
            </Link>
          </li>
        ))}

        <li>
          <Link
            href={buildPageHref(basePath, searchParams, Math.min(totalPages, currentPage + 1))}
            className={`${styles.pageBtn} ${currentPage === totalPages ? styles.disabled : ""}`}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}