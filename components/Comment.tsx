import { IComment } from '@/models/blog';
import { format } from 'date-fns';
import { FC } from 'react';

interface ICommentProps {
  data: IComment;
}

const Comment: FC<ICommentProps> = ({ data }) => {
  return (
    <div
      className={`flex flex-col rounded-md border border-gray-100 bg-white p-[16px]`}
    >
      <div>{data.content}</div>
      <div className={`mt-[8px] text-[12px] font-light`}>
        {format(Date.parse(data.created_at), 'dd/MM/yyyy hh:mm aa')}
      </div>
    </div>
  );
};

export default Comment;
