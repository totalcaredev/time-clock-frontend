import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "components/login/Login";
import ConfirmationPage from "components/ConfirmationPage";
import RequireAuth from "components/RequiredAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
        <Route
          path="/confirmation-page"
          element={
            <ConfirmationPage />
          }
        />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
