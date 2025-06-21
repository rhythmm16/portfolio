'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building, Users, Calendar } from 'lucide-react';

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Research Contributor",
      organization: "Smart City Research Lab (Taiwan Collaboration)",
      period: "Dec 2024 – Present",
      description: "Working on AI + IoT-based scalable smart city models for Chandigarh and Taiwan. Developing Python-based data cleaning & mapping solutions for urban infrastructure optimization.",
      highlights: ["AI & IoT Integration", "Smart City Development", "International Collaboration", "Data Analysis"],
      icon: Building,
      color: "from-blue-600 to-cyan-600"
    },
    {
      title: "Campus Ambassador",
      organization: "Swiggy Creator Club",
      period: "Jan 2025 – Present",
      description: "Leading content campaigns, student engagement programs, and brand promotion events. Managing social media presence and organizing campus-wide marketing initiatives.",
      highlights: ["Content Marketing", "Event Management", "Social Media", "Brand Promotion"],
      icon: Users,
      color: "from-orange-600 to-red-600"
    },
    {
      title: "Class Representative",
      organization: "Chitkara University",
      period: "2023 – 2025",
      description: "Serving as CR for two consecutive years, demonstrating strong leadership skills. Coordinating between faculty and students, organizing academic events, and facilitating communication.",
      highlights: ["Leadership", "Communication", "Event Organization", "Team Management"],
      icon: Calendar,
      color: "from-purple-600 to-pink-600"
    }
  ];

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="experience" ref={ref} className="py-20 px-4">
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
            Experience & Leadership
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Building expertise through hands-on experience and meaningful contributions
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 to-cyan-600"></div>

          {experiences.map((experience, index) => {
            const IconComponent = experience.icon;
            return (
              <motion.div
                key={experience.title}
                variants={itemVariants}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r ${experience.color} border-4 border-slate-900 z-10`}></div>

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${experience.color}`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
                        <p className={`font-medium mb-2 bg-gradient-to-r ${experience.color} bg-clip-text text-transparent`}>
                          {experience.organization}
                        </p>
                        <p className="text-sm text-gray-400 mb-3">{experience.period}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;