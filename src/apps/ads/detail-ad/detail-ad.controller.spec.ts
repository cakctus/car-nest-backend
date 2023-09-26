import { Test, TestingModule } from '@nestjs/testing';
import { DetailAdController } from './detail-ad.controller';

describe('DetailAdController', () => {
  let controller: DetailAdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailAdController],
    }).compile();

    controller = module.get<DetailAdController>(DetailAdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
