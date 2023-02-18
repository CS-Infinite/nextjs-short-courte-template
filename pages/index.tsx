import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import { IPost } from '@/models/blog';
import { getRandomBlogs } from '@/utils/blog-generator';
import { GetServerSideProps, NextPage } from 'next';

interface IHomePageProps {
  blogs: IPost[];
}

const HomePage: NextPage<IHomePageProps> = ({ blogs }) => {
  return (
    <Container maxWidth={800}>
      <div className={`flex flex-col gap-[8px] pt-[16px] pb-[32px]`}>
        {blogs.map((item, i) => (
          <BlogCard key={i} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<IHomePageProps> = async (
  context,
) => {
  return {
    props: {
      blogs: getRandomBlogs(),
    },
  };
};
