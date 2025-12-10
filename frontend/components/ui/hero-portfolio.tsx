"use client";

import { motion } from "framer-motion";

export default function HeroPortfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center relative overflow-x-hidden">
          <div className="md:order-2 relative">
            {/* Decorative background elements */}
            <div className="absolute -z-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 blur-3xl opacity-30 -top-16 -left-16"></div>
            <div className="absolute -z-10 w-60 h-60 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 blur-3xl opacity-20 -bottom-10 -right-10"></div>
            
            <div className="relative">
              <img
                src="/piyusha-portrait.jpg"
                alt="Piyusha Bhalerao - UI/UX Designer"
                className="rounded-3xl shadow-2xl w-full object-cover filter brightness-105 aspect-[4/5] border border-gray-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-portrait.svg";
                }}
              />
              
              {/* Floating design elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg"></div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-3 shadow-lg border border-gray-100"
                initial={{ y: 0 }}
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
              </motion.div>
            </div>
          </div>
          
          <div className="md:order-1 flex flex-col justify-center space-y-8">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                  Piyusha
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Bhalerao
                  </span>
                </h1>
              </motion.div>
              
              <motion.p
                className="text-xl md:text-2xl text-gray-600 mt-4 font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                UI/UX Designer
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ul className="space-y-3 text-lg text-gray-700">
                {[
                  "User Experience Design",
                  "Interface Design",
                  "Design Systems",
                  "User Research",
                  "Prototyping & Testing",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0.7, x: -10 }}
                    whileHover={{
                      opacity: 1,
                      x: 5,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut",
                      },
                    }}
                    animate={{ opacity: 0.9, x: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.4,
                    }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="cursor-pointer hover:text-gray-900 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Creating Digital Experiences
                </h2>
                <p className="text-gray-600 leading-relaxed max-w-lg">
                  Passionate about crafting intuitive digital experiences that bridge 
                  the gap between user needs and business goals. I specialize in 
                  user-centered design, creating interfaces that are both beautiful 
                  and functional.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/portfolio"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Portfolio
                </motion.a>
                
                <motion.a
                  href="mailto:hello@piyushabhalerao.design"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:border-gray-400 hover:text-gray-900 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}