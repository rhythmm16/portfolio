'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

// Define shape type
type Shape = {
  id: number;
  type: string;
  size: number;
  initialX: string;
  initialY: string;
  color: string;
};

// Define particle type
type Particle = {
  id: number;
  symbol: string;
  size: number;
  left: string;
  delay: number;
  duration: number;
};

// Flying shapes component
const FloatingShapes = () => {
  const shapes: Shape[] = [
    { id: 1, type: 'circle', size: 50, initialX: '10%', initialY: '20%', color: 'rgba(139, 92, 246, 0.3)' },
    { id: 2, type: 'square', size: 30, initialX: '70%', initialY: '15%', color: 'rgba(34, 211, 238, 0.3)' },
    { id: 3, type: 'triangle', size: 40, initialX: '25%', initialY: '75%', color: 'rgba(139, 92, 246, 0.2)' },
    { id: 4, type: 'circle', size: 25, initialX: '80%', initialY: '60%', color: 'rgba(34, 211, 238, 0.2)' },
    { id: 5, type: 'square', size: 35, initialX: '40%', initialY: '30%', color: 'rgba(255, 255, 255, 0.1)' },
    { id: 6, type: 'circle', size: 15, initialX: '15%', initialY: '65%', color: 'rgba(255, 255, 255, 0.2)' },
    { id: 7, type: 'triangle', size: 20, initialX: '85%', initialY: '35%', color: 'rgba(139, 92, 246, 0.15)' },
    { id: 8, type: 'square', size: 10, initialX: '60%', initialY: '80%', color: 'rgba(34, 211, 238, 0.15)' }
  ];

  const renderShape = (type: string, size: number, color: string) => {
    switch(type) {
      case 'circle':
        return <div style={{ width: size, height: size, borderRadius: '50%', background: color }} />;
      case 'square':
        return <div style={{ width: size, height: size, background: color }} />;
      case 'triangle':
        return (
          <div style={{ 
            width: 0, 
            height: 0, 
            borderLeft: `${size/2}px solid transparent`, 
            borderRight: `${size/2}px solid transparent`, 
            borderBottom: `${size}px solid ${color}` 
          }} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {shapes.map((shape) => {
        // Generate random values for animation
        const moveX = Math.random() * 40 - 20; // -20 to 20
        const moveY = Math.random() * 40 - 20; // -20 to 20
        const rotation = Math.random() * 360;
        const duration = 15 + Math.random() * 30; // 15-45 seconds

        return (
          <motion.div
            key={shape.id}
            className="absolute z-0 pointer-events-none blur-sm"
            style={{
              left: shape.initialX,
              top: shape.initialY,
            }}
            animate={{
              x: [0, moveX, 0, -moveX, 0],
              y: [0, moveY, 0, -moveY, 0],
              rotate: [0, rotation, 0, -rotation, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {renderShape(shape.type, shape.size, shape.color)}
          </motion.div>
        );
      })}
    </>
  );
};

// Code particles component
const CodeParticles = () => {
  const codeSymbols = ['{', '}', '()', '[]', '=>', '&&', '||', '++', '--', '==', '!=', '<>', '/*', '*/', '//'];
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
      size: Math.random() * 14 + 10,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 10
    }));
    
    setParticles(newParticles);
  }, []);
  
  return (
    <>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute z-0 text-purple-400/20 font-mono font-bold pointer-events-none"
          style={{
            left: particle.left,
            top: '-5%',
            fontSize: particle.size
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            y: ['0vh', '100vh']
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </>
  );
};

const AnimatedSphere = () => {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#8B5CF6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
      />
    </Sphere>
  );
};

const HeroSection = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Animated shapes */}
      <FloatingShapes />
      
      {/* Code particles */}
      <CodeParticles />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center z-10 relative"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Rhythm Jain
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Building Future-Ready Tech with AI, Code, and Creativity
          </p>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          3rd-year Computer Science student at Chitkara University, passionate about AI, 
          full-stack development, and smart city innovations.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Download size={20} />
            View Resume
          </motion.button>
          <motion.a
            href="https://github.com/rhythmm16"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-gray-600 rounded-full text-white font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <Github size={20} />
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/rhythm-jain-2b4273290"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-gray-600 rounded-full text-white font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <Linkedin size={20} />
            LinkedIn
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-gray-600 rounded-full text-white font-semibold hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <Mail size={20} />
            Contact
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="animate-bounce"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;