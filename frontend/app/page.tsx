import InfiniteGallery from "@/components/ui/3d-gallery-photography";

const sampleImages = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    alt: "UI/UX design mockups and wireframes",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
    alt: "Designer workspace with Figma and Sketch",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=80",
    alt: "Mobile app interface design",
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80",
    alt: "User experience research and personas",
  },
  {
    src: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1600&q=80",
    alt: "Responsive web design layouts",
  },
  {
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1600&q=80",
    alt: "Design system and component library",
  },
  {
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
    alt: "User journey mapping and flows",
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80",
    alt: "Brand identity and visual design",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <InfiniteGallery
        images={sampleImages}
        speed={0.8}
        zSpacing={4}
        visibleCount={8}
        falloff={{ near: 1.2, far: 12 }}
        className="h-screen w-full overflow-hidden rounded-none"
      />

      <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center text-center mix-blend-exclusion px-3">
        <h1 className="text-4xl font-semibold tracking-tight md:text-7xl mb-4">
          <span className="italic">Piyusha</span>
        </h1>
        <p className="text-lg md:text-xl font-light tracking-wide mb-8 opacity-90">
          UI/UX Designer
        </p>
        <div className="pointer-events-auto">
          <a
            href="/portfolio"
            className="inline-flex items-center px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            View Portfolio
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-10 left-0 right-0 text-center font-mono text-[11px] font-semibold uppercase">
        <p>Use mouse wheel, arrow keys, or touch to navigate</p>
        <p className="opacity-60">Auto-play resumes after 3 seconds of inactivity</p>
      </div>
    </main>
  );
}