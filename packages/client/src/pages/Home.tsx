import DescriptionSection from '../components/organisms/DescriptionSection';
import GameplaySection from '../components/organisms/GameplaySection';
import Header from '../components/organisms/Header';
import HeroSection from '../components/organisms/HeroSection';
import JoinForumSection from '../components/organisms/JoinForumSection';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-[#0c1b2a]">
      <Header />
      <HeroSection />
      <DescriptionSection />
      <GameplaySection />
      <JoinForumSection />
    </div>
  );
}
