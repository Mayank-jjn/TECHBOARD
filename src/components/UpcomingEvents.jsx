import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Event data
const events = [
  {
    id: "web3-metaverse",
    displayDate: "OCT 08 2025",
    countdownDate: "2026-02-26T09:00:00",
    title: "SOLUTIONS 2K26",
    location: "AIT PUNE",
    description:
      "Join us at Solutions, Pune’s biggest tech fest with exciting coding, gaming, and tech events!",
    imageUrl: "upcomingEvent/solution.png",
  },
  {
    id: "ai-in-design",
    displayDate: "NOV 15 2025",
    countdownDate: "2026-01-22T00:00:00",
    title: "TECHNICAL AAKRITI",
    location: "AIT PUNE",
    description:
      "Join us for Technical Aakriti, our college’s exclusive tech event featuring exciting coding, gaming, and innovation challenges!",
    imageUrl: "upcomingEvent/tech.png",
  },
];

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const diff = +new Date(targetDate) - +new Date();
    if (diff <= 0) return {};
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / 1000 / 60) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!Object.keys(timeLeft).length) {
    return (
      <div className="flex justify-center my-3">
        <span className="text-[#00ff88] font-bold tracking-wider animate-pulse">
          ● EVENT IS LIVE
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-center gap-3 my-4">
      {Object.keys(timeLeft).map((key) => (
        <div key={key} className="flex flex-col items-center">
          <div className="w-10 h-10 bg-[#111] border border-[#3a86ff]/50 rounded-md flex items-center justify-center">
            <span className="text-lg font-bold text-white font-mono">
              {String(timeLeft[key]).padStart(2, "0")}
            </span>
          </div>
          <span className="text-[10px] text-gray-400 mt-1 uppercase">
            {key}
          </span>
        </div>
      ))}
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, index }) => {
  const [buttonText, setButtonText] = useState("Register");

  const handleButtonClick = (e) => {
    e.preventDefault();
    setButtonText("Coming Soon...");
  };

  return (
    <Link to="#" className="no-underline group relative">
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#3a86ff] to-[#ff006e] rounded-[30px] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="
          relative bg-gradient-to-br from-[#161920] to-[#0d0f12]
          border border-[#3a86ff]/30 rounded-[30px]
          overflow-hidden h-full flex flex-col
          shadow-[0_0_20px_rgba(58,134,255,0.1)]
          hover:shadow-[0_0_40px_rgba(58,134,255,0.3)]
          transition-all duration-300
        "
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <motion.img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
            {event.location}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2 tracking-wide group-hover:text-[#3a86ff] transition-colors">
            {event.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* CENTERED TIMER */}
          <CountdownTimer targetDate={event.countdownDate} />

          {/* Button */}
          <div className="mt-auto pt-4">
            <motion.button
              onClick={handleButtonClick}
              whileTap={{ scale: 0.95 }}
              // Added cursor-pointer here
              className="w-full text-white font-semibold text-sm
                bg-gradient-to-r from-[#3a86ff] to-[#ff006e]
                px-6 py-3 rounded-full shadow-lg
                hover:shadow-xl hover:brightness-110 transition-all cursor-pointer"
            >
              {buttonText}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const UpcomingEvents = () => {
  return (
    <div className="w-full py-20 px-4 relative overflow-hidden">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');`}
      </style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Upcoming{" "}
          <span className="bg-gradient-to-r from-[#3a86ff] to-[#00d4ff] bg-clip-text text-transparent">
            Events
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore the future of tech. Join us for hackathons, coding battles, and innovation showcases.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;