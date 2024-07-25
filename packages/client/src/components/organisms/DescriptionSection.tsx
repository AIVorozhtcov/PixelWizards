import Section from '../../templates/Section';
import CharacterBlock from '../molecules/CharacterBlock';
import IntroductionBlock from '../molecules/IntroductionBlock';

export default function DescriptionSection() {
  return (
    <Section>
      <IntroductionBlock
        title="Meet the Characters"
        subtitle="Capybaras and Snakes"
        text="Explore the diverse cast of characters in the Capybara Crusaders
          universe, each with their own unique abilities and backstories."
      />
      <CharacterBlock />
    </Section>
  );
}
