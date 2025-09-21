import React, { useState, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Gift,
  Camera,
  Sparkles,
  Music,
  Star,
  Zap,
} from "lucide-react";

// Context for storing the girlfriend's name
const NameContext = createContext();

const useNameContext = () => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useNameContext must be used within NameProvider");
  }
  return context;
};

const NameProvider = ({ children }) => {
  const [name, setName] = useState("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

// Enhanced Floating Hearts Background Component
const FloatingHearts = () => {
  const hearts = Array.from({ length: 20 }, (_, i) => i);
  const heartEmojis = ["💕", "💖", "💗", "💝", "❤️", "🌸", "✨", "🦋"];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart}
          className="absolute text-2xl"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            y: (typeof window !== "undefined" ? window.innerHeight : 800) + 50,
            scale: Math.random() * 0.5 + 0.3,
            rotate: Math.random() * 360,
            opacity: 0.6,
          }}
          animate={{
            y: -50,
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            rotate: Math.random() * 360 + 180,
            opacity: [0.6, 0.8, 0.3, 0.6],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          {heartEmojis[Math.floor(Math.random() * heartEmojis.length)]}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Confetti Effect
const Confetti = ({ show, onComplete }) => {
  const particles = Array.from({ length: 80 }, (_, i) => i);
  const colors = [
    "bg-pink-400",
    "bg-purple-400",
    "bg-yellow-400",
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
  ];
  const shapes = ["rounded-full", "rounded-none", "rounded-lg"];

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className={`absolute w-3 h-3 ${
            colors[Math.floor(Math.random() * colors.length)]
          } ${shapes[Math.floor(Math.random() * shapes.length)]}`}
          initial={{
            x: (typeof window !== "undefined" ? window.innerWidth : 1200) / 2,
            y: (typeof window !== "undefined" ? window.innerHeight : 800) / 2,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: [0, 1.5, 0],
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.8,
            ease: "easeOut",
          }}
          onAnimationComplete={() => particle === 0 && onComplete()}
        />
      ))}
    </div>
  );
};

// New: Sparkle Animation Component
const SparkleEffect = ({ show }) => {
  const sparkles = Array.from({ length: 30 }, (_, i) => i);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle}
          className="absolute text-yellow-300"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800),
            scale: 0,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Typewriter Effect
const TypewriterText = ({ text, className = "", delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 50 + delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-pink-500"
      >
        |
      </motion.span>
    </span>
  );
};

// Page 1: Enhanced Name Input
const NameInputPage = ({ onNext }) => {
  const [inputName, setInputName] = useState("");
  const [showSparkles, setShowSparkles] = useState(false);
  const { setName } = useNameContext();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (inputName.trim()) {
      setName(inputName.trim());
      setShowSparkles(true);
      setTimeout(() => {
        onNext();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-100 via-purple-50 to-peach-100 flex items-center justify-center p-4">
      <FloatingHearts />
      <SparkleEffect show={showSparkles} />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl max-w-md w-full border border-white/50"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💕
          </motion.div>
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Before I start...
          </motion.h1>
          <TypewriterText
            text="Tell me your beautiful name 💖"
            className="text-gray-600 text-lg"
            delay={1000}
          />
        </motion.div>

        <div className="space-y-6">
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Your name here..."
            className="w-full p-4 text-lg rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white/70 text-center transition-all duration-300 focus:shadow-lg focus:scale-105"
            autoFocus
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
          />

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(255,192,203,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            Continue <Heart className="w-5 h-5 fill-current" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Page 2: Enhanced Welcome/Landing
const WelcomePage = ({ onNext }) => {
  const { name } = useNameContext();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(true);

  const handleHeartClick = () => {
    setShowConfetti(true);
    setTimeout(() => onNext(), 2000);
  };

  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-200 via-purple-100 to-orange-100 flex flex-col items-center justify-center p-4 relative">
      <FloatingHearts />
      <SparkleEffect show={showSparkles} />
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
        >
          <TypewriterText text={`Hi ${name} ❤️`} />
          <br />
          <span className="text-2xl md:text-3xl">this is just for you...</span>
        </motion.h1>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-12 relative"
        >
          <Heart className="w-40 h-40 mx-auto text-pink-500 fill-current drop-shadow-2xl" />
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 192, 203, 0.4)",
                "0 0 0 20px rgba(255, 192, 203, 0)",
                "0 0 0 0 rgba(255, 192, 203, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(255,192,203,0.4)",
            y: -5,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHeartClick}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white font-bold py-6 px-10 rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all duration-300 text-xl relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8 }}
          />
          Tap to feel my heart 💓
        </motion.button>
      </motion.div>
    </div>
  );
};

