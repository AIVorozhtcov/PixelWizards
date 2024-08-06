import { Game } from '../Game';
import { CardInHand, ParticlesType } from '../Character/types';

export default class Particles {
  game: Game;
  particles: ParticlesType[] = [];

  constructor(game: Game) {
    this.game = game;
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
