export interface IComment {
  id: number;
  content: string;
  created_at: string;
}

export interface IBaseBlog {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface IBlog extends IBaseBlog {
  comments: IComment[];
}

export interface IMiniBlog extends IBaseBlog {
  comments: number;
}
