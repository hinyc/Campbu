import { atom } from 'recoil';

export const isLogin = atom({
  key: 'isLogin',
  default: false,
});

export const posts = atom({
  key: 'posts',

  default: [],
});

//? 로그인모달 보여주기용 어떤페이지에서든 로그인버튼 누르면 나오게하기위함
export const showLoginModal = atom({
  key: 'showLoginModal',
  default: false,
});

//? 회원갑입 모달 보여주기용 어떤페이지에서든 로그인버튼 누르면 나오게하기위함
export const showSignupModal = atom({
  key: 'showSignupModal',
  default: false,
});

//? 회원갑입 모달 보여주기용 어떤페이지에서든 로그인버튼 누르면 나오게하기위함
export const showReviewModal = atom({
  key: 'showReviewModal',
  default: false,
});

  default: [
    {
      id: 1,
      category: 'Tent',
      deposit: 30000,
      rental_fee: 25000,
      unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
      title: '3~4인용 텐트 빌려드려요',
      content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
      longitude: 126.99597295767953,
      latitude: 35.97664845766847,
      address: '서울특별시 동작구 신대방동',
      img_urls:
        'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
      users_id: 1,
      reservation_dates: ['2021-12-29', '2021-12-30', '2021-12-31'],
      created_at: '2021-12-16T09:42:40.000Z',
      updated_at: '2021-12-16T09:42:40.000Z',
    },
    {
      id: 2,
      category: 'Tent',
      deposit: 50000,
      rental_fee: 15000,
      unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
      title: '1~2인용 텐트 빌려드려요',
      content: '쉽게 설치할 수 있는 1~2인용 텐트입니다.',
      longitude: 126.99597295767953,
      latitude: 35.97664845766847,
      address: '서울특별시 용산구 이촌동',
      img_urls:
        'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
      users_id: 2,
      reservation_dates: ['2022-01-01', '2021-01-02', '2022-01-03'],
      created_at: '2021-12-16T09:42:40.000Z',
      updated_at: '2021-12-16T09:42:40.000Z',
    },
  ],
});

export interface Posts {
  id: number;
  category: string;
  deposit: number;
  rental_fee: number;
  unavailable_dates: string[];
  title: string;
  content: string;
  longitude: number;
  latitude: number;
  address: string;
  img_urls: string;
  users_id: number;
  reservation_dates: string[];
  created_at: string;
  updated_at: string;
}

