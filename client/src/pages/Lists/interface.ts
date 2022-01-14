//? borrow, lend list
export interface List {
  reservation_id: number;
  reservation_reservation_dates: string;
  reservation_reservation_status: number;
  reservation_created_at?: string;
  reservation_updated_at?: string;
  reservation_users_id: number;
  reservation_posts_id: number;
  posts_id: number;
  posts_category: string;
  posts_deposit: number;
  posts_rental_fee: number;
  posts_unavailable_dates: string;
  posts_title: string;
  posts_content: string;
  posts_longitude: string;
  posts_latitude: string;
  posts_address: string;
  posts_img_urls: string;
  posts_created_at?: string;
  posts_updated_at?: string;
  posts_users_id: number;
}

//? atom LikeList, ResistsList에서 반복되는 interface
export interface UserPost {
  post_id: number;
  post_category: string;
  post_deposit: number;
  post_rental_fee: number;
  post_unavailable_dates: string;
  post_title: string;
  post_content: string;
  post_longitude: string;
  post_latitude: string;
  post_address: string;
  post_img_urls: string;
  posts_created_at?: string;
  posts_updated_at?: string;
  post_users_id: number;
}
