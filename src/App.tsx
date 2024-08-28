import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "components/login/Login";
import ConfirmationPage from "components/ConfirmationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/confirmation-page"
          element={
            <ConfirmationPage
              firstName="issa"
              lastName="halabi"
              clockStatus="in"
              dateTime="2024-08-28 at 14:00"
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
