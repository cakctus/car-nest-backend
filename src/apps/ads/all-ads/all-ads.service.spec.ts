import { Test, TestingModule } from '@nestjs/testing';
import { AllAdsService } from './all-ads.service';

describe('AllAdsService', () => {
  let service: AllAdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllAdsService],
    }).compile();

    service = module.get<AllAdsService>(AllAdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
