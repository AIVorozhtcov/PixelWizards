import LINKS from '../../constants/links';
import Section from '../../templates/Section';
import Link from '../atoms/Link';
import IntroductionBlock from '../molecules/IntroductionBlock';

export default function JoinForumSection() {
  return (
    <Section>
      <div className="flex items-center justify-center gap-4">
        <IntroductionBlock
          className="text-start"
          subtitle="Join the Cosmic Battle"
          text="Capibaras vs Sneaks is available now on all major platforms.
							Download and play today to experience the ultimate space battle."
        />
        <Link to={LINKS.forum} variant="acent">
          Join forum
        </Link>
      </div>
    </Section>
  );
}
