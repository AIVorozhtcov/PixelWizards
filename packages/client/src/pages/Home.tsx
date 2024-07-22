import Header from '../components/organisms/Header';
import HeroSection from '../components/organisms/HeroSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#0c1b2a]">
      <Header />
      <HeroSection />
    </div>
  );
}
