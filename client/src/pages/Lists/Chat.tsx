/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { flex, rem, color, relative } from '../../common';
import { container, section } from './tab';
import ListTab from '../../components/ListTab';
import { chat } from '../../Atom';
import Reservation from '../../components/Reservation';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import io from 'socket.io-client';

const button = css`
  background-color: white;
  border: none;
  position: absolute;
  right: ${rem(24)};
  top: ${rem(-3)};
  cursor: pointer;
`;

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

function Chat() {
  const chatPost = useRecoilValue<chatList>(chat);
  const [buttonClick, setButtonClick] = useState<boolean>(false);
  const onButtonClick = () => {
    setButtonClick(true);
  };

  const newSocket = io('http://localhost:5050');
  newSocket.on('message', (message) => {
    console.log(message);
  });

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
          어디?
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
            <Input width={550} height={50} />
            <button css={button}>d</button>
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
