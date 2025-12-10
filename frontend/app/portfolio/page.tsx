export default function Portfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-semibold italic">
            Piyusha
          </a>
          <div className="flex items-center space-x-8">
            <a href="#work" className="hover:text-gray-300 transition-colors">Work</a>
            <a href="#about" className="hover:text-gray-300 transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            UI/UX
            <br />
            <span className="italic text-gray-400">Designer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
            Crafting intuitive digital experiences that bridge the gap between user needs and business goals through thoughtful design.
          </p>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Project placeholders with UI/UX focus */}
            {[
              { title: "E-commerce Mobile App", type: "Mobile Design", description: "Complete redesign of shopping experience with focus on conversion optimization" },
              { title: "SaaS Dashboard", type: "Web Application", description: "Data visualization platform with complex user workflows and accessibility features" },
              { title: "Banking App Redesign", type: "Fintech UX", description: "Streamlined user experience for digital banking with enhanced security flows" },
              { title: "Design System", type: "Component Library", description: "Comprehensive design system for enterprise product suite with 50+ components" },
              { title: "Healthcare Portal", type: "Healthcare UX", description: "Patient-centered design for telemedicine platform improving appointment booking by 40%" },
              { title: "Travel Booking Platform", type: "Web & Mobile", description: "End-to-end booking experience with personalized recommendations and seamless payments" }
            ].map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 rounded-2xl flex items-center justify-center">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-xs uppercase tracking-wider text-gray-400">{project.type}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                    Case Study
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-gray-400 uppercase tracking-wider">{project.type}</span>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">About Piyusha</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            A passionate UI/UX designer with 5+ years of experience creating user-centered digital solutions. 
            I specialize in transforming complex problems into intuitive, accessible, and delightful experiences 
            that drive business results and user satisfaction.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">5+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-sm text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-sm text-gray-400">Design Awards</div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'User Research', 'Wireframing', 'Prototyping', 'Figma', 'Sketch', 
              'Adobe XD', 'Design Systems', 'Usability Testing', 'Information Architecture', 
              'Interaction Design', 'Accessibility', 'Responsive Design'
            ].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Let's Create Together</h2>
          <p className="text-xl text-gray-300 mb-12">
            Looking for a UI/UX designer to bring your digital product vision to life? 
            Let's discuss how we can create exceptional user experiences together.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Strategy & Research</h3>
              <p className="text-gray-400 text-sm">User research, competitive analysis, and strategic planning</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Design & Prototyping</h3>
              <p className="text-gray-400 text-sm">Wireframes, high-fidelity designs, and interactive prototypes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Testing & Optimization</h3>
              <p className="text-gray-400 text-sm">Usability testing, A/B testing, and continuous improvement</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="mailto:hello@piyusha.design" 
              className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Start a Project
            </a>
            <a 
              href="/" 
              className="inline-flex items-center px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
            >
              Back to Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2024 Piyusha. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Dribbble</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Behance</a>
          </div>
        </div>
      </footer>
    </main>
  );
}