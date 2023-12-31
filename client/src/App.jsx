import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.auth.user));
  console.log(isAuth);
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/chats"
            element={isAuth ? <ChatPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
