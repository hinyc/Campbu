import { Link } from 'react-router-dom';

function Lists() {
  return (
    <>
      <div>List</div>
      <header>
        <Link to="borrowlist" style={{ marginRight: 10 }}>
          빌린 목록
        </Link>
        <Link to="lendlist" style={{ marginRight: 10 }}>
          빌려준 목록
        </Link>
        <Link to="resistlist" style={{ marginRight: 10 }}>
          내가 쓴 글
        </Link>
        <Link to="likelist" style={{ marginRight: 10 }}>
          찜한 목록
        </Link>
      </header>
    </>
  );
}

export default Lists;
