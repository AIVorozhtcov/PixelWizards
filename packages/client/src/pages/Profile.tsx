import MainSection from '../components/atoms/MainSection';
import ProfileModeManager from '../components/organisms/ProfileModeManager';
import ProfileSection from '../components/organisms/ProfileSection';

export default function Profile() {
  return (
    <MainSection>
      <ProfileSection>
        <div className="w-full flex flex-col gap-10">
          <ProfileModeManager />
        </div>
      </ProfileSection>
    </MainSection>
  );
}
