import Comment from '@/components/Comment';
import Container from '@/components/Container';
import { IPost } from '@/models/blog';
import { randomBlogId } from '@/utils/blog-id';
import Icon from '@mdi/react';
import { format } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mdiArrowLeft, mdiPencil, mdiTrashCan } from '@mdi/js';

interface IBlogIdProps {
  data: IPost;
}

const BlogIdPage: NextPage<IBlogIdProps> = ({ data }) => {
  const router = useRouter();

  const handleDelete = () => {
    // delete code here
  };

  return (
    <Container className={`flex flex-col pt-[16px] pb-[32px]`}>
      <div className={`flex gap-[8px]`}>
        <Link
          href={`/`}
          className={`mb-[16px] flex w-fit cursor-pointer items-center rounded-md px-[8px] py-[4px] hover:bg-white`}
        >
          <Icon path={mdiArrowLeft} size={0.8} className={`mr-[8px]`} />
          <div>Back</div>
        </Link>

        <div className={`ml-auto`}></div>

        <Link
          href={`/blog/edit/${router.query.id}`}
          className={`mb-[16px] flex w-fit cursor-pointer items-center rounded-md px-[8px] py-[4px] hover:bg-white`}
        >
          <Icon path={mdiPencil} size={0.8} className={`mr-[8px]`} />
          <div>Edit</div>
        </Link>

        <div
          className={`mb-[16px] flex w-fit cursor-pointer items-center rounded-md px-[8px] py-[4px] hover:bg-white`}
          onClick={handleDelete}
        >
          <Icon path={mdiTrashCan} size={0.8} className={`mr-[8px]`} />
          <div>Delete</div>
        </div>
      </div>

      <div className={`text-[30px] font-bold`}>{data.title}</div>
      <div className={`mt-[16px] text-[14px] font-light`}>
        {format(Date.parse(data.created_at), 'dd/MM/yyyy hh:mm aa')}
      </div>
      <div className={`mt-[16px]`}>{data.content}</div>

      <div id="comments" className={`mt-[32px] mb-[8px] text-[20px] font-bold`}>
        Comments ({data.comments.length})
      </div>
      <div className={`border-t border-gray-500`}></div>

      <div className={`mt-[16px] flex flex-col gap-[16px]`}>
        {data.comments.map((item) => (
          <Comment key={item.id} data={item} />
        ))}
      </div>
    </Container>
  );
};

export default BlogIdPage;

export const getServerSideProps: GetServerSideProps<IBlogIdProps> = async (
  context,
) => {
  const blog = randomBlogId(parseInt(context.query.id as string));

  return {
    props: {
      data: blog,
    },
  };
};
