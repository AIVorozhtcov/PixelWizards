import Button from '../atoms/Button';
import { Dispatch, SetStateAction } from 'react';
import { ProfileModeType } from '../../types';

type ProfileButtonType = {
  text: string;
  mode: ProfileModeType;
};

type ProfileListProps = {
  buttons: ProfileButtonType[];
  setMode: Dispatch<SetStateAction<string>>;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileButtonsList = ({ buttons, setMode }: ProfileListProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {buttons.map((button, idx) => (
        <Button variant="yellow" key={idx} onClick={() => setMode(button.mode)}>
          {button.text}
        </Button>
      ))}
    </div>
  );
};

export default ProfileButtonsList;
