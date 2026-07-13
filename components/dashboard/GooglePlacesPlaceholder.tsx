// This is a placeholder panel only. It does NOT call the Google Places API.
// It just explains, for future reference, how you'd wire up real address
// autocomplete if you want to add it later.
export default function GooglePlacesPlaceholder() {
  return (
    <div className="card border-info mb-3">
      <div className="card-body">
        <h6 className="card-title text-info">
          <i className="bi bi-geo-alt-fill me-2"></i>
          Google Places Autocomplete (not connected yet)
        </h6>
        <p className="card-text small text-muted mb-2">
          Right now the "Address" field below is a plain text box. To turn it
          into a live autocomplete search box, you would:
        </p>
        <ol className="small text-muted mb-0">
          <li>Get a Google Maps API key with the "Places API" enabled.</li>
          <li>
            Load the Google Maps JavaScript library on this page (usually via
            the <code>@googlemaps/js-api-loader</code> package).
          </li>
          <li>
            Attach <code>google.maps.places.Autocomplete</code> to the address
            input, so it suggests real addresses as the admin types.
          </li>
          <li>
            When a suggestion is picked, read its latitude/longitude and
            formatted address, and save those into the form state.
          </li>
        </ol>
      </div>
    </div>
  );
}
