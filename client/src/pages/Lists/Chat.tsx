/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, rem, color, relative } from '../../common';
import { container } from './tab';
import ListTab from '../../components/ListTab';
import { chat } from '../../Atom';
import Reservation from '../../components/Reservation';
import Input from '../../components/Input';
import PaperPlane from '../../assets/PaperPlane.svg';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

//! ------------ css -------------------
const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(15)};
  top: ${rem(12)};
  cursor: pointer;
`;

const message = css`
  width: ${rem(280)};
  text-align: left;
  font-size: ${rem(20)};
  font-weight: 700;
  margin-top: ${rem(20)};
  margin-bottom: ${rem(10)};
  margin-left: ${rem(20)};
`;

const imgStyle = css`
  width: ${rem(70)};
  height: ${rem(70)};
  border: 2px solid ${color.point};
  border-radius: 50%;
  background-size: cover;
  margin-top: ${rem(10)};
  margin-left: ${rem(10)};
  margin-right: ${rem(10)};
`;

//! ------------ interface -------------------

interface chatList {
  Post: Post;
}

interface Post {
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
  reservation: List;
}

interface List {
  id: number;
  users_id: number;
  posts_id: number;
  reservation_dates: string[];
  reservation_status: number;
}

//! ------------ infos -------------------

const chatInfos = [
  {
    id: 1,
    recipient_nickname: 'yc',
    recipient_img:
      'https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    users_id: 1,
    reservation: {
      id: 1,
      reservation_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
      reservation_status: 1,
    },
    post: {
      id: 1,
      category: 'Tent',
      deposit: 20000,
      rental_fee: 20000,
      unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
      title: '3~4인용 텐트 빌려드려요',
      content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
      longitude: 126.99597295767953,
      latitude: 35.97664845766847,
      address: '서울특별시 동작구 신대방동',
      img_urls:
        'https://5.imimg.com/data5/GD/XU/MY-27300/vintage-camping-tent-500x500.jpg',
    },
  },
  {
    id: 2,
    recipient_nickname: 'chan',
    recipient_img:
      'https://images.unsplash.com/photo-1497906539264-eb74442e37a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    users_id: 1,
    reservation: {
      id: 2,
      reservation_dates: ['2022.01.15', '2022.01.16', '2022.01.17'],
      reservation_status: 1,
    },
    post: {
      id: 1,
      category: 'Tent',
      deposit: 20000,
      rental_fee: 20000,
      unavailable_dates: ['2021-12-20', '2021-12-21', '2021-12-22'],
      title: '3~4인용 텐트 빌려드려요',
      content: '쉽게 설치할 수 있는 3~4인용 텐트입니다.',
      longitude: 126.99597295767953,
      latitude: 35.97664845766847,
      address: '서울특별시 동작구 신대방동',
      img_urls:
        'https://5.imimg.com/data5/GD/XU/MY-27300/vintage-camping-tent-500x500.jpg',
    },
  },
];

function Chat() {
  const chatPost = useRecoilValue<chatList>(chat);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatRoomName, setChatRoomName] = useState<string>('');
  const [chatting, setChatting] = useState<string[]>(['']);
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>();
  const onButtonClick = () => {
    setButtonClick(true);
  };

  useEffect((): any => {
    const newSocket = io('http://localhost:5050', {
      query: { chatRoomName },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [chatRoomName]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', (message: any) => {
      console.log(message);
    });
  }, [socket]);

  const handleOnChange = (e: any) => {
    setChatMessage(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      socket.emit('send-message', { chatRoomName, chatMessage });
      setChatMessage('');
    }
  };

  const handleOnClick = (e: any) => {
    socket.emit('send-message', { chatRoomName, chatMessage });
    setChatMessage('');
  };

  const handleChatRoomClick = (e: any, nickname: string) => {
    setChatRoomName(nickname);
  };

  return (
    <>
      <ListTab></ListTab>
      <div css={[container, flex]}>
        <div
          css={[
            css`
              width: ${rem(320)};
              display: flex;
              flex-direction: column;
              align-items: center;
              border: ${rem(1)} solid #dedede;
            `,
          ]}
        >
          <div css={message}>메시지</div>
          {chatInfos.map((chatInfo) => (
            <div
              css={[
                css`
                  width: ${rem(320)};
                  height: ${rem(90)};
                  display: flex;
                  :hover {
                    background-color: #f0f0f0;
                  }
                  background-color: ${chatInfo.recipient_nickname ===
                  chatRoomName
                    ? '#f0f0f0'
                    : '#ffffff'};
                `,
              ]}
              onClick={(e) => {
                handleChatRoomClick(e, chatInfo.recipient_nickname);
              }}
              key={chatInfo.id}
            >
              <div
                css={[
                  imgStyle,
                  css`
                    background-image: ${`url(${chatInfo.recipient_img})`};
                  `,
                ]}
              ></div>
              <div
                css={[
                  css`
                    text-align: center;
                    width: ${rem(230)};
                    height: ${rem(90)};
                    display: flex;
                    flex-direction: column;
                  `,
                ]}
              >
                <div
                  css={[
                    css`
                      text-align: left;
                      height: ${rem(50)};
                      font-size: ${rem(20)};
                      margin-left: ${rem(10)};
                      margin-top: ${rem(10)};
                    `,
                  ]}
                >
                  {chatInfo.recipient_nickname}
                </div>
                <div
                  css={[
                    css`
                      height: ${rem(40)};
                      text-align: left;
                      margin-left: ${rem(10)};
                      margin-top: ${rem(-10)};
                    `,
                  ]}
                >{`${chatInfo.reservation.reservation_dates[0]}~${
                  chatInfo.reservation.reservation_dates[
                    chatInfo.reservation.reservation_dates.length - 1
                  ]
                }`}</div>
              </div>
            </div>
          ))}
        </div>
        <div
          css={[
            css`
              width: ${rem(640)};
              display: flex;
              flex-direction: column;
              align-items: center;
              border: ${rem(1)} solid #dedede;
            `,
          ]}
        >
          <div
            css={[
              css`
                height: ${rem(450)};
              `,
            ]}
          ></div>
          <span css={relative}>
            <Input
              type="text"
              width={500}
              height={50}
              font-size={18}
              placeholder="메시지를 입력해주세요"
              value={chatMessage}
              onChange={handleOnChange}
              onKeyPress={handleKeyPress}
            />
            <button css={button} onClick={handleOnClick}>
              <img src={PaperPlane} alt="PaperPlane"></img>
            </button>
          </span>
        </div>
        <div
          css={[
            css`
              width: ${rem(320)};
              display: flex;
              flex-direction: column;
              align-items: center;
              border: ${rem(1)} solid #dedede;
              padding: ${rem(30)};
            `,
          ]}
        >
          <Reservation
            text="예약 취소"
            background={`${color.point}`}
            color="white"
            cursor="pointer"
            hover="80%"
            postId={chatPost.Post.id}
            img_urls={chatPost.Post.img_urls}
            address={chatPost.Post.address}
            title={chatPost.Post.title}
            deposit={chatPost.Post.deposit}
            rental_fee={chatPost.Post.rental_fee}
            reservation_dates={chatPost.Post.reservation.reservation_dates}
            onButtonClick={onButtonClick}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
