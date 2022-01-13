import { decode } from 'punycode';
import { atom } from 'recoil';

export const isLogin = atom({
  key: 'isLogin',
  default: false,
});

//? 주소 검색 결과 원본
export const originalPosts = atom({
  key: 'originalPosts',
  default: {
    posts: [
      {
        id: 1,
        category: 'Tent',
        deposit: 30000,
        rental_fee: 25000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '테스트테스트1',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
        users_id: 1,
        reservation_dates: ['2021.12.29', '2021.12.30', '2021.12.31'],
        likes_count: 15,
      },
      {
        id: 1,
        category: 'Chair',
        deposit: 30000,
        rental_fee: 25000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '테스트테스트2',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
        users_id: 1,
        reservation_dates: ['2021.12.29', '2021.12.30', '2021.12.31'],
        likes_count: 15,
      },
    ],
  },
});

//? 주소 검색 결과 수정용
export const posts = atom({
  key: 'posts',
  default: {
    posts: [
      {
        id: 1,
        category: 'Tent',
        deposit: 30000,
        rental_fee: 25000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '테스트테스트1',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
        users_id: 1,
        reservation_dates: ['2021.12.29', '2021.12.30', '2021.12.31'],
        likes_count: 15,
      },
      {
        id: 1,
        category: 'Chair',
        deposit: 30000,
        rental_fee: 25000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '테스트테스트2',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://paperbarkcamp.com.au/wp-content/uploads/2019/07/paperbark_flash-camp_news_1218x650.jpg',
        users_id: 1,
        reservation_dates: ['2021.12.29', '2021.12.30', '2021.12.31'],
        likes_count: 15,
      },
    ],
  },
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

//? 리뷰 모달 보여주기용 어떤페이지에서든 로그인버튼 누르면 나오게하기위함
export const showReviewModal = atom({
  key: 'showReviewModal',
  default: false,
});

//? 경고 모달 보여주기용 어떤페이지에서든 누르면 나오게하기위함
export const showAlertModal = atom({
  key: 'showAlertModal',
  default: false,
});

//? 대여 확인 모달 : ㅇㅇ를 하시겠습니까? [예/아니오]
export const showConfirmModal = atom({
  key: 'showConfirmModal',
  default: false,
});

export const borrows = atom({
  key: 'borrows',
  default: {
    reservation: [
      {
        id: 1,
        users_id: 1,
        posts_id: 1,
        reservation_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        reservation_status: 2,
        posts: {
          id: 1,
          category: 'Tent',
          deposit: 20000,
          rental_fee: 20000,
          unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
          title: '3~4인용 텐트 빌려드려요',
          content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
          longitude: 126.99597295767953,
          latitude: 35.97664845766847,
          address: '서울특별시 동작구 신대방동',
          img_urls:
            'https://static.coupangcdn.com/image/vendor_inventory/a0f5/5fe889df54254c27c75877f9c5339137c91d5b5ac68799e924573a317d15.jpeg',
          users_id: 1,
          likes_count: 5,
        },
      },
      {
        id: 2,
        users_id: 2,
        posts_id: 1,
        reservation_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        reservation_status: 1,
        posts: {
          id: 1,
          category: 'Tent',
          deposit: 20000,
          rental_fee: 20000,
          unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
          title: '3~4인용 텐트 빌려드려요',
          content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
          longitude: 126.99597295767953,
          latitude: 35.97664845766847,
          address: '서울특별시 동작구 신대방동',
          img_urls:
            'https://static.coupangcdn.com/image/vendor_inventory/a0f5/5fe889df54254c27c75877f9c5339137c91d5b5ac68799e924573a317d15.jpeg',
          users_id: 1,
          likes_count: 5,
        },
      },
    ],
  },
});

export const lends = atom({
  key: 'lends',
  default: {
    posts: [
      {
        id: 1,
        category: 'Tent',
        deposit: 20000,
        rental_fee: 20000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '3~4인용 텐트 빌려드려요',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://5.imimg.com/data5/GD/XU/MY-27300/vintage-camping-tent-500x500.jpg',
        users_id: 1,
        likes_count: 5,
        reservation: [
          {
            id: 1,
            users_id: 1,
            posts_id: 1,
            reservation_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
            reservation_status: 1,
          },
        ],
      },
    ],
  },
});

export const likes = atom({
  key: 'likes',
  default: {
    posts: [
      {
        id: 1,
        category: 'Tent',
        deposit: 20000,
        rental_fee: 20000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '3~4인용 텐트 빌려드려요',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://folkency.nfm.go.kr/upload/img/20200522/20200522183534_t_.jpg',
        users_id: 1,
        likes_count: 5,
      },
    ],
    likes: [
      {
        id: 1,
        users_id: 1,
        posts_id: 1,
      },
    ],
  },
});

export const resists = atom({
  key: 'resists',
  default: {
    posts: [
      {
        id: 1,
        category: 'Tent',
        deposit: 20000,
        rental_fee: 20000,
        unavailable_dates: ['2021.12.20', '2021.12.21', '2021.12.22'],
        title: '3~4인용 텐트 빌려드려요',
        content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
        longitude: 126.99597295767953,
        latitude: 35.97664845766847,
        address: '서울특별시 동작구 신대방동',
        img_urls:
          'https://wacarrandson.co.uk/wp-content/uploads/2018/03/Bell-tent-Hire.jpg',
        users_id: 1,
        likes_count: 5,
      },
    ],
  },
});

//? atom borrowList와 LikeList, ResistsList에서 반복되는 interface
export interface UserPost {
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
  likes_count: number;
}

//? 달력 컴포넌트용 전역 상태

export const selectDate = atom<string[]>({
  key: 'selectDate',
  default: [],
});

//?주소 선택용 전역 상태

export const selectAddress = atom<string>({
  key: 'selectAddress',
  default: '',
});

export const searchAddress = atom<string[]>({
  key: 'searchAddress',
  default: [],
});

export const showAddressList = atom({
  key: 'showAdressList',
  default: false,
});

//? 이미지 삽입 전역 상태

export const imgFile = atom<any[]>({
  key: 'imgFiles',
  default: [],
});

export const preView = atom<any[]>({
  key: 'preView',
  default: [],
});

export const formData = atom<any[]>({
  key: 'formData',
  default: [],
});

//? 상세페이지 전역상태 날짜

export const startDate = atom<string>({
  key: 'start',
  default: '',
});

export const endDate = atom<String>({
  key: 'end',
  default: '',
});

export const unableDate = atom<string[]>({
  key: 'unable',
  default: [],
});

export const isSelectStart = atom<boolean>({
  key: 'isStartSelect',
  default: true,
});

export const showCalendar = atom<boolean>({
  key: 'showCalendar',
  default: false,
});
