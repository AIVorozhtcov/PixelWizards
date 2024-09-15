import ProfileModeManager from '../components/organisms/ProfileModeManager';
import ProfileSection from '../components/organisms/ProfileSection';

export default function Profile() {
  return (
    <main className="relative w-full min-h-[calc(100vh-3.5rem)] p-4 pt-10 dark:bg-[#152f48] bg-white py-5">
      <ProfileSection>
        <div className="w-full flex flex-col gap-10">
          <ProfileModeManager />
        </div>
      </ProfileSection>
    </main>
  );
}
