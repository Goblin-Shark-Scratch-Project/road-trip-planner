import React from "react";
import { useSelector } from "react-redux";

const Map = () => {
  const destination = useSelector(
    (state) => state.genSettings.destination
  ).replace(/\s/, "+");
  const origin = useSelector((state) => state.genSettings.origin).replace(
    /\s/,
    "+"
  );
  const waypointStr = useSelector((state) => state.genSettings.waypointStr);

  const url =
    destination === "" || origin === ""
      ? `https://www.google.com/maps/embed/v1/view?key=${process.env.GOOGLE_API_KEY}&center=39.828175,-98.5795`
      : `https://www.google.com/maps/embed/v1/directions?key=${process.env.GOOGLE_API_KEY}=&origin=${origin}&destination=${destination}${waypointStr}`;
  return <iframe style={styles.map} src={url}></iframe>;
};

const styles = {
  map: {
    width: "670",
    height: "420",
  },
};

export default Map;
