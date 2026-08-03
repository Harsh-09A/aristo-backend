function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const roundedUp = rating - fullStars >= 0.75;
  const totalFull = roundedUp ? fullStars + 1 : fullStars;
  const emptyStars = 5 - totalFull - (hasHalfStar ? 1 : 0);

  return (
    <span className="star-rating">
      {Array.from({ length: totalFull }).map((_, i) => (
        <i key={`full-${i}`} className="la la-star" style={{ color: "#ff481f" }}></i>
      ))}
      {hasHalfStar && (
        <i className="la la-star-half-alt" style={{ color: "#ff481f" }}></i>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <i key={`empty-${i}`} className="la la-star" style={{ color: "#ddd" }}></i>
      ))}
    </span>
  );
}
export default StarRating