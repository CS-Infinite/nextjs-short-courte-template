import { IComment, IPost } from '@/models/blog';
import { faker } from '@faker-js/faker';
import { add } from 'date-fns';

export function randomBlogId(id: number): IPost {
  const commentCount = faker.datatype.number({ min: 0, max: 100 });
  const comments: IComment[] = [];

  const blogCreatedAt = faker.date
    .between('2000-01-01T00:00.000Z', '2023-01-01T00:00.000Z')
    .toISOString();

  const parsedBlogCreatedAt = Date.parse(blogCreatedAt);

  for (let i = 0; i < commentCount; i++) {
    const commentLines = faker.datatype.number({ min: 1, max: 10 });

    comments.push({
      id: i,
      content: faker.lorem.lines(commentLines) + ' ' + faker.internet.emoji(),
      created_at: faker.date
        .between(blogCreatedAt, add(parsedBlogCreatedAt, { months: 3 }))
        .toISOString(),
    });
  }

  return {
    id,
    title: faker.hacker.phrase(),
    content: faker.lorem.lines(100),
    created_at: blogCreatedAt,
    updated_at: blogCreatedAt,
    comments: comments,
  };
}
