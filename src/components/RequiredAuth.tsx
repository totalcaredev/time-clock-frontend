import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { logOut } from "store/reducers/userReducer";
import { useEffect } from "react";

const RequireAuth = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => {
    return state.userReducer.accessToken;
  });
  const updatedAt = useSelector((state: RootState) => {
    return state.userReducer.user?.updatedAt;
  });

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(logOut());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    if (updatedAt) {
      const updatedAtDate = new Date(updatedAt);
      const now = new Date();
      const diffMs = now.getTime() - updatedAtDate.getTime();
      const remainingTime = 10000 - diffMs;

      if (remainingTime > 0) {
        const timeoutId = setTimeout(() => {
          dispatch(logOut());
        }, remainingTime);

        return () => clearTimeout(timeoutId);
      }
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [updatedAt, dispatch]);

  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
