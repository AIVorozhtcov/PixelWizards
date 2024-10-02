import Section from '../../templates/Section';
import CharacterBlock from '../molecules/CharacterBlock';
import IntroductionBlock from '../molecules/IntroductionBlock';

export default function DescriptionSection() {
  return (
    <Section>
      <IntroductionBlock
        title="Знакомство с персонажами"
        subtitle="Капибары и змеи"
        text="Познакомьтесь с разнообразным составом персонажей во вселенной Capybara Crusaders вселенной, каждый из которых обладает уникальными способностями и предысторией."
      />
      <CharacterBlock />
    </Section>
  );
}
