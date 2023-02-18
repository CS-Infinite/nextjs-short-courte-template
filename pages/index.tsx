import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import { IMiniPost } from '@/models/blog';
import { randomBlogs } from '@/utils/blogs-generator';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

interface IHomePageProps {
  blogs: IMiniPost[];
}

const HomePage: NextPage<IHomePageProps> = ({ blogs }) => {
  const router = useRouter();

  return (
    <Container>
      <div className={`flex flex-col gap-[8px] pt-[16px] pb-[32px]`}>
        {blogs.map((item, i) => (
          <BlogCard
            key={i}
            data={item}
            onTitleClick={() => router.push(`/blog/${i}`)}
          />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  IHomePageProps
> = async () => {
  return {
    props: {
      blogs: randomBlogs(),
    },
  };
};
