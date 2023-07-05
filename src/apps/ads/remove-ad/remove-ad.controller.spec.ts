import { Test, TestingModule } from '@nestjs/testing';
import { RemoveAdController } from './remove-ad.controller';

describe('RemoveAdController', () => {
  let controller: RemoveAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveAdController],
    }).compile();

    controller = module.get<RemoveAdController>(RemoveAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
