import React from "react";

const Footer = () => {
  // Smooth scroll to top when logo is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#0d0d14] text-gray-300 py-6 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* --- Secretary Contact --- */}
          <div>
            <h3 className="font-semibold text-white mb-2">Secretary Contact</h3>
            <p className="text-sm leading-relaxed mb-2">
              <span className="font-medium">Secretary:</span> Ajay Singh Tomar & Simran Singh
            </p>
            <p className="text-sm leading-relaxed mb-2">
              <span className="font-medium">Mobile:</span> +91 6266044118 , +91 7611164130
            </p>
            <p className="text-sm leading-relaxed">
              <span className="font-medium">Official Email:</span>{" "}
              <a
                href="mailto:technicalboard24@gmail.com"
                className="text-blue-400 hover:underline"
              >
                technicalboard@aitpune.edu.in
              </a>
            </p>
          </div>

          {/* --- About Techboard --- */}
          <div>
            <h3 className="font-semibold text-white mb-2">About Techboard</h3>
            <p className="text-sm leading-relaxed mb-2">
              Techboard is the official tech club of our college. Innovate,
              learn, and collaborate with passionate peers.
            </p>

            <div className="flex items-center justify-between mt-4">
              {/* --- Social Media Icons --- */}
              <div className="flex space-x-3">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ait-technical-board/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1a1a26] rounded-lg hover:bg-[#0077b5] transition"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <title>LinkedIn</title>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/aittechnicalboard?igsh=dHdqejY2cWR0Njly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1a1a26] rounded-lg hover:bg-pink-500 transition"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <title>Instagram</title>
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.523 19.86.227c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.82.679-1.38.896-.423.164-1.06.36-2.23.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.82-1.381-.896-.164-.423-.36-1.06-.413-2.23-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.055-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413C8.415 2.175 8.797 2.16 12 2.16zm0 5.482A4.36 4.36 0 1 0 12 16.32a4.36 4.36 0 0 0 0-8.676zm0 7.318A2.96 2.96 0 1 1 12 9.04a2.96 2.96 0 0 1 0 5.882zm6.361-8.404a1.08 1.08 0 1 0 0-2.16 1.08 1.08 0 0 0 0 2.16z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@TechnicalBoard-AITPune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#1a1a26] rounded-lg hover:bg-red-600 transition"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <title>YouTube</title>
                    <path d="M23.498 6.186a2.974 2.974 0 0 0-2.094-2.104C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.404.582A2.974 2.974 0 0 0 .502 6.186C0 8.085 0 12 0 12s0 3.915.502 5.814a2.974 2.974 0 0 0 2.094 2.104C4.495 20.5 12 20.5 12 20.5s7.505 0 9.404-.582a2.974 2.974 0 0 0 2.094-2.104C24 15.915 24 12 24 12s0-3.915-.502-5.814ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
                  </svg>
                </a>
              </div>

              {/* --- Clickable TECHBOARD Logo --- */}
              <button
                onClick={scrollToTop}
                className="focus:outline-none hover:scale-110 transition-transform cursor-pointer"
                aria-label="Scroll to top"
              >
                <img
                  src="/logo.jpg"
                  alt="Techboard Club Small Logo"
                  className="w-16 h-auto rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Line --- */}
      <div className="mt-6 border-t border-gray-700 pt-3 text-center text-sm text-gray-400">
        Made with <span className="text-red-500">❤️</span> and support by{" "}
        <span className="font-semibold text-white">Techboard</span>
      </div>
    </footer>
  );
};

export default Footer;
