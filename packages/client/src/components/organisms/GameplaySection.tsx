import { arrayOfGameplayText } from '../../constants/arrayOfGameplayText';
import Section from '../../templates/Section';
import InfoBox from '../molecules/InfoBox';
import IntroductionBlock from '../molecules/IntroductionBlock';

export default function GameplaySection() {
  return (
    <Section>
      <IntroductionBlock
        title="Основные характеристики"
        subtitle="Механика захватывающего игрового процесса"
        text="Capibaras vs Sneaks предлагает уникальное сочетание стремительного экшена, стратегических маневров и потрясающих способностей. Управляйте своим пилотировать космический корабль, наносить сокрушительные удары и обходить противников оппонентов на огромных космических полях сражений."
      />
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
        <img
          src="/battles.webp"
          width="550"
          height="310"
          alt="Gameplay"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
        <div className="flex flex-col justify-center space-y-4">
          <ul className="grid gap-6">
            {arrayOfGameplayText.map(item => (
              <li key={item.subtitle}>
                <InfoBox {...item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
