import DescriptionSection from '../components/organisms/DescriptionSection';
import GameplaySection from '../components/organisms/GameplaySection';
import HeroSection from '../components/organisms/HeroSection';
import JoinForumSection from '../components/organisms/JoinForumSection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh bg-[#0c1b2a]">
      <HeroSection />
      <DescriptionSection />
      <GameplaySection />
      <JoinForumSection />
    </main>
  );
}
