import Span from '../atoms/Span';

type ProfileListItemProps = {
  label: string;
  data: string | null;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileListItem = ({ label, data }: ProfileListItemProps) => {
  return (
    <div className="flex flex-row justify-between border-2 rounded-md border-[#2c435c] py-1 px-2">
      <Span className="text-white">{label}</Span>
      <Span className="text-[#ffc107]">{data}</Span>
    </div>
  );
};

export default ProfileListItem;
