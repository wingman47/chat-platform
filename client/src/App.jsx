import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
