import MainSection from '../components/atoms/MainSection';
import DescriptionSection from '../components/organisms/DescriptionSection';
import GameplaySection from '../components/organisms/GameplaySection';
import HeroSection from '../components/organisms/HeroSection';
import JoinForumSection from '../components/organisms/JoinForumSection';

export default function Home() {
  return (
    <MainSection>
      <HeroSection />
      <DescriptionSection />
      <GameplaySection />
      <JoinForumSection />
    </MainSection>
  );
}
