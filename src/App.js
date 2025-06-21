import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import Menu from "./components/Pages/Menu/Menu";
import Reservations from "./components/Pages/Reservations/Reservations";
import Order from "./components/Pages/Order/Order";
import Login from "./components/Pages/Login/Login";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/about"} element={<About />} />
            <Route path={"/menu"} element={<Menu />} />
            <Route path={"/reservations"} element={<Reservations />} />
            <Route path={"/order-online"} element={<Order />} />
            <Route path={"/login"} element={<Login />} />
        </Routes>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
