/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import MainDetail from './pages/MainDetail';
import Writing from './pages/Writing';
import BorrowList from './pages/Lists/BorrowList';
import LendList from './pages/Lists/LendList';
import LikeList from './pages/Lists/LikeList';
import ResistList from './pages/Lists/ResistList';
import Chat from './pages/Lists/Chat';
import KakaoLogin from './components/KakaoLogin';
import GoogleLogin from './components/GoogleLogin';
import PostModify from './pages/PostModify';
import { navbarOn } from './Atom';
import { useRecoilValue } from 'recoil';

function App() {
  const navOn = useRecoilValue(navbarOn);
  return (
    <Router>
      <div
        className="App"
        css={css`
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div>
          {navOn ? (
            <div>
              <Navbar />
            </div>
          ) : null}
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/main" element={<Main />} />
            <Route path="/main/*" element={<MainDetail />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="/writing/*" element={<PostModify />} />
            <Route path="/lists/borrowlist" element={<BorrowList />} />
            <Route path="/lists/lendlist" element={<LendList />} />
            <Route path="/lists/likelist" element={<LikeList />} />
            <Route path="/lists/resistlist" element={<ResistList />} />
            <Route path="/lists/chat" element={<Chat />} />
            <Route path="/oauth/kakao/callback" element={<KakaoLogin />} />
            <Route path="/oauth/google/callback" element={<GoogleLogin />} />
          </Routes>
        </div>
        {navOn ? (
          <div>
            <Footer />
          </div>
        ) : null}
      </div>
    </Router>
  );
}

export default App;
