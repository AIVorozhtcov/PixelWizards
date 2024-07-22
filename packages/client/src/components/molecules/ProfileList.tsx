import Span from '../atoms/Span';

type ProfileDataType = {
  title: string;
  name: string;
  type: string;
};

type ProfileListProps = {
  profileData: ProfileDataType[];
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileList = (props: ProfileListProps) => {
  const { profileData } = props;

  return (
    <div>
      {profileData.map((item, idx) => (
        <div
          className="flex flex-row justify-between border-b pt-1 pb-1"
          key={idx}>
          <Span className="">{item.title}</Span>
          <Span className="">Данные пользователя</Span>
        </div>
      ))}
    </div>
  );
};

export default ProfileList;
