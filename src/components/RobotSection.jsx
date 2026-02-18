// src/components/RobotSection.jsx
import React, { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

export const RobotSection = ({ sectionTop, sectionHeight }) => {
  const [offsetY, setOffsetY] = useState(0);
  const topBuffer = 20; // Distance from top of viewport

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const robotHeight = 250; // Robot container height

      if (scrollY < sectionTop) {
        setOffsetY(0);
      } else if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight - robotHeight) {
        const relativeScroll = scrollY - sectionTop;
        const maxOffset = sectionHeight - robotHeight;
        const newOffset = (relativeScroll / (sectionHeight - robotHeight)) * maxOffset;
        setOffsetY(newOffset);
      } else if (scrollY > sectionTop + sectionHeight - robotHeight) {
        setOffsetY(sectionHeight - robotHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionTop, sectionHeight]);

  return (
    <div
      className="robot-spline-container absolute z-50 transition-transform duration-200 ease-out left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12 w-28 sm:w-36 md:w-72 h-28 sm:h-40 md:h-96"
      style={{
        top: `${topBuffer + offsetY + 20}px`, // include small vertical nudge inline so transforms don't clash
      }}
    >
      <Spline
        className="absolute top-0 left-0 h-full w-full"
        scene="https://prod.spline.design/eRfU-oGvcB4mJMx7/scene.splinecode"
      />
    </div>
  );
};
