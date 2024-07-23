import ProfileListItem from '../molecules/ProfileListItem';
import { ProfileDataType } from '../../types/types';

type ProfileListProps = {
  profileData: ProfileDataType[];
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileList = (props: ProfileListProps) => {
  const { profileData } = props;

  return (
    <div>
      {profileData.map((item, idx) => (
        <ProfileListItem
          title={item.title}
          data="Данные пользователя"
          key={idx}
        />
      ))}
    </div>
  );
};

export default ProfileList;
