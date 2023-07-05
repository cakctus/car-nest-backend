import { Test, TestingModule } from '@nestjs/testing';
import { RemoveAdService } from './remove-ad.service';

describe('RemoveAdService', () => {
  let service: RemoveAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoveAdService],
    }).compile();

    service = module.get<RemoveAdService>(RemoveAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
