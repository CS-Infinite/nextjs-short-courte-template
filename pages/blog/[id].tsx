import Comment from '@/components/Comment';
import Container from '@/components/Container';
import { IBlog } from '@/models/blog';
import { randomBlogId } from '@/utils/blog-id';
import Icon from '@mdi/react';
import { format } from 'date-fns';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { mdiArrowLeft, mdiPencil, mdiSend, mdiTrashCan } from '@mdi/js';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface IBlogIdProps {
  data: IBlog;
}

const BlogIdPage: NextPage<IBlogIdProps> = ({ data }) => {
  const [comment, setComment] = useState<string>('');

  const router = useRouter();

  const handleDelete = () => {
    console.log('delete');
  };

  const handleCommentInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setComment((e.target as HTMLTextAreaElement).value);
  };

  const mutation = useMutation({
    mutationFn: async (payload: string) => {
      return fetch(
        'http://178.128.211.123:8080/blogs/' + router.query.id + '/comments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: payload,
          }),
          mode: 'no-cors',
        },
      );
    },
    onSuccess: () => {
      router.reload();
    },
  });

  const handleSubmit = () => {
    if (mutation.isLoading) return;
    mutation.mutate(comment);
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
        Comments ({data.comments ? data.comments.length : 0})
      </div>
      <div className={`border-t border-gray-500`}></div>

      <div className={`mt-[16px] flex items-end gap-[8px]`}>
        <textarea
          className={`scrollbar h-[80px] w-full resize-none rounded-md border-gray-100 p-[8px] outline-none`}
          placeholder={`Your comment ...`}
          onInput={handleCommentInput}
        ></textarea>
        <div
          className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full text-white hover:bg-gray-100`}
          onClick={handleSubmit}
        >
          <Icon path={mdiSend} size={0.7} color="black" />
        </div>
      </div>

      <div className={`mt-[16px] flex flex-col gap-[16px]`}>
        {data.comments &&
          data.comments.map((item) => <Comment key={item.id} data={item} />)}
      </div>
    </Container>
  );
};

export default BlogIdPage;

export const getServerSideProps: GetServerSideProps<IBlogIdProps> = async (
  context,
) => {
  // const blog = randomBlogId(parseInt(context.query.id as string));
  const res = await fetch(
    'http://178.128.211.123:8080/blogs/' + context.query.id,
  );
  const body = await res.json();

  return {
    props: {
      data: body,
    },
  };
};
