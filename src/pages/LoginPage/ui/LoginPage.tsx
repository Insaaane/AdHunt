import { logToFile } from "@/shared/lib/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Form, Input, Typography, Button, Flex, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, LoginFormValues } from "../model/validateSchema";
import { useAppDispatch } from "@/shared/hooks";
import { loginUser } from "@/entities/User";

const { Title } = Typography;

function LoginPage() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormValues) => {
    logToFile("Выполнен вход в систему");
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (err) {
      messageApi.error("Ошибка авторизации");
      console.error("Ошибка авторизации: ", err);
    }
  };

  return (
    <Flex vertical style={{ width: 400, margin: "auto" }}>
      {contextHolder}
      <Title level={1} style={{ marginBottom: 32 }}>
        Вход в систему
      </Title>

      <Form size="large" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Email"
          required
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Пароль"
          required
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Flex justify="space-between" align="center">
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Войти
          </Button>
          <p>
            Нет аккаунта?{" "}
            <Link to="/register" style={{ color: "#1677ff" }}>
              Зарегистрироваться
            </Link>
          </p>
        </Flex>
      </Form>
    </Flex>
  );
}

export default LoginPage;
