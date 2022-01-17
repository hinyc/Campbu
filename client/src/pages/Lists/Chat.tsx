/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, rem, color, relative, host } from '../../common';
import { container } from './tab';
import ListTab from '../../components/ListTab';
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
  width: ${rem(318)};
  height: ${rem(66)};
  text-align: left;
  font-size: ${rem(18)};
  font-weight: 700;
  padding-left: ${rem(20)};
  padding-top: ${rem(18)};
  border-bottom: ${rem(1)} solid #dedede;
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

interface post {
  text: string;
  background: string;
  color: string;
  opacity?: string;
  cursor: string;
  hover?: string;
  postId: number;
  img_urls: string;
  address: string;
  title: string;
  deposit: number;
  rental_fee: number;
  reservation_dates: string[];
  onButtonClick: () => void;
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

function Chat() {
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatRoomId, setChatRoomId] = useState<number>();
  const [chatNickName, setChatNickName] = useState<string>('');
  const [chatting, setChatting] = useState<object[]>([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [userNickName, setUserNickName] = useState<string>('');
  const [posts, setPosts] = useState<object>({});
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const [socket, setSocket] = useState<any>();
  const onButtonClick = () => {
    setButtonClick(true);
  };

  useEffect(() => {
    axios
      .get(`${host}/chat/chatRoom`, {
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
      const date = new Date();
      console.log(date);
      socket.emit('send-message', { chatRoomId, chatMessage, userNickName });
      setChatMessage('');
    }
  };

  const handleOnClick = (e: any) => {
    socket.emit('send-message', { chatRoomId, chatMessage, userNickName });
    setChatMessage('');
  };

  const handleChatRoomClick = (e: any, id: number, nickName: string) => {
    if (chatRoomId !== id) {
      setChatRoomId(id);
      setChatNickName(nickName);
      axios
        .get(`${host}/chat/message/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
        .then((res: any) => {
          setChatting([res.data.chat.chat]);
          setPosts(res.data.post);
        });
    } else {
      setChatRoomId(0);
      setChatNickName('');
      setChatting([]);
    }
  };

  return (
    <>
      <ListTab></ListTab>
      <div
        css={[
          container,
          flex,
          css`
            height: ${rem(600)};
          `,
        ]}
      >
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
          <div css={[message]}>메시지</div>
          <div
            css={[
              css`
                height: ${rem(534)};
                overflow: auto;
                ::-webkit-scrollbar {
                  display: none;
                }
              `,
            ]}
          >
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
                  handleChatRoomClick(
                    e,
                    chatRoom.id,
                    chatRoom.recipient_nickname === userNickName
                      ? chatRoom.sender_nickname
                      : chatRoom.recipient_nickname,
                  );
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
                height: ${rem(66)};
                text-align: left;
                font-size: ${rem(18)};
                font-weight: 700;
                padding-left: ${rem(20)};
                padding-top: ${rem(18)};
                border-bottom: ${chatNickName === ''
                  ? ''
                  : `${rem(1)} solid #dedede`};
              `,
            ]}
          >
            {chatNickName}
          </div>
          <div
            css={[
              css`
                height: ${rem(470)};
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
                    <div>
                      <div
                        css={[
                          css`
                            max-width: ${rem(550)};
                            font-size: ${rem(16)};
                            margin-right: ${rem(5)};
                            margin-top: ${rem(5)};
                            text-align: right;
                            background-color: #ed662c;
                            border-radius: ${rem(5)};
                            padding: ${rem(5)};
                            color: #ffffff;
                          `,
                        ]}
                      >
                        {chats.message}
                      </div>
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
                    <div>
                      <div
                        css={[
                          css`
                            max-width: ${rem(550)};
                            font-size: ${rem(18)};
                            margin-left: ${rem(5)};
                            margin-top: ${rem(5)};
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
                  </div>
                )}
              </>
            ))}
          </div>
          <span css={[relative]}>
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
