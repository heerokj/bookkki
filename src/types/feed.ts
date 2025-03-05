export interface FeedData {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  content: string;
  image_urls: string[];
}

export interface FeedComment {
  id: string;
  created_at: string;
  post_id: string;
  comment: string;
  user_id: string;
}
