'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Trophy, Star, BookOpen } from 'lucide-react';

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const achievements = [
    {
      category: "Certifications",
      items: [
        {
          title: "Red Hat Certified System Administrator (RHCSA)",
          issuer: "Red Hat",
          icon: Award,
          color: "from-red-600 to-pink-600"
        },
        {
          title: "IEEE English Proficiency Certificate",
          issuer: "IEEE",
          icon: BookOpen,
          color: "from-blue-600 to-cyan-600"
        }
      ]
    },
    {
      category: "Competition Achievements",
      items: [
        {
          title: "Finalist - Hack With Her 4.0",
          issuer: "Top 5 Nationally",
          icon: Trophy,
          color: "from-purple-600 to-pink-600"
        },
        {
          title: "Top 30 - Tech Avinya",
          issuer: "CSE Project Showcase",
          icon: Star,
          color: "from-green-600 to-teal-600"
        }
      ]
    },
    {
      category: "Online Learning",
      items: [
        {
          title: "NPTEL Certifications",
          issuer: "Multiple Courses",
          icon: BookOpen,
          color: "from-orange-600 to-red-600"
        },
        {
          title: "Coursera Certifications",
          issuer: "Various Specializations",
          icon: Award,
          color: "from-indigo-600 to-purple-600"
        }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  return (
    <section ref={ref} className="py-20 px-4 bg-gradient-to-r from-slate-900/50 to-purple-900/50">
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
            Certifications & Achievements
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Recognition for dedication to continuous learning and excellence
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8"
        >
          {achievements.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-white text-center mb-6">
                {category.category}
              </h3>
              
              {category.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ delay: categoryIndex * 0.2 + itemIndex * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 h-[140px] flex flex-col justify-center"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} flex-shrink-0`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <h4 className="text-base font-bold text-white mb-1 leading-tight line-clamp-2">
                          {item.title}
                        </h4>
                        <p className={`text-sm font-medium bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.issuer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "5+", label: "Certifications" },
            { number: "2", label: "Competition Wins" },
            { number: "10+", label: "Projects" },
            { number: "2", label: "Years Leadership" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;