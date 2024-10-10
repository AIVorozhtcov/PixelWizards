import ProfileListItem from '../molecules/ProfileListItem';
import { ProfileDataType, ProfileFormData } from '../../types/types';
import { MOCK_FORM_DEFAULT_VALUES } from '../../constants/mockProfileFormDefaultValues';

type ProfileListProps = {
  profileData: ProfileDataType[];
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileList = ({ profileData }: ProfileListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {profileData.map((item, idx) => (
        <ProfileListItem
          label={item.label}
          data={MOCK_FORM_DEFAULT_VALUES[item.name as keyof ProfileFormData]}
          key={idx}
        />
      ))}
    </div>
  );
};

export default ProfileList;
