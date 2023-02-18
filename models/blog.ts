export interface IComment {
  id: number;
  content: string;
  created_at: string;
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  comments: IComment[];
}
