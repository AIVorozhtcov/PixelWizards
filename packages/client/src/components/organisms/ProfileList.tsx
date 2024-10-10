import { ProfileDataType, ProfileFormData, UserData } from '../../types';
import ProfileListItem from '../molecules/ProfileListItem';

type ProfileListProps = {
  profileData: ProfileDataType[];
  userInfo: UserData | null;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileList = ({ profileData, userInfo }: ProfileListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {profileData.map((item, idx) => (
        <ProfileListItem
          label={item.label}
          data={userInfo && userInfo[item.name as keyof ProfileFormData]}
          key={idx}
        />
      ))}
    </div>
  );
};

export default ProfileList;
