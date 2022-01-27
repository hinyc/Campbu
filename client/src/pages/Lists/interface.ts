//? borrow, lend list
export interface List {
  reservation_id: number;
  reservation_reservation_dates: string[];
  reservation_reservation_status: number;
  reservation_created_at?: string;
  reservation_updated_at?: string;
  reservation_users_id: number;
  reservation_posts_id: number;
  posts_id: number;
  posts_category: string;
  posts_deposit: number;
  posts_rental_fee: number;
  posts_unavailable_dates: string[];
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
export interface LikePost {
  id: number;
  category: string;
  deposit: number;
  rental_fee: number;
  unavailable_dates: string[];
  title: string;
  content: string;
  longitude: string;
  latitude: string;
  address: string;
  img_urls: string[];
  created_at?: string;
  updated_at?: string;
  likes_count: number;
}

export interface MyPost {
  id: number;
  category: string;
  deposit: number;
  rental_fee: number;
  unavailable_dates: string[];
  title: string;
  content: string;
  longitude: string;
  latitude: string;
  address: string;
  img_urls: string[];
  created_at?: string;
  updated_at?: string;
}
