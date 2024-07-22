import Button from '../atoms/Button';
import { Dispatch, SetStateAction } from 'react';
import { ProfileModeType } from '../organisms/ProfileContainer';

type ProfileButtonType = {
  text: string;
  mode: ProfileModeType;
};

type ProfileListProps = {
  buttons: ProfileButtonType[];
  setMode: Dispatch<SetStateAction<string>>;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileButtonsList = (props: ProfileListProps) => {
  const { buttons, setMode } = props;

  return (
    <div className="w-full flex flex-col gap-2">
      {buttons.map((button, idx) => (
        <Button
          className="block hover:cursor-pointer hover:bg-gray-300 bg-gray-200 rounded-md p-1"
          key={idx}
          onClick={() => setMode(button.mode)}>
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default ProfileButtonsList;
