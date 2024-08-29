import logo from "assets/logo.png";
import bg from "assets/bg.jpeg";

type ConfirmationProps = {
  firstName: string;
  lastName: string;
  clockStatus: "in" | "out";
  dateTime: string;
};

const ConfirmationPage = ({
  firstName,
  lastName,
  clockStatus,
  dateTime,
}: ConfirmationProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen h-[100dvh] bg-cover bg-center relative">
      <img src={bg} alt="bg" className="absolute top-0 left-0 w-full z-[-1] min-h-[100vh]"/>
      <div className="text-center">
        <img src={logo} alt="logo" />
        <p className="mt-6 text-4xl font-bold text-blue-900">
          {firstName} {lastName} you have been clocked
          {clockStatus === "in" ? " in" : " out"} at {dateTime}
        </p>
      </div>
    </div>
  );
};

export default ConfirmationPage;
