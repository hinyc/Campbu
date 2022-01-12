/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectDate } from '../Atom';
import { flexBetween, rem, color } from '../common';

const calendarContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${color.border};
  border-radius: ${rem(5)};
  padding: ${rem(16)} 0;
`;

const arrow = css`
  width: ${rem(40)};
  height: ${rem(30)};
  height: ${rem(30)};
  font-size: ${rem(20)};
  border: 1px solid ${color.border};
  border-radius: ${rem(5)};
  background-color: ${color.white};
  color: ${color.placeholder};
`;
const thisMonth = css`
  font-size: ${rem(20)};
  font-weight: 700;
`;

const datesStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid ${color.border};
  border-radius: ${rem(5)};
`;

const reset = css`
  width: ${rem(60)};
  height: ${rem(30)};
  line-height: ${rem(30)};
  border: 1px solid ${color.border};
  border-radius: ${rem(5)};
  text-align: center;
  font-size: ${rem(14)};
  font-weight: 700;
  margin-top: ${rem(20)};
`;

interface AdayProps {
  day: string;
  idx: number;
  width: number;
  height: number;
}

function Aday(props: AdayProps) {
  const { day, width } = props;
  return (
    <div
      css={css`
        width: ${rem(width / 7)};
        height: ${rem(width / 8)};
        font-size: ${rem(14)};
        text-align: center;
        line-height: ${rem(width / 7)};
      `}
    >
      <div>{day}</div>
    </div>
  );
}

interface AdateProps {
  date: number;
  idx: number;
  width: number;
  height: number;
  year: number;
  month: number;
}

function Adate(props: AdateProps) {
  const { date, idx, width, year, month } = props;
  const [isSelect, setIsSelect] = useState(false);
  const [setDates, setSetDates] = useRecoilState(selectDate);

  let thisYear = year;
  let thisMonth = month;
  let isWeekend = 'black';

  if (idx < 6 && date - 10 > 0) {
    const preMonth = new Date(year, month - 1, 0);
    thisYear = preMonth.getFullYear();
    thisMonth = preMonth.getMonth() + 1;
  }

  if (idx > 20 && 10 - date > 0) {
    const preMonth = new Date(year, month + 1, 0);
    thisYear = preMonth.getFullYear();
    thisMonth = preMonth.getMonth() + 1;
  }

  const selectDateHandler = () => {
    setIsSelect(!isSelect);

    const alreadySelected = setDates.indexOf(
      `${thisYear}.${thisMonth}.${date}`,
    );

    if (isSelect) {
      setSetDates([
        ...setDates.slice(0, alreadySelected),
        ...setDates.slice(alreadySelected + 1),
      ]);
    } else {
      setSetDates([...setDates, `${thisYear}.${thisMonth}.${date}`]);
    }
  };
  return (
    <div
      css={css`
        width: ${rem((width - 2) / 7)};
        height: ${rem(width / 7)};
        line-height: ${rem(width / 7)};
        font-size: ${rem(14)};
        text-align: center;
        color: ${isWeekend};
        background-color: ${isSelect ? color.light : null};
      `}
      onClick={selectDateHandler}
    >
      <div
        css={css`
          :hover {
            cursor: pointer;
          }
        `}
      >
        {date}
      </div>
    </div>
  );
}

export default function Calendar() {
  const days: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  //tagret 오늘기준
  const [getDate, setGetDate] = useState(new Date());
  const targetYear: number = getDate.getFullYear();
  const targetMonth: number = getDate.getMonth() + 1;

  function setGetDateHandler(year: number, month: number): void {
    setGetDate(new Date(year, month, 0));
  }

  //! start; calendar days array generator //
  const preLastInfo: Date = new Date(targetYear, targetMonth - 1, 0);
  const thisLastInfo: Date = new Date(targetYear, targetMonth, 0);

  const preLastDate = preLastInfo.getDate();
  const preLastDay = preLastInfo.getDay();
  const thisLastDate = thisLastInfo.getDate();
  const thisLastDay = thisLastInfo.getDay();

  const preDates: number[] = [];
  const thisDates: number[] = [];
  const nextDates: number[] = [];

  if (preLastDay < 6) {
    for (let i = preLastDate; i > preLastDate - preLastDay - 1; i--) {
      preDates.unshift(i);
    }
  }

  for (let i = 1; i <= thisLastDate; i++) {
    thisDates.push(i);
  }
  for (let i = 1; i < 7 - thisLastDay; i++) {
    nextDates.push(i);
  }

  const dates: number[] = [...preDates, ...thisDates, ...nextDates];

  //! end; calendar days array generator //

  const widthPixel: number = 312;
  const heigthPixel: number = 403;

  return (
    <div
      css={[
        calendarContainerStyle,
        css`
          width: ${rem(widthPixel + 32)};
          /* height: ${rem(heigthPixel + 32)}; */
        `,
      ]}
    >
      <div
        css={css`
          width: ${rem(widthPixel)};
          /* height: ${rem(heigthPixel)};  */
        `}
      >
        <div className="nav" css={flexBetween}>
          <button
            css={arrow}
            onClick={() => setGetDateHandler(targetYear, targetMonth - 1)}
          >
            ←
          </button>
          <span css={thisMonth}>{`${targetYear}년 ${targetMonth}월`}</span>
          <button
            css={arrow}
            onClick={() => setGetDateHandler(targetYear, targetMonth + 1)}
          >
            →
          </button>
        </div>
        <div className="days" css={flexBetween}>
          {days.map((day, idx) => (
            <Aday
              key={idx}
              day={day}
              idx={idx}
              width={widthPixel}
              height={heigthPixel}
            />
          ))}
        </div>
        <div className="dates" css={datesStyle}>
          {dates.map((date, idx) => (
            <Adate
              key={idx}
              date={date}
              idx={idx}
              year={targetYear}
              month={targetMonth}
              width={widthPixel}
              height={heigthPixel}
            />
          ))}
        </div>

        <div className="numDays"></div>
        <div className="reset" css={reset}>
          초기화
        </div>
      </div>
    </div>
  );
}
