/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, rem, color, relative, host } from '../../common';
import { container } from './tab';
import ListTab from '../../components/ListTab';
import { chat } from '../../Atom';
import Reservation from '../../components/Reservation';
import Input from '../../components/Input';
import PaperPlane from '../../assets/PaperPlane.svg';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

//! ------------ css -------------------
const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(80)};
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

interface chatRoom {
  id: number;
  recipient_nickname: string;
  recipient_img: string;
  sender_nickname: string;
  chat: object[];
  created_at: Date;
  updated_at: Date;
  reservation_id: {
    id: number;
    reservation_dates: string[];
    reservation_status: number;
    created_at: Date;
    updated_at: Date;
  };
}

interface chats {
  nickName: string;
  message: string;
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
  const [chatRoomId, setChatRoomId] = useState<number>();
  const [chatting, setChatting] = useState<object[]>([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [userNickName, setUserNickName] = useState<string>('');
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>();
  const onButtonClick = () => {
    setButtonClick(true);
  };

  console.log(chatting);

  useEffect(() => {
    axios
      .get(`${host}/chatRoom`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res: any) => {
        setChatRooms(res.data.chat);
        setUserNickName(res.data.nickName);
      });
  }, []);

  useEffect((): any => {
    const newSocket = io('http://localhost:5050', {
      query: { chatRoomId },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [chatRoomId]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', (message: any) => {
      setChatting([...chatting, message]);
    });
    return () => socket.off('receive-message');
  });

  const handleOnChange = (e: any) => {
    setChatMessage(e.target.value);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      socket.emit('send-message', { chatRoomId, chatMessage, userNickName });
      setChatMessage('');
    }
  };

  const handleOnClick = (e: any) => {
    socket.emit('send-message', { chatRoomId, chatMessage, userNickName });
    setChatMessage('');
  };

  const handleChatRoomClick = (e: any, id: number) => {
    setChatRoomId(id);
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
          {chatRooms.map((chatRoom: chatRoom) => (
            <div
              css={[
                css`
                  width: ${rem(318)};
                  height: ${rem(90)};
                  display: flex;
                  :hover {
                    background-color: #f0f0f0;
                  }
                  background-color: ${chatRoom.id === chatRoomId
                    ? '#f0f0f0'
                    : '#ffffff'};
                `,
              ]}
              onClick={(e) => {
                handleChatRoomClick(e, chatRoom.id);
              }}
              key={chatRoom.id}
            >
              <div
                css={[
                  imgStyle,
                  css`
                    background-image: ${`url(${chatRoom.recipient_img})`};
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
                  {chatRoom.recipient_nickname === userNickName
                    ? chatRoom.sender_nickname
                    : chatRoom.recipient_nickname}
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
                >{`${chatRoom.reservation_id.reservation_dates[0]}~${
                  chatRoom.reservation_id.reservation_dates[
                    chatRoom.reservation_id.reservation_dates.length - 1
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
              border: ${rem(1)} solid #dedede;
            `,
          ]}
        >
          <div
            css={[
              css`
                height: ${rem(450)};
                overflow: auto;
                ::-webkit-scrollbar {
                  display: none;
                }
              `,
            ]}
          >
            {chatting.map((chats: any) => (
              <>
                {chats.sender === userNickName ? (
                  <div
                    css={[
                      flex,
                      css`
                        justify-content: right;
                        margin: ${rem(10)};
                      `,
                    ]}
                  >
                    <div
                      css={[
                        css`
                          max-width: ${rem(550)};
                          font-size: ${rem(18)};
                          margin-right: ${rem(5)};
                          text-align: right;
                          background-color: #ed662c;
                          border-radius: ${rem(5)};
                          padding: ${rem(2)};
                          color: #ffffff;
                        `,
                      ]}
                    >
                      {chats.message}
                    </div>
                    <div
                      css={[
                        css`
                          width: ${rem(50)};
                          height: ${rem(50)};
                          border: 2px solid ${color.point};
                          border-radius: 50%;
                          background-size: cover;
                        `,
                      ]}
                    ></div>
                  </div>
                ) : (
                  <div
                    css={[
                      flex,
                      css`
                        margin: ${rem(10)};
                      `,
                    ]}
                  >
                    <div
                      css={[
                        css`
                          width: ${rem(50)};
                          height: ${rem(50)};
                          border: 2px solid ${color.point};
                          border-radius: 50%;
                          background-size: cover;
                        `,
                      ]}
                    ></div>
                    <div
                      css={[
                        css`
                          max-width: ${rem(550)};
                          font-size: ${rem(18)};
                          margin-left: ${rem(5)};
                          text-align: left;
                          border: 1px solid #ed662c;
                          border-radius: ${rem(5)};
                          padding: ${rem(2)};
                        `,
                      ]}
                    >
                      {chats.message}
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
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
          {/* <Reservation
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
          /> */}
        </div>
      </div>
    </>
  );
}

export default Chat;
