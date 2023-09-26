import { Test, TestingModule } from '@nestjs/testing';
import { DetailAdService } from './detail-ad.service';

describe('DetailAdService', () => {
  let service: DetailAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetailAdService],
    }).compile();

    service = module.get<DetailAdService>(DetailAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
