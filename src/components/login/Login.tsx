import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "store/api/userSlice";
import { useDispatch } from "react-redux";
import { useToast } from "components/ui/use-toast";
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "assets/logo.png";
import bg from "assets/bg.jpeg";
import { setToken, setUser } from "store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

type Props = {};

const schema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

type FormData = z.infer<typeof schema>;

const Login = (props: Props) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loginApiCall, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await loginApiCall(data).unwrap();
      toast({
        title: "Success Message",
        description: "You're successfully logged in",
      });

      dispatch(setUser(res.data));
      dispatch(setToken(res.data.userId));
      navigate("/confirmation-page");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: err.data?.errorMessage,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen h-[100dvh] bg-cover bg-center relative">
      <img
        src={bg}
        alt="bg"
        className="absolute top-0 left-0 w-full z-[-1] min-h-[100vh]"
      />
      <div className="flex flex-col items-center justify-center w-full max-w-md p-8">
        <img src={logo} alt="logo" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-8"
        >
          <div className="relative">
            <label
              htmlFor="username"
              className="absolute left-[-75px] top-[16px] text-gray-600 text-sm"
            >
              Username
            </label>
            <Input
              id="username"
              type="text"
              autoComplete="username"
              {...register("username")}
              className={`border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } w-full p-2`}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="absolute left-[-75px] top-[16px] text-gray-600 text-sm"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } w-full p-2 pr-10`}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-fit m-auto text-sm text-white rounded-3xl bg-[#25a7e3] py-1"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Clock IN/OUT"}
            </Button>
          </div>
        </form>
        {false && ( // conditionally render the error message component
          <div className="mt-4 p-2 bg-red-200 text-red-700 rounded-lg">
            <p className="text-sm">ERROR MESSAGE HERE</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
