import { Test, TestingModule } from '@nestjs/testing';
import { CreateAdService } from './create-ad.service';

describe('CreateAdService', () => {
  let service: CreateAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAdService],
    }).compile();

    service = module.get<CreateAdService>(CreateAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
