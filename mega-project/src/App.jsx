import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import {Header,Footer} from './components';
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoadin] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoadin(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap  content-between bg-grey-200">
      <div className="w-full block">
        <Header />
        <main>
        {/* Todo:  <Outlet/> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
