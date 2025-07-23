'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

type Review = {
  id: number;
  name: string;
  content: string;
  rating: number;
  date: string;
};

const ReviewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Current review index for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  // Direction for animation
  const [[page, direction], setPage] = useState([0, 0]);
  // Auto-rotate timer
  const [autoRotate, setAutoRotate] = useState(true);

  // Hardcoded reviews
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      name: "Alex Chen",
      content: "Working with Rhythm was an absolute pleasure! Their technical skills, creativity and problem-solving abilities made our project a huge success.",
      rating: 5,
      date: "April 15, 2025"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      content: "Exceptional work ethic and attention to detail. Delivered complex features ahead of schedule and exceeded all expectations.",
      rating: 5,
      date: "May 3, 2025"
    },
    {
      id: 3,
      name: "Dev Patel",
      content: "Rhythm's technical expertise and innovative approach brought our vision to life. Highly recommended for any challenging project!",
      rating: 4,
      date: "March 28, 2025"
    }
  ]);

  // Auto-rotate through reviews every 3 seconds
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      nextReview();
    }, 3000);
    
    return () => clearInterval(interval);
  }, [currentIndex, reviews.length, autoRotate]);

  // Navigation functions
  const nextReview = () => {
    setPage([page + 1, 1]);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setPage([page - 1, -1]);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Render stars for rating
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={18}
          className={`${
            index < rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-500"
          }`}
        />
      ));
  };

  // Pagination indicators
  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-6 gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setPage([index > currentIndex ? page + 1 : page - 1, index > currentIndex ? 1 : -1]);
              setCurrentIndex(index);
              setAutoRotate(false);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-purple-500 w-6" : "bg-gray-600"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Slide variants for carousel
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section id="reviews" ref={ref} className="py-20 px-4 bg-gradient-to-br from-purple-900/50 via-slate-800/50 to-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Client Testimonials
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            What people are saying about working with me
          </motion.p>
        </motion.div>

        <div className="grid place-items-center">
          {/* Reviews Carousel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-2xl w-full"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold text-white mb-6"
            >
              Recent Feedback
            </motion.h3>

            {/* Carousel Container */}
            <div className="relative h-[280px] md:h-[240px]">
              {/* Navigation buttons */}
              <div className="absolute inset-y-0 left-0 flex items-center -ml-4 z-10">
                <button 
                  onClick={() => {
                    prevReview();
                    setAutoRotate(false);
                  }}
                  className="bg-slate-800/70 hover:bg-slate-700 rounded-full p-2 text-gray-300 hover:text-white transition-colors"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
              
              <div className="absolute inset-y-0 right-0 flex items-center -mr-4 z-10">
                <button 
                  onClick={() => {
                    nextReview();
                    setAutoRotate(false);
                  }}
                  className="bg-slate-800/70 hover:bg-slate-700 rounded-full p-2 text-gray-300 hover:text-white transition-colors"
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Review Cards */}
              <div className="h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="h-full"
                  >
                    {reviews.length > 0 && (
                      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          {renderStars(reviews[currentIndex].rating)}
                        </div>
                        
                        <div className="relative flex-grow">
                          <Quote className="w-8 h-8 text-purple-500/20 absolute -left-2 -top-2" />
                          <p className="text-gray-300 mb-4 pl-4 relative z-10 italic">
                            "{reviews[currentIndex].content}"
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-center mt-auto">
                          <div>
                            <h4 className="font-bold text-white">{reviews[currentIndex].name}</h4>
                          </div>
                          <p className="text-xs text-gray-500">{reviews[currentIndex].date}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination dots */}
            {renderPagination()}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;