/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import {
  color,
  rem,
  relative,
  absolute,
  confirm,
  flexVertical,
  flexBetween,
} from '../common';
import { check } from 'prettier';

const textareaStyle = css`
  width: 29.9375rem;
  height: 11.125rem;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid ${color.border};
  border-radius: 0.3125rem;
  resize: none;
  ::placeholder {
    font-size: 1rem;
    color: ${color.placeholder};
  }
`;

const uploadImg = css`
  border: 1px solid ${color.border};
  border-radius: 0.3125rem;
  margin-right: 0.3125rem;
  text-align: center;
  width: 6.125rem;
  height: 6.125rem;
`;

export const Writing = () => {
  const navigate = useNavigate();

  return (
    <div css={flexVertical}>
      <button onClick={() => navigate('/main')}>목록으로 돌아가기</button>
      <div>
        <div>
          <Input
            width={850}
            height={55}
            borderStyle="none none solid none"
            borderRadius={0}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div css={flexBetween}>
          <div>
            <select>
              <option value="">텐트</option>
              <option value="">냄비</option>
              <option value="">램프</option>
            </select>
            <div>
              <Input
                width={372}
                height={50}
                borderRadius={5}
                placeholder="주소를 검색하세요"
              />
              <button>주소 검색</button>
            </div>
            <div>
              <Input
                width={97}
                height={50}
                borderRadius={5}
                placeholder="보증금"
              />
              <Input width={19} height={19} type="checkbox" />
              <span>대여자와 협의</span>
            </div>
            <div>
              <Input
                width={97}
                height={50}
                borderRadius={5}
                placeholder="대여비"
              />
              <Input width={19} height={19} type="checkbox" />
              <span>대여자와 협의</span>
            </div>
            <div>
              <textarea
                css={textareaStyle}
                placeholder="용품에 대한 설명을 입력해주세요"
              />
            </div>
            <div
              css={[
                flexBetween,
                css`
                  justify-content: flex-start;
                `,
              ]}
            >
              <div css={uploadImg}>업로드한 이미지 미리보기</div>
              <div css={uploadImg}>업로드한 이미지 미리보기</div>
              <div
                css={[
                  uploadImg,
                  css`
                    font-size: 90px;
                  `,
                ]}
              >
                +
              </div>
            </div>
          </div>
          <div css={confirm}>
            <div>대여 불가능한 날짜 선택하기</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writing;
