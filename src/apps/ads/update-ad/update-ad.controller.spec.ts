import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAdController } from './update-ad.controller';

describe('UpdateAdController', () => {
  let controller: UpdateAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateAdController],
    }).compile();

    controller = module.get<UpdateAdController>(UpdateAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
