import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/FooterCTA.jsx";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import NewProfileCard from "./NewProfileCard.jsx";
import { motion } from "framer-motion";
import AOS from "aos";

function Team() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />

      {/* Team Section */}
      <section className="px-6 py-16">
        <div className="animated-heading-container">
          <motion.div
            className="heading-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1>SECRETARIES</h1>
          </motion.div>
        </div>

        <div
          className="
            flex 
            flex-wrap 
            justify-center
          "
        >
          <NewProfileCard
            name="Shashank Tiwari"
            title="Aspiring Backend Developer"
            description="Cricket. Code. Solve. Compete."
            imageUrl="Team/sec1.jpg"
          />
          <NewProfileCard
            name="Sneha"
            title="Tech-savvy"
            description="Every function has a story, every novel has a logic."
            imageUrl="Team/sec2.jpg"
          />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="animated-heading-container">
          <motion.div
            className="heading-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1>DEVELOPER TEAM </h1>
          </motion.div>
        </div>

        <div
          className="
            grid 
            gap-8
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
            justify-items-center
          "
        >
          <NewProfileCard
            name="Rishabh Chandel"
            title="Full Stack Developer"
            description="A versatile developer building complete applications, from UI to server logic."
            imageUrl="Team/te1.jpg"
          />

          <NewProfileCard
            name="Aditya Karki"
            title="Full Stack Developer"
            description="Engineering the scalable, high-performance logic and APIs that power modern applications."
            imageUrl="Team/te2.jpg"
          />

          <NewProfileCard
            name="Shashank Tiwari"
            title="Aspiring Backend Developer"
            description="Cricket. Code. Solve. Compete."
            imageUrl="Team/te3.jpg"
          />

          <NewProfileCard
            name="Bikash Kumar Sharma"
            title="AI/ML Engineer"
            description="Turning data into intelligence. From algorithms to insights."
            imageUrl="Team/te4.jpg"
          />

          {/* Extra cards */}
          <NewProfileCard
            name="Mayank Dhaka"
            title="Aspiring Software Developer"
            description="Solving problems, optimizing logic, and thriving under constraints."
            imageUrl="Team/se1.png"
          />

          <NewProfileCard
            name="Mohit Dhaka"
            title="Aspiring Software Developer"
            description="Problem Solving. Bridging the gap between real-world applications."
            imageUrl="Team/se2.png"
          />

          <NewProfileCard
            name="Afridi"
            title="Aspiring Software Developer"
            description="Chess, CP, Problem Solving."
            imageUrl="Team/se3.png"
          />

          <NewProfileCard
            name="Anuj Kumar Sharma"
            title="Code-Blooded"
            description="Chess, CP, Analytical thinking."
            imageUrl="Team/se4.png"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Team;
