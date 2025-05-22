import { logToFile } from "@/shared/lib/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Form, Input, Typography, Button, Flex } from "antd";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterFormValues } from "../model/validateSchema";

const { Title } = Typography;

function RegisterPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      patronymic: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: RegisterFormValues) => {
    console.log("Registration Data:", data);
    logToFile("Выполнена регистрация нового пользователя");
  };

  return (
    <Flex vertical style={{ maxWidth: 600, margin: "auto" }}>
      <Title level={1} style={{ marginBottom: 32 }}>
        Регистрация
      </Title>

      <Form size="large" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Flex gap={24} wrap>
          <Form.Item
            label="Фамилия"
            required
            validateStatus={errors.lastName ? "error" : ""}
            help={errors.lastName?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Имя"
            required
            validateStatus={errors.firstName ? "error" : ""}
            help={errors.firstName?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Отчество"
            validateStatus={errors.patronymic ? "error" : ""}
            help={errors.patronymic?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="patronymic"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Flex>

        <Flex gap={24} wrap>
          <Form.Item
            label="Email"
            required
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Телефон"
            required
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Flex>

        <Flex gap={24} wrap>
          <Form.Item
            label="Пароль"
            required
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Подтверждение пароля"
            required
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>
        </Flex>

        <Form.Item style={{ marginTop: 24 }}>
          <Flex justify="space-between" align="center">
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            <p>
              Уже есть аккаунт?{" "}
              <Link to="/login" style={{ color: "#1677ff" }}>
                Войти
              </Link>
            </p>
          </Flex>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default RegisterPage;
