"use client";

import { motion } from "framer-motion";

export default function HeroFashion() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 relative overflow-x-hidden">
          <div className="md:order-2 relative">
            <div className="absolute -z-10 w-72 h-72 rounded-full bg-[#f8b3c4] blur-3xl opacity-20 -top-10 -left-10"></div>
            <img
              src="/piyusha-portrait.jpg"
              alt="Piyusha Bhalerao - UI/UX Designer"
              className="rounded-2xl shadow-2xl w-full object-cover filter brightness-105 aspect-[4/5]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-portrait.svg";
              }}
            />
          </div>
          
          <div className="md:order-1 flex flex-col justify-between">
            <div className="flex flex-col h-full justify-between">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black leading-tight tracking-tighter">
                Piyusha<br />Bhalerao.
              </h1>
              
              <ul className="space-y-2 tracking-tighter text-lg text-black/90">
                {[
                  "UI/UX Design",
                  "User Research",
                  "Prototyping",
                  "Design Systems",
                  "Brand Identity",
                ].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0.8 }}
                    whileHover={{
                      opacity: 1,
                      y: -3,
                      transition: {
                        duration: 0.4,
                        ease: "easeOut",
                      },
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                  >
                    <span className="cursor-pointer hover:text-black/70 transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
              
              <div>
                <h2 className="text-2xl font-medium text-black mt-auto pt-8">
                  ABOUT ME
                </h2>
                <p className="text-lg text-black/95 max-w-md pt-4 tracking-tight">
                  I'm a passionate UI/UX designer with 5+ years of experience creating 
                  user-centered digital solutions. I specialize in transforming complex 
                  problems into intuitive, accessible, and delightful experiences that 
                  drive business results and user satisfaction. My approach combines 
                  strategic thinking with creative problem-solving to deliver designs 
                  that truly resonate with users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}