import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Mypage from './pages/Mypage';
import MainDetail from './pages/MainDetail';
import Writing from './pages/Writing';

import BorrowList from './pages/Lists/BorrowList';
import LendList from './pages/Lists/LendList';
import ResistList from './pages/Lists/ResistList';
import LikeList from './pages/Lists/LikeList';

function App() {
  return (
    <Router>
      <Navbar />
      <Link to="/" style={{ marginRight: 10 }}>
        intro
      </Link>
      <Link to="/main" style={{ marginRight: 10 }}>
        main
      </Link>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/main" element={<Main />} />
        <Route path="/main/*" element={<MainDetail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="borrowlist" element={<BorrowList />} />
        <Route path="lendlist" element={<LendList />} />
        <Route path="resistlist" element={<ResistList />} />
        <Route path="likelist" element={<LikeList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
