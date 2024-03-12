import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor.entity';

// class MockCoffeeService {} // *

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  // providers: [{ provide: CoffeesService, useValue: new MockCoffeeService() }], // *
  providers: [
    CoffeesService,
    {
      provide: 'COFFEE_BRANDS',
      useValue: ['Starbucks', 'Nespresso', 'Lavazza'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