// Page 3: Enhanced Quotes & Expressions
const QuotesPage = ({ onNext }) => {
  const { name } = useNameContext();
  const [showSparkles, setShowSparkles] = useState(true);

 const quotes = [
  {
    text: `I’m sorry ${name}, gussa mat ho… warna main bas bhookha reh jaunga tumhare bina 😭🍕`,
    gif: "https://c.tenor.com/GAnWQh5LnF0AAAAC/tenor.gif"
  },
  {
    text: `Forgive me ${name}, warna tumhare bina toh main socks ki tarah kho jaunga washing machine me 🧦😂`,
    gif: "https://media1.tenor.com/m/MXhgLF7-FwAAAAAC/sorry.gif "
  },
  {
    text: `Sorry ${name}, tum gussa ho toh lagta hai Netflix ne subscription cancel kar diya 😩📺`,
    gif: "https://media1.tenor.com/m/zfQhho9jCQ0AAAAC/twitter-bubu-hitting-dudu.gif"
  },
  {
    text: `Chalo na ${name}, gussa chhodo… warna main tumhe roz free chocolates bhejna shuru kar dunga 🍫😉`,
    gif: "https://media1.tenor.com/m/av_ZXW5aSI4AAAAC/sorry.gif"
  },
  {
    text: `I’m really sorry ${name}, tum gussa ho toh mere phone ka WiFi bhi slow ho jaata hai 📱🐢`,
    gif: "https://media1.tenor.com/m/F6ku1Q-GjpAAAAAC/ami-ar-tomake-valobashi-na.gif"
  }
];


  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 p-4">
      <FloatingHearts />
      <SparkleEffect show={showSparkles} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 mt-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Sweet Words for {name} 💕
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
              }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: index * 0.3 + 0.5, duration: 1 }}
              />

              <div className="mb-6 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative"
                >
                  <img
                    src={quote.gif}
                    alt="cute gif"
                    className="w-32 h-32 object-cover rounded-2xl shadow-xl"
                    loading="lazy"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-pink-400/20 to-transparent"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </div>

              <motion.p
                className="text-gray-700 text-center text-lg mb-6 leading-relaxed font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.8 }}
              >
                {quote.text}
              </motion.p>

              <motion.div
                className="flex justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 1 }}
              >
                {["💖", "✨", "🌸"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                    className="text-2xl"
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-bold py-6 px-12 rounded-full shadow-2xl hover:shadow-purple-300/50 transition-all duration-300 flex items-center gap-3 mx-auto text-xl relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
            Next Surprise <Gift className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Page 4: Enhanced Photo Gallery
const PhotoGallery = ({ onNext }) => {
  const { name } = useNameContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSparkles, setShowSparkles] = useState(true);
  const photos = [
    {
      id: 1,
      src: "https://i.pinimg.com/1200x/bc/40/b2/bc40b229965e2c4bd0119e77b5bb2773.jpg",
      alt: "Beautiful moment 1",
    },
    {
      id: 2,
      src: "https://i.pinimg.com/1200x/ae/9e/8c/ae9e8cd1d39c84e0244682989fde9fba.jpg",
      alt: "Sweet memory 2",
    },
    {
      id: 3,
      src: "https://i.pinimg.com/736x/bf/19/cd/bf19cd20f6731fe86be5b3a4625b8d5d.jpg",
      alt: "Happy time 3",
    },
    {
      id: 4,
      src: "https://i.pinimg.com/1200x/2c/19/a0/2c19a0e16fe744137989f9d16509c264.jpg",
      alt: "Adventure together 4",
    },
    {
      id: 5,
      src: "https://i.pinimg.com/1200x/95/58/75/9558757c9f07071ea9bf1009d92fb373.jpg",
      alt: "Cozy moment 5",
    },
    {
      id: 6,
      src: "https://i.pinimg.com/1200x/11/88/37/118837580a1892c4c980792d72047210.jpg",
      alt: "Perfect day 6",
    },
  ];
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-100 via-pink-50 to-purple-50 p-4">
      {" "}
      <FloatingHearts /> <SparkleEffect show={showSparkles} />{" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto"
      >
        {" "}
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16 mt-8 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
        >
          {" "}
          Our Moments Together, {name} 💕{" "}
        </motion.h2>{" "}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate="show"
        >
          {" "}
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
              }}
              className="cursor-pointer overflow-hidden rounded-3xl shadow-xl bg-white p-3 relative group"
              onClick={() => setSelectedImage(photo)}
            >
              {" "}
              <motion.div className="absolute inset-0 bg-gradient-to-t from-pink-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl" />{" "}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-72 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />{" "}
              <motion.div
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                {" "}
                <Camera className="w-5 h-5 text-pink-600" />{" "}
              </motion.div>{" "}
            </motion.div>
          ))}{" "}
        </motion.div>{" "}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          {" "}
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)",
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold py-6 px-12 rounded-full shadow-2xl hover:shadow-rose-300/50 transition-all duration-300 flex items-center gap-3 mx-auto text-xl relative overflow-hidden"
          >
            {" "}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />{" "}
            One More Surprise <Sparkles className="w-6 h-6" />{" "}
          </motion.button>{" "}
        </motion.div>{" "}
      </motion.div>{" "}
      {/* Enhanced Lightbox Modal */}{" "}
      <AnimatePresence>
        {" "}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            {" "}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              />{" "}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                {" "}
                ✕{" "}
              </motion.button>{" "}
            </motion.div>{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
    </div>
  );
};

