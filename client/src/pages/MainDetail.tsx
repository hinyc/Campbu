import { useNavigate } from 'react-router-dom';
import LikeSymbol from '../components/LikeSymbol';
import ReviewBox from '../components/ReviewBox';

function DetailView() {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div>
          <div>3~4인용 텐트 빌려드려요</div>
          <LikeSymbol />
        </div>
        <div>
          <div>{`<`}</div>
          <div></div>
          <div>{`>`}</div>
        </div>
      </div>
      <div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </div>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        목록보기
      </button>
    </div>
  );
}

export default DetailView;
