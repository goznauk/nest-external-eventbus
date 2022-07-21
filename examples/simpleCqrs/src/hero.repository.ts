import { Injectable } from '@nestjs/common';
import { Hero } from './hero.model';

export const userHero = new Hero('1234');



@Injectable()
export class HeroRepository {
  async findOneById(id: number): Promise<Hero> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return userHero;
  }

  async findAll(): Promise<Hero[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [userHero];
  }
}
