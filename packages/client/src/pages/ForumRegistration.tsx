import MainSection from '../components/atoms/MainSection';
import ThemeButton from '../components/molecules/ThemeButton';
import ForumRegistrationSection from '../components/organisms/ForumRegistrationSection';

export default function ForumRegistration() {
  return (
    <MainSection className="items-center justify-center relative">
      <ForumRegistrationSection />
      <ThemeButton className="absolute top-2 right-5" />
    </MainSection>
  );
}
