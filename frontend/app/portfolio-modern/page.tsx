import HeroPortfolio from "@/components/ui/hero-portfolio";

export default function PortfolioModern() {
  return (
    <main className="min-h-screen">
      {/* Modern Hero Section */}
      <HeroPortfolio />
      
      {/* Additional content can be added here */}
      <div className="py-20 px-4 text-center bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">More Content Coming Soon</h2>
        <p className="text-gray-600">This is the modern hero version of the portfolio page.</p>
        <div className="mt-8">
          <a href="/portfolio" className="text-purple-600 hover:text-purple-700 font-medium cursor-pointer">
            View Full Portfolio →
          </a>
        </div>
      </div>
    </main>
  );
}