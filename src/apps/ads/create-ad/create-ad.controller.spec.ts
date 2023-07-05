import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdController } from './create-ad.controller';

describe('CreateAdController', () => {
  let controller: CreateAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateAdController],
    }).compile();

    controller = module.get<CreateAdController>(CreateAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
