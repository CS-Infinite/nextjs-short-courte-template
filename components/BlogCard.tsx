import { FC } from 'react';
import { format } from 'date-fns';
import { IPost } from '@/models/blog';

interface IBlogCardProps {
  data: IPost;
  onTitleClick?: () => void;
  onCommentClick?: () => void;
}

const BlogCard: FC<IBlogCardProps> = ({
  data,
  onTitleClick,
  onCommentClick,
}) => {
  const comments = data.comments.length;

  return (
    <div
      className={`blog-card flex flex-col rounded-md border border-gray-300 bg-white p-[16px] shadow-sm`}
    >
      <div className={`blog-card__meta text-[12px] font-light`}>
        {format(Date.parse(data.created_at), 'dd/MM/yyyy hh:mm aa')}
      </div>

      <div
        className={`blog-card__title line-clamp-1 my-[8px] cursor-pointer text-[30px] font-bold hover:text-blue-500`}
        onClick={onTitleClick}
      >
        {data.title}
      </div>

      <div
        className={`blog-card__description line-clamp-3 text-[14px] font-light`}
      >
        {data.content}
      </div>

      <div className="blog-card__footer mt-[16px] flex gap-[8px] text-[14px]">
        <div
          className={`cursor-pointer rounded-md px-[8px] text-gray-500 hover:bg-gray-100`}
          onClick={onCommentClick}
        >
          {comments} comment{comments > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
