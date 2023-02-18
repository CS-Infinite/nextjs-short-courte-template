import { IMiniPost, IPost } from '@/models/blog';
import { faker } from '@faker-js/faker';

export function randomBlogs() {
  const randomBlogs: IMiniPost[] = [];

  for (let i = 0; i < 50; i++) {
    const createdAt = faker.date
      .between('2000-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z')
      .toISOString();
    randomBlogs.push({
      id: i,
      title: faker.lorem.text(),
      content: faker.lorem.paragraphs(3),
      created_at: createdAt,
      updated_at: createdAt,
      commentCount: faker.datatype.number({ min: 0, max: 100 }),
    });
  }

  return randomBlogs;
}
