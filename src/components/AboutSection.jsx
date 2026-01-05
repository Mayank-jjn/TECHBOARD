import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();

  // Animation variants for the floating images (Desktop only)
  const floatAnimation = (delay) => ({
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      delay: delay,
    },
  });

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 py-16 relative">
      {/* Injecting the Google Font locally */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Tagesschrift&display=swap');
        `}
      </style>

      {/* --- Main Header --- */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-10 
        bg-gradient-to-r from-[#3a86ff] via-[#ff9a3c] to-[#ff006e] 
        bg-clip-text text-transparent tracking-wide drop-shadow-lg"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        About Us
      </motion.h1>

      {/* --- Main Content Card --- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          relative w-full max-w-6xl bg-[#1A1D24] text-white rounded-[30px] border-2
          border-[#3a86ff] shadow-[0_0_30px_rgba(58,134,255,0.4)] 
          p-8 md:p-10 overflow-hidden min-h-[300px] flex items-center justify-center
        "
      >
        {/* Grid Layout: Left Images | Center Text | Right Images */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 w-full">
          
          {/* --- LEFT COLUMN IMAGES (HIDDEN ON MOBILE) --- */}
          <div className="hidden md:flex flex-col gap-6 w-1/4 items-center">
            <motion.div
              animate={floatAnimation(0)}
              className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
            >
              <img src="/home-images/h1.jpg" alt="Event 1" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              animate={floatAnimation(1.5)} 
              className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
            >
              <img src="/home-images/h3.jpg" alt="Event 2" className="w-full h-full object-cover" />
            </motion.div>
          </div>

          {/* --- CENTER TEXT CONTENT --- */}
          <div className="flex-1 flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto">
            
            {/* FULL TEXT (Visible on all screen sizes) */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl lg:text-3xl font-medium leading-relaxed tracking-wide text-gray-200"
              style={{ fontFamily: "'Tagesschrift', cursive" }}
            >
              We host{" "}
              <span className="text-[#ff006e]">coding contests</span>,{" "}
              <span className="text-[#ff006e]">gaming tournaments</span>,{" "}
              <span className="text-[#ff006e]">hackathons</span>, and{" "}
              <span className="text-[#ff006e]">technical festivals</span>{" "}
              while representing our college at national-level tech events.
            </motion.h2>

            {/* UPDATED WATCH VIDEO BUTTON */}
            <motion.button
              onClick={() => navigate("/watch-recap")}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group flex items-center gap-3 bg-gradient-to-r from-[#3a86ff] to-[#ff006e] text-white rounded-full py-3 px-8 text-base md:text-lg font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <div className="bg-white text-[#3a86ff] rounded-full p-1 group-hover:text-[#ff006e] transition-colors">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span>Watch Video</span>
            </motion.button>
          </div>

          {/* --- RIGHT COLUMN IMAGES (HIDDEN ON MOBILE) --- */}
          <div className="hidden md:flex flex-col gap-6 w-1/4 items-center">
            <motion.div
              animate={floatAnimation(0.5)} 
              className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
            >
              <img src="/home-images/h2.jpg" alt="Event 3" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              animate={floatAnimation(2)}
              className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
            >
              <img src="/home-images/h4.jpg" alt="Event 4" className="w-full h-full object-cover" />
            </motion.div>
          </div>

        </div>

        {/* --- Background Glow --- */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#3a86ff] opacity-[0.03] blur-[100px] rounded-full"></div>
        </div>

      </motion.div>
    </div>
  );
};

export default AboutSection;