import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;

  const media =
    width < 480
      ? "mobile"
      : width >= 480 && width < 768
      ? "mobile-up"
      : width >= 1200
      ? "desktop"
      : width >= 1040 && width < 1200
      ? "tablet-up"
      : "tablet";

  return {
    width,
    height,
    media,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
