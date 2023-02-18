import Container from '@/components/Container';
import { IPost } from '@/models/blog';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { randomBlogId } from '@/utils/blog-id';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mdiArrowLeft } from '@mdi/js';
import { Icon } from '@mdi/react';

interface IEditBlogPageProps {
  data: IPost;
}

const EditBlogPage: NextPage<IEditBlogPageProps> = ({ data }) => {
  const [title, setTitle] = useState<string>(data.title);
  const [content, setContent] = useState<string>(data.content);

  const router = useRouter();

  const handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle((e.target as HTMLInputElement).value);
  };

  const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setContent((e.target as HTMLTextAreaElement).value);
  };

  const handleSubmit = () => {
    // submit code here
  };

  return (
    <>
      <Container className={`flex flex-col pt-[16px] pb-[32px]`}>
        <Link
          href={`/blog/${router.query.id}`}
          className={`mb-[16px] flex w-fit cursor-pointer items-center rounded-md px-[8px] py-[4px] hover:bg-white`}
        >
          <Icon path={mdiArrowLeft} size={0.8} className={`mr-[8px]`} />
          <div>Back</div>
        </Link>

        <input
          type="text"
          placeholder="Title"
          className={`h-[36px] w-full rounded-md border border-gray-100 bg-white/60 p-[8px] outline-none`}
          onInput={handleTitleChange}
          value={title}
        />

        <textarea
          className={`scrollbar mt-[16px] !h-[500px] w-full resize-none rounded-md border border-gray-100 bg-white/60 p-[8px] outline-none`}
          placeholder="Content"
          onInput={handleContentChange}
          value={content}
        ></textarea>

        <button
          className={`mx-auto mt-[16px] w-fit rounded-md bg-green-500 px-[16px] py-[8px] text-white`}
        >
          Save Changes
        </button>
      </Container>
    </>
  );
};

export default EditBlogPage;

export const getServerSideProps: GetServerSideProps<
  IEditBlogPageProps
> = async (context) => {
  const blog = randomBlogId(parseInt(context.query.id as string));

  return {
    props: {
      data: blog,
    },
  };
};
