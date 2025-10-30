import ParallaxFolderCard from "../components/ParallaxFolderCard.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/FooterCTA.jsx";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Loader from "../components/Loader.jsx";
import AnimatedBackground from "../components/AnimatedBackground.jsx";
import AOS from "aos";

/* ------------------- Slider ------------------- */
const ImageSlider = ({
  images,
  onExit,
  otherCards,
  onLaunchOther,
  transitioning,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isClarifying, setIsClarifying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, images]);

  // Keep showing current slide until the next image is decoded, then swap.
  const showSlide = useCallback(
    (index) => {
      if (index < 0 || index >= images.length) {
        onExit();
        return;
      }
      const nextSrc = images[index];
      setIsClarifying(true);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        const d = img.decode ? img.decode() : Promise.resolve();
        d.catch(() => {}).finally(() => {
          setCurrentIndex(index);
          setIsClarifying(false);
        });
      };
      img.onerror = () => {
        // Even on error, advance to avoid getting stuck
        setCurrentIndex(index);
        setIsClarifying(false);
      };
      img.src = nextSrc;
    },
    [images, onExit]
  );

  // Prefetch neighbors (next, prev, and one further ahead)
  useEffect(() => {
    const prefetch = (src) => {
      if (!src) return;
      const i = new Image();
      i.decoding = "async";
      i.src = src;
    };
    prefetch(images[currentIndex + 1]);
    prefetch(images[currentIndex - 1]);
    setTimeout(() => prefetch(images[currentIndex + 2]), 80);
  }, [currentIndex, images]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showSlide(currentIndex - 1);
      else if (event.key === "ArrowRight") showSlide(currentIndex + 1);
      else if (event.key === "Escape") onExit();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, showSlide, onExit]);

  return (
    <div className={`image-slider-view ${transitioning ? "is-transitioning" : ""}`}>
      {otherCards?.[0] && (
        <button
          className="edge-card left-edge"
          title={otherCards[0].title}
          onClick={() => onLaunchOther(otherCards[0].id)}
          style={{ backgroundImage: `url(${otherCards[0].images[0]})` }}
          aria-label={`Open ${otherCards[0].title}`}
        />
      )}
      {otherCards?.[1] && (
        <button
          className="edge-card right-edge"
          title={otherCards[1].title}
          onClick={() => onLaunchOther(otherCards[1].id)}
          style={{ backgroundImage: `url(${otherCards[1].images[0]})` }}
          aria-label={`Open ${otherCards[1].title}`}
        />
      )}

      <button className="corner-nav top-right close-all" onClick={onExit} aria-label="Close gallery">
        &times;
      </button>

      <section className="slider__content">
        <div className="slider-nav-area left" onClick={() => showSlide(currentIndex - 1)}>
          <div className="nav-arrow">‹</div>
        </div>
        <main className="image-display">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1} of ${images.length}`}
            className={isClarifying ? "clarify-start" : "clarify-end"}
            decoding="async"
            draggable="false"
            fetchpriority="high"
          />
        </main>
        <div className="slider-nav-area right" onClick={() => showSlide(currentIndex + 1)}>
          <div className="nav-arrow">›</div>
        </div>
      </section>

      <nav className="slider-navigation">
        {images.map((imgSrc, index) => (
          <button
            key={index}
            className="nav-button"
            aria-selected={currentIndex === index}
            onClick={() => showSlide(index)}
          >
            <img
              className="thumbnail"
              src={imgSrc}
              alt={`Thumbnail ${index + 1}`}
              loading="lazy"
              decoding="async"
              draggable="false"
            />
          </button>
        ))}
      </nav>
    </div>
  );
};

/* ------------------- Gallery (no intro animations) ------------------- */
const Gallery = () => {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [transitioning] = useState(false); // kept for CSS compatibility, always false (no intro)
  const [sliderStartIndex, setSliderStartIndex] = useState(0);

  // Keep track of dynamic <link> preloads so we can clean them up
  const headLinksRef = useRef([]);

  /* ---------- cards data ---------- */
  const cards = useMemo(
    () => [
      {
        id: "cardAakriti",
        title: "TECHNICAL AAKRITI",
        images: [
          "/TECHAAKRITI/p20.jpg",
          "/TECHAAKRITI/p2.jpg",
          "/TECHAAKRITI/p23.jpg",
          "/TECHAAKRITI/p13.jpg",
          "/TECHAAKRITI/p1.jpg",
          "/TECHAAKRITI/p19.jpg",
          "/TECHAAKRITI/p14.jpg",
        ],
      },
      {
        id: "cardSolutions",
        title: "SOLUTION",
        images: [
          "/SOLUTIONS/x1.jpg",
          "/SOLUTIONS/x2.jpg",
          "/SOLUTIONS/x13.jpg",
          "/SOLUTIONS/x4.jpg",
          "/SOLUTIONS/x8.jpg",
          "/SOLUTIONS/x7.jpg",
        ],
      },
      {
        id: "cardElevate",
        title: "Fun & Games",
        images: [
          "/gallery-images/fun3.jpg",
          "/gallery-images/fun4.jpg",
          "/gallery-images/fun5.jpg",
          "/gallery-images/fun11.jpg",
          "/gallery-images/fun8.jpg",
          "/gallery-images/fun10.jpg",
          "/gallery-images/fun9.jpg",
        ],
      },
    ],
    []
  );

  const selectedCardData = cards.find((card) => card.id === selectedCardId);
  const otherCards = cards.filter((card) => card.id !== selectedCardId);

  /* ---------- preload helpers ---------- */
  const preloadImage = (src, maxWaitMs = 900) =>
    new Promise((resolve) => {
      if (!src) return resolve();
      const img = new Image();
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        resolve();
      };
      const t = setTimeout(finish, maxWaitMs);
      img.onload = () => {
        const d = img.decode ? img.decode() : Promise.resolve();
        d.catch(() => {}).finally(() => {
          clearTimeout(t);
          finish();
        });
      };
      img.onerror = () => {
        clearTimeout(t);
        finish();
      };
      img.src = src;
    });

  const addPreloadLink = (href, rel, asType, priority) => {
    if (typeof document === "undefined" || !href) return null;
    const link = document.createElement("link");
    link.rel = rel;             // "preload" or "prefetch"
    if (asType) link.as = asType; // "image" for preload
    link.href = href;
    if (priority) link.fetchPriority = priority; // "high" or "low"
    document.head.appendChild(link);
    return link;
  };

  const clearHeadLinks = () => {
    headLinksRef.current.forEach((l) => l && l.remove());
    headLinksRef.current = [];
  };

  const installCardPreloads = (imgs, heroIdx = 0) => {
    const links = [];
    const hero = imgs[heroIdx];
    if (hero) links.push(addPreloadLink(hero, "preload", "image", "high"));
    if (imgs[heroIdx + 1]) links.push(addPreloadLink(imgs[heroIdx + 1], "prefetch", null, "low"));
    if (imgs[heroIdx + 2]) links.push(addPreloadLink(imgs[heroIdx + 2], "prefetch", null, "low"));
    headLinksRef.current.push(...links.filter(Boolean));
  };

  /* ---------- open/close handlers (instant) ---------- */
  const openCardInstant = (id) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    clearHeadLinks();
    installCardPreloads(card.images, 0);
    // Fire off a preload for the hero image, but don't wait for it
    preloadImage(card.images[0], 1500);
    setSliderStartIndex(0);
    setSelectedCardId(id);
  };

  const handleCardClick = (card) => {
    openCardInstant(card.id);
  };

  /* ---------- initial view and loading ---------- */
  const showInitial = !selectedCardId;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup preloads on unmount
  useEffect(() => {
    return () => clearHeadLinks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <AnimatedBackground />
      </div>
      <Header />

      <div className={`gallery-v2-container ${selectedCardId ? "gallery-v2-active" : ""}`}>
        {showInitial && (
          <div className="gallery-initial-view">
            {/* Horizontal grid wrapper */}
            <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => {
                const imgs = card.images || [];
                const previewA = imgs[0];
                const previewB = imgs.length > 1 ? imgs[imgs.length - 1] : undefined;

                return (
                  <ParallaxFolderCard
                    key={card.id}
                    className="folder-large"
                    onClick={() => handleCardClick(card)}
                    title={card.title}
                    previewA={previewA}
                    previewB={previewB}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Slider renders immediately, no overlay */}
        {selectedCardId && selectedCardData && (
          <div className={`gallery-main-view ${transitioning ? "transitioning" : ""} anuj`}>
            <ImageSlider
              images={selectedCardData.images}
              onExit={() => {
                clearHeadLinks();
                setSelectedCardId(null);
              }}
              otherCards={otherCards}
              onLaunchOther={(id) => openCardInstant(id)}
              transitioning={transitioning}
              initialIndex={sliderStartIndex}
            />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Gallery;