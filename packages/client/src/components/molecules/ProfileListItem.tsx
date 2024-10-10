import Span from '../atoms/Span';

type ProfileListItemProps = {
  label: string;
  data: string | null;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileListItem = ({ label, data }: ProfileListItemProps) => {
  return (
    <div className="flex flex-row justify-between border-2 rounded-md dark:border-[#2c435c] border-slate-100 py-1 px-2">
      <Span className="dark:text-white text-red-700">{label}</Span>
      <Span className="dark:text-[#ffc107] text-[#0c1b2a]">{data}</Span>
    </div>
  );
};

export default ProfileListItem;
