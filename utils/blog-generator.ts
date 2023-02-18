import { IPost } from '@/models/blog';
import { faker } from '@faker-js/faker';

export function getRandomBlogs() {
  const randomBlogs: IPost[] = [];

  for (let i = 0; i < 100; i++) {
    randomBlogs.push({
      id: i,
      title: faker.lorem.text(),
      content: faker.lorem.paragraphs(3),
      created_at: faker.date
        .between('2000-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z')
        .toISOString(),
      comments: [],
    });
  }

  return randomBlogs;
}
