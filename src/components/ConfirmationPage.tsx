import logo from "assets/logo.png";
import bg from "assets/bg.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "store";

const ConfirmationPage = () => {
  const user = useSelector((state: RootState) => {
    return state.userReducer.user;
  });

  const formattedDate = new Date(user.updatedAt).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-[100dvh] bg-cover bg-center relative">
      <img
        src={bg}
        alt="bg"
        className="absolute top-0 left-0 w-full h-full z-[-1] object-cover"
      />
      <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <img src={logo} alt="logo" className="max-w-full h-auto" />
        <p className="mt-6 text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900">
          {user.firstName} {user.lastName}, You have been clocked
          {user.clockOutDttm === null ? " in" : " out"} at {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
