import BlogCard from '@/components/BlogCard';
import Container from '@/components/Container';
import { IMiniBlog } from '@/models/blog';
import { randomBlogs } from '@/utils/blogs-generator';
import { mdiArrowLeft, mdiPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IHomePageProps {
  blogs: IMiniBlog[];
}

const HomePage: NextPage<IHomePageProps> = ({ blogs }) => {
  const router = useRouter();

  return (
    <Container className={`flex flex-col pt-[16px] pb-[32px]`}>
      <Link
        href={`/blog/new`}
        className={`ml-auto mb-[16px] flex w-fit cursor-pointer items-center rounded-md px-[8px] py-[4px] hover:bg-white`}
      >
        <Icon path={mdiPlus} size={0.8} className={`mr-[8px]`} />
        <div>New</div>
      </Link>

      <div className={`flex flex-col gap-[8px]`}>
        {blogs.length > 0 &&
          blogs.map((item) => (
            <BlogCard
              key={item.id}
              data={item}
              onTitleClick={() => router.push(`/blog/${item.id}`)}
            />
          ))}

        {blogs.length === 0 && (
          <div className={`text-center`}>No blogs to show.</div>
        )}
      </div>
    </Container>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<
  IHomePageProps
> = async () => {
  const res = await fetch('http://178.128.211.123:8080/blogs');
  const body = await res.json();

  return {
    props: {
      blogs: body || [],
    },
  };
};
