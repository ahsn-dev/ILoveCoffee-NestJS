import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Amir',
      brand: 'Buddy Brew',
      flavors: ['vanilla', 'chocolate'],
    },
    {
      id: 2,
      name: 'Ali',
      brand: 'Starbucks',
      flavors: ['vanilla', 'chocolate', 'caramel'],
    },
  ];

  findAll(): Coffee[] {
    return this.coffees;
  }

  findOne(id: string): Coffee {
    const coffee = this.coffees.find((coffee) => coffee.id === parseInt(id));
    if (!coffee) {
      //   throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`); // This is a new feature in NestJS 8 instead of the code above.
    }
    return coffee;
  }

  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto);
  }

  update(id: string, updateCoffeeDto: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      existingCoffee.name = updateCoffeeDto.name;
      existingCoffee.brand = updateCoffeeDto.brand;
      existingCoffee.flavors = updateCoffeeDto.flavors;
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex(
      (coffee) => coffee.id === parseInt(id),
    );
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
