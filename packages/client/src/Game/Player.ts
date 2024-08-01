import { Game } from '.';
import { CardInHand, fixCardsInHand } from './fixCardsInHand';

export class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  cardInHand = fixCardsInHand;
  draggingCard: CardInHand | null = null;
  startX = 0;
  startY = 0;
  initialX = 0;
  initialY = 0;
  hitPoints = 100;
  tempResist = 0; //Временный резист - сюда прокидываю блок
  resist = 0; // Постоянный резист - сюда можно будет кидать бафы от шмоток и тд
  particles: any[] = []; // Часты карточки, когда она разыгрывается

  constructor(game: Game) {
    this.game = game;
    this.width = 120;
    this.height = 190;

    this.x = 20;
    this.y = 100;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'purple';
    context.fillRect(this.x, this.y, this.width, this.height);

    context.fillStyle = 'yellow';
    context.fillRect(this.x, this.y * 3, this.width, 20);

    context.fillStyle = 'black';
    context.font = '18px Arial';

    context.fillText(String(this.hitPoints), this.x, this.y * 3 + 15);
  }

  addCardInHand(card: CardInHand) {
    this.cardInHand.push(card);
  }

  refreshCardsInHand() {
    this.cardInHand = Array.from(
      new Set(this.cardInHand.concat(fixCardsInHand))
    );
  }

  displayAwailableCards(context: CanvasRenderingContext2D) {
    this.cardInHand.forEach(cardInHand => {
      context.fillStyle = 'green';
      context.fillRect(
        cardInHand.x,
        cardInHand.y,
        cardInHand.width,
        cardInHand.height
      );

      const fontSize = 18;
      const paddingY = 10;

      context.fillStyle = 'white';
      context.font = `${fontSize}px Arial`;

      const textWidth = context.measureText(cardInHand.name).width;
      const textX = cardInHand.x + (cardInHand.width - textWidth) / 2;
      const textY = cardInHand.y + paddingY + fontSize;

      context.fillText(cardInHand.name, textX, textY);
    });

    this.drawParticles(context);
  }

  onMouseDown(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    const { offsetX, offsetY } = event.nativeEvent;

    this.cardInHand.forEach(card => {
      if (
        offsetX >= card.x &&
        offsetX <= card.x + card.width &&
        offsetY >= card.y &&
        offsetY <= card.y + card.height
      ) {
        this.draggingCard = card;
        this.startX = offsetX - card.x;
        this.startY = offsetY - card.y;
        this.initialX = card.x;
        this.initialY = card.y;
      }
    });
  }

  onMouseMove(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    if (this.draggingCard) {
      const { offsetX, offsetY } = event.nativeEvent;
      this.draggingCard.x = offsetX - this.startX;
      this.draggingCard.y = offsetY - this.startY;
      this.game.draw(this.game.context);
    }
  }

  onMouseUp() {
    if (this.draggingCard) {
      this.createParticles(
        this.draggingCard,
        this.draggingCard.x,
        this.draggingCard.y
      );

      this.draggingCard.x = this.initialX;
      this.draggingCard.y = this.initialY;

      const actionType = this.draggingCard.action.type;
      if (actionType === 'attack') {
        this.game.dealDamage('enemy', this.draggingCard.action.points);
      }

      if (actionType === 'block') {
        this.tempResist += this.draggingCard.action.points;
      }

      this.animateParticles();
      this.cardInHand = this.cardInHand.filter(
        card => card !== this.draggingCard
      );
      this.draggingCard = null;
      this.game.draw(this.game.context);
    }
  }

  getDamage(damage: number) {
    this.hitPoints -= damage;
  }

  getHeal(heal: number) {
    this.hitPoints += heal;
  }

  drawParticles(context: CanvasRenderingContext2D) {
    this.particles.forEach(particle => {
      context.fillStyle = `rgba(0, 255, 0, ${particle.alpha})`;
      context.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
  }

  createParticles(card: CardInHand, x: number, y: number) {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: x + Math.random() * card.width,
        y: y + Math.random() * card.height,
        size: Math.random() * 4 + 1,
        alpha: 1,
        velocityX: (Math.random() - 0.5) * 2,
        velocityY: (Math.random() - 0.5) * 2,
      });
    }
  }

  animateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.alpha -= 0.02;
    });
    this.particles = this.particles.filter(particle => particle.alpha > 0);
    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animateParticles());
      this.game.draw(this.game.context);
    }
  }
}
