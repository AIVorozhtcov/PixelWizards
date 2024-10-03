import MainSection from '../components/atoms/MainSection';
import ThemeButton from '../components/molecules/ThemeButton';
import ForumLoginSection from '../components/organisms/ForumLoginSection';

export default function ForumLogin() {
  return (
    <MainSection className="items-center justify-center relative">
      <ForumLoginSection />
      <ThemeButton className="absolute top-2 right-5" />
    </MainSection>
  );
}
