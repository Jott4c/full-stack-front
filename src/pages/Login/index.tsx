import { useForm } from "react-hook-form";
import api from "../../services/api";
import { Button, Input, LoginContainer, LoginForm } from "./styles";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await api.post("session", data);
      localStorage.setItem("authToken", JSON.stringify(response.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="email" {...register("email")} />
        {/*    {errors.username && <span>This field is required</span>} */}
        <Input type="password" placeholder="senha" {...register("password")} />
        {/*  {errors.password && <span>This field is required</span>} */}
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
