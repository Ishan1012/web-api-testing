import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Content from './components/Content';

function App() {
  return (
    <div className="main-container">
      <div className="header"><Header /></div>
      <div className="main-content">
        <div className="navbar"><Navbar /></div>
        <div className="content"><Content /></div>
      </div>
      <div className="footer"><Footer /></div>
    </div>
  );
}

export default App;
