import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAdService } from './update-ad.service';

describe('UpdateAdService', () => {
  let service: UpdateAdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAdService],
    }).compile();

    service = module.get<UpdateAdService>(UpdateAdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
