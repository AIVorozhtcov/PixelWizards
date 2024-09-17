import LINKS from '../../constants/links';
import Section from '../../templates/Section';
import Image from '../atoms/Image';
import Link from '../atoms/Link';
import Text from '../atoms/Text';
import Title from '../atoms/Title';

export default function HeroSection() {
  return (
    <Section>
      <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16 items-center">
        <div className="flex flex-col gap-4">
          <Title>Capybara Crusaders</Title>
          <Text variant="custom" className="mx-auto max-w-[700px] md:text-xl">
            Присоединяйтесь к эпической битве между капибарами и змеями в этом
            захватывающем sci-fi приключении!
          </Text>
          <Link to={LINKS.game} variant="acent">
            Играть
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="/heroImage.webp"
            width="550"
            height="550"
            alt="Космическая битва"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </div>
    </Section>
  );
}
