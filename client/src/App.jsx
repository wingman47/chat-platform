import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={<ChatPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