// Page 5: Enhanced Final Surprise
const FinalSurprise = () => {
  const { name } = useNameContext();
  const [showSparkles, setShowSparkles] = useState(true);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-200 via-pink-100 to-rose-100 flex items-center justify-center p-4 relative">
      <FloatingHearts />
      <SparkleEffect show={showSparkles} />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, type: "spring" }}
        className="text-center max-w-4xl relative z-10"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-9xl mb-12 relative"
        >
          💖
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 192, 203, 0.6)",
                "0 0 0 40px rgba(255, 192, 203, 0)",
                "0 0 0 0 rgba(255, 192, 203, 0)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 mb-12 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          <TypewriterText text={`${name}, no matter how far or close...`} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-3xl md:text-4xl text-gray-700 mb-12 font-semibold"
        >
          I'll always choose you ❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="flex flex-wrap gap-6 justify-center text-5xl mb-12"
        >
          {["💕", "🌹", "✨", "🦋", "🌸", "💖"].map((emoji, index) => (
            <motion.span
              key={index}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2.5,
                delay: index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hover:scale-125 transition-transform cursor-pointer"
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            "Every love story is beautiful, but ours is my favorite. Thank you
            for being the reason I believe in forever. 💫"
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    <NameInputPage onNext={() => setCurrentPage(1)} />,
    <WelcomePage onNext={() => setCurrentPage(2)} />,
    <QuotesPage onNext={() => setCurrentPage(3)} />,
    <PhotoGallery onNext={() => setCurrentPage(4)} />,
    <FinalSurprise />,
  ];

  return (
    <NameProvider>
      <div className="font-sans overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full"
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </NameProvider>
  );
};

export default App;
