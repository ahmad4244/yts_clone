import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Main />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
