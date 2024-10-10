import LINKS from '../../constants/links';
import Section from '../../templates/Section';
import Link from '../atoms/Link';
import IntroductionBlock from '../molecules/IntroductionBlock';

export default function JoinForumSection() {
  return (
    <Section>
      <div className="flex items-center justify-center gap-4 mb-10">
        <IntroductionBlock
          className="text-start"
          subtitle="Присоединяйтесь к космической битве"
          text="Capibaras vs Sneaks уже доступна на всех основных платформах. Загрузите и играйте сегодня, чтобы испытать на себе, что такое настоящая космическая битва."
        />
        <Link to={LINKS.forum} variant="acent">
          Присоединиться к форуму
        </Link>
      </div>
    </Section>
  );
}
