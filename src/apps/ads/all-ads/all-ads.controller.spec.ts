import { Test, TestingModule } from '@nestjs/testing';
import { AllAdsController } from './all-ads.controller';

describe('AllAdsController', () => {
  let controller: AllAdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllAdsController],
    }).compile();

    controller = module.get<AllAdsController>(AllAdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
