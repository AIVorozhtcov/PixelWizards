import Span from '../atoms/Span';

type ProfileListItemProps = {
  title: string;
  data: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileListItem = ({ title, data }: ProfileListItemProps) => {
  return (
    <div className="flex flex-row justify-between border-2 rounded-md border-[#2f4154] py-1 px-2">
      <Span className="text-white">{title}</Span>
      <Span className="text-[#ffc107]">{data}</Span>
    </div>
  );
};

export default ProfileListItem;
