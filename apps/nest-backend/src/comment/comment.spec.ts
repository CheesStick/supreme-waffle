import { Test, TestingModule } from '@nestjs/testing';
import { Comment } from './comment';

describe('Comment', () => {
  let provider: Comment;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Comment],
    }).compile();

    provider = module.get<Comment>(Comment);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
