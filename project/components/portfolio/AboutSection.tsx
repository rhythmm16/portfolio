'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Brain, Rocket } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
    <section id="about" ref={ref} className="py-20 px-4">
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
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <div className="prose prose-lg text-gray-300">
              <p className="text-lg leading-relaxed">
                Hi! I'm <span className="text-purple-400 font-semibold">Rhythm</span>, a passionate Computer Science engineering student at 
                <span className="text-cyan-400 font-semibold"> Chitkara University</span> (5th Sem), working at the intersection of 
                <span className="text-purple-400 font-semibold"> AI, full-stack development, and impactful</span> technology.
              </p>
              <p className="text-lg leading-relaxed">
                I specialize in building scalable, intelligent applications using React.js, Node.js, Express, MongoDB, and leveraging machine learning to deliver data-driven features and personalized experiences.

From creating a women’s health platform to developing an AI-based travel assistant, I enjoy tackling real-world problems with a user-focused mindset and a strong technical foundation.

I’m also deeply interested in roles that bridge tech with decision-making—such as Data Engineering, Product Analytics, and Business Analysis—where I can use data, logic, and empathy to drive better outcomes.
              </p>
              <p className="text-lg leading-relaxed">
                Currently, I'm expanding my skillset in areas like <span className="text-cyan-400 font-semibold">data pipelines, cloud infrastructure, and user research,</span> 
                and actively contributing to projects that blend backend systems with real-world usability.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid gap-6"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <Code className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Full-Stack Developer</h3>
              <p className="text-gray-300">Building end-to-end solutions with modern technologies and best practices.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-cyan-900/50 to-purple-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20"
            >
              <Brain className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Enthusiast</h3>
              <p className="text-gray-300">Leveraging artificial intelligence to create smarter, more intuitive applications.</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
            >
              <Rocket className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Innovation Driver</h3>
              <p className="text-gray-300">Passionate about emerging technologies and their potential to solve real-world problems.</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;