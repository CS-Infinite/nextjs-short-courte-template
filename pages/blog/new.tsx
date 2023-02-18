import Container from '@/components/Container';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { mdiArrowLeft } from '@mdi/js';
import { Icon } from '@mdi/react';
import { NextPage } from 'next';

const NewBlogPage: NextPage = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

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
          href={`/`}
          className={`mb-[16px] flex w-fit cursor-pointer items-center rounded-md px-[8px] py-[4px] hover:bg-white`}
        >
          <Icon path={mdiArrowLeft} size={0.8} className={`mr-[8px]`} />
          <div>Back</div>
        </Link>

        <div className={`mb-[16px] text-center text-[24px] font-bold`}>
          New Blog
        </div>

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

export default NewBlogPage;
