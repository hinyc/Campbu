/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import {
  flex,
  rem,
  color,
  relative,
  host,
  textDecorationNone,
  flexBetween,
} from '../../common';
import { container } from './tab';
import ListTab from '../../components/ListTab';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import {
  post,
  img,
  textContainer,
  span,
  addressStyle,
  moneyTitle,
} from '../../components/post';
import PaperPlane from '../../assets/PaperPlane.svg';
import Here from '../../assets/Here.svg';
import { useRecoilState } from 'recoil';
import { chatsNum } from '../../Atom';
import { useState, useEffect, useRef } from 'react';
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

interface chatNum {
  [key: string]: number;
}

function Chat() {
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatRoomId, setChatRoomId] = useState<number>();
  const [chatNickName, setChatNickName] = useState<string>('');
  const [chatting, setChatting] = useState<object[]>([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [userNickName, setUserNickName] = useState<string>('');
  const [posts, setPosts] = useState<any>({});
  const [socket, setSocket] = useState<any>();
  const [chatCount, setChatCount] = useRecoilState<chatNum>(chatsNum);
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const onButtonClick = () => {
    setButtonClick(true);
  };
  console.log(socket);
  useEffect(() => {
    axios
      .get(`${host}/chat/chatRoom`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res: any) => {
        const chatIds = res.data.chat.map((chat: any) => {
          const roomId = 'Room' + String(chat.id);
          if (!(roomId in chatCount)) {
            setChatCount((chatCount) => ({
              ...chatCount,
              [roomId]: 0,
            }));
          }
          return chat.id;
        });
        const newSocket = io('http://localhost:5050');
        newSocket.emit('open-room', chatIds);
        setSocket(newSocket);
        setChatRooms(res.data.chat);
        setUserNickName(res.data.nickName);
      });
  }, []);

  // useEffect((): any => {
  //   const newSocket = io('http://localhost:5050', {
  //     query: { chatRoomId },
  //   });
  //   setSocket(newSocket);
  // }, [chatRoomId]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', (message: any) => {
      if (message.id !== chatRoomId) {
        const roomId = 'Room' + String(message.id);
        setChatCount((chatCount) => ({
          ...chatCount,
          total: chatCount.total + 1,
          [roomId]: chatCount[roomId] + 1,
        }));
      } else if (message.id === chatRoomId) {
        setChatting([...chatting, message]);
      }
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

  const handleChatRoomClick = (e: any, id: number, nickName: string) => {
    if (chatRoomId !== id) {
      setChatCount((chatCount) => ({
        ...chatCount,
        total: chatCount.total - chatCount[`Room${id}`],
        [`Room${id}`]: 0,
      }));
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
          setChatting(res.data.chat);
          setPosts(res.data.post);
          console.log(res.data);
        });
    } else {
      setChatRoomId(0);
      setChatNickName('');
      setChatting([]);
      setPosts({});
    }
  };

  const getTime = (inDate: any) => {
    const date = new Date(inDate);
    const hour = date.getHours();
    const min = date.getMinutes();
    if (hour > 12) {
      return `오후 ${hour - 12}시 ${min}분`;
    } else {
      return `오전 ${hour}시 ${min}분`;
    }
  };

  const checkDate = (date: Date, lastDate: Date) => {
    const currentDate = new Date(date);
    const pastDate = new Date(lastDate);
    const nowYear = currentDate.getFullYear();
    const lastYear = pastDate.getFullYear();
    const nowMonth = currentDate.getMonth();
    const lastMonth = pastDate.getMonth();
    const nowDay = currentDate.getDay();
    const lastDay = pastDate.getDay();
    if (nowDay > lastDay) {
      return true;
    } else if (nowMonth > lastMonth) {
      return true;
    } else if (nowYear > lastYear) {
      return true;
    } else {
      return false;
    }
  };

  const getDayLine = (inDate: any) => {};

  const scrollLastMessage: any = useRef(null);
  useEffect(() => {
    scrollLastMessage.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  }, [chatting]);

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
                        position: relative;
                      `,
                    ]}
                  >
                    {chatRoom.recipient_nickname === userNickName
                      ? chatRoom.sender_nickname
                      : chatRoom.recipient_nickname}
                    {chatCount[`Room${chatRoom.id}`] === 0 ? (
                      <div></div>
                    ) : (
                      <div
                        css={[
                          css`
                            position: absolute;
                            right: ${rem(10)};
                            width: ${rem(30)};
                            top: ${rem(0)};
                            border: ${rem(2)} solid #ed662c;
                            text-align: center;
                            border-radius: 50%;
                          `,
                        ]}
                      >
                        {chatCount[`Room${chatRoom.id}`]}
                      </div>
                    )}
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
            {chatting.map((chats: any, index: number) => (
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
                    key={chats.date}
                  >
                    <div
                      css={[
                        css`
                          width: ${rem(70)};
                          position: relative;
                        `,
                      ]}
                    >
                      <div
                        css={[
                          css`
                            font-size: ${rem(10)};
                            text-align: left;
                            color: #7d7d7d;
                            position: absolute;
                            bottom: ${rem(10)};
                          `,
                        ]}
                      >
                        {getTime(chats.date)}
                      </div>
                    </div>
                    <div>
                      <div
                        css={[
                          css`
                            max-width: ${rem(250)};
                            font-size: ${rem(16)};
                            margin-right: ${rem(5)};
                            margin-top: ${rem(5)};
                            text-align: left;
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
                    key={chats.date}
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
                            max-width: ${rem(250)};
                            font-size: ${rem(18)};
                            margin-left: ${rem(5)};
                            margin-top: ${rem(5)};
                            text-align: right;
                            border: 1px solid #ed662c;
                            border-radius: ${rem(5)};
                            padding: ${rem(2)};
                          `,
                        ]}
                      >
                        {chats.message}
                      </div>
                    </div>
                    <div
                      css={[
                        css`
                          width: ${rem(70)};
                          position: relative;
                        `,
                      ]}
                    >
                      <div
                        css={[
                          css`
                            font-size: ${rem(10)};
                            text-align: right;
                            color: #7d7d7d;
                            position: absolute;
                            bottom: ${rem(10)};
                            margin-left: ${rem(5)};
                          `,
                        ]}
                      >
                        {getTime(chats.date)}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
            <div ref={scrollLastMessage}></div>
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
          {'id' in posts ? (
            <div css={post}>
              <Link to={`${posts.posts_id.id}`} css={textDecorationNone}>
                <img src={posts.posts_id.img_urls} alt="product" css={img} />
                <div css={textContainer}>
                  <span css={[span, moneyTitle, addressStyle]}>
                    <img src={Here} alt="위치" style={{ marginRight: '4px' }} />
                    {posts.posts_id.address}
                  </span>
                  <span css={span}>{posts.posts_id.title}</span>
                  <div css={flexBetween}>
                    <span>
                      <div css={[span, moneyTitle]}>보증금</div>
                      <div css={span}>{posts.posts_id.deposit}원</div>
                    </span>
                    <span>
                      <div css={[span, moneyTitle]}>대여비</div>
                      <div css={span}>{posts.posts_id.rental_fee}원</div>
                    </span>
                  </div>
                  <div css={[span, moneyTitle]}>대여날짜</div>
                  <div css={span}>{`${posts.reservation_dates[0]} ~ ${
                    posts.reservation_dates[posts.reservation_dates.length - 1]
                  }`}</div>
                </div>
              </Link>
              <Button
                text={'캠핑'}
                width={`${rem(205)}`}
                height={`${rem(40)}`}
                background={'white'}
                color={color.mid}
                border={`1px solid ${color.mid}`}
                size={`${rem(14)}`}
                cursor={'pointer'}
                hover={'80%'}
                onClick={onButtonClick}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
