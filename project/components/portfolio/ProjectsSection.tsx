'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Heart, MapPin, ShoppingCart } from 'lucide-react';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "SheWell",
      subtitle: "AI-Powered Women's Health Platform",
      description: "AI-driven web app offering menstrual health tracking, emergency aid, and wellness support with personalized recommendations.",
      tech: ["Python", "Node.js", "React.js", "TensorFlow", "MongoDB", "Google Calendar API"],
      icon: Heart,
      color: "from-pink-600 to-rose-600",
      status: "Live"
    },
    {
      title: "Journey Junction",
      subtitle: "AI Travel Companion",
      description: "Real-time assistant for travel with weather updates, translation services, and navigation support for seamless journeys.",
      tech: ["JavaScript", "HTML", "CSS", "Maps API", "Weather API", "Translate API"],
      icon: MapPin,
      color: "from-blue-600 to-cyan-600",
      status: "Beta"
    },
    {
      title: "Crave Cart",
      subtitle: "Smart Grocery Platform",
      description: "AI-based grocery and food ordering platform with personalization, budget optimization, and smart recommendations.",
      tech: ["React.js", "Node.js", "MongoDB", "OpenAI API"],
      icon: ShoppingCart,
      color: "from-green-600 to-emerald-600",
      status: "Development"
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
    <section id="projects" ref={ref} className="py-20 px-4">
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
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Innovative solutions that blend creativity with cutting-edge technology
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Live' ? 'bg-green-900/50 text-green-400 border border-green-500/50' :
                    project.status === 'Beta' ? 'bg-blue-900/50 text-blue-400 border border-blue-500/50' :
                    'bg-orange-900/50 text-orange-400 border border-orange-500/50'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className={`text-lg font-medium mb-4 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                  {project.subtitle}
                </p>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    View Project
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-all duration-300"
                  >
                    <Github size={16} />
                    Code
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;