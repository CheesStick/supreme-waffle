import { Test, TestingModule } from '@nestjs/testing';
import { Blog } from './blog';

describe('Blog', () => {
  let provider: Blog;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Blog],
    }).compile();

    provider = module.get<Blog>(Blog);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
