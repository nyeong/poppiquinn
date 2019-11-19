const { sin, cos, asin, sqrt } = Math;
const AVG_EARTH_RADIUS_KM = 6371.0088;

const to_radians = degrees => (degrees * Math.PI) / 180;

// haversine formula
const has_latlng = point =>
  typeof point["lat"] === "number" && typeof point["lng"] === "number";

const haversine = (point1, point2) => {
  if (!has_latlng(point1) && !has_latlng(point2)) throw Error("Wrong Argument");
  const lat1 = to_radians(point1["lat"]);
  const lng1 = to_radians(point1["lng"]);
  const lat2 = to_radians(point2["lat"]);
  const lng2 = to_radians(point2["lng"]);

  const lat = lat2 - lat1;
  const lng = lng2 - lng1;
  d = sin(lat * 0.5) ** 2 + cos(lat1) * cos(lat2) * sin(lng * 0.5) ** 2;
  return 2 * AVG_EARTH_RADIUS_KM * asin(sqrt(d));
};

module.exports = {
  haversine
};
