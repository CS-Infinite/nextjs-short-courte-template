export interface IComment {
  id: number;
  content: string;
  created_at: string;
}

export interface IBasePost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface IPost extends IBasePost {
  comments: IComment[];
}

export interface IMiniPost extends IBasePost {
  commentCount: number;
}
