import { logToFile } from "@/shared/lib/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Form, Input, Typography, Button, Flex, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { registerSchema, RegisterFormValues } from "../model/validateSchema";
import { useAppDispatch } from "@/shared/hooks";
import { regUser } from "@/entities/User";

const { Title } = Typography;

function RegisterPage() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      last_name: "",
      first_name: "",
      middle_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    logToFile("Выполнена регистрация нового пользователя");
    try {
      await dispatch(regUser(data)).unwrap();
    } catch (err) {
      messageApi.error("Ошибка регистрации");
      console.error("Ошибка регистрации: ", err);
    }
  };

  return (
    <Flex vertical style={{ maxWidth: 600, margin: "auto" }}>
      {contextHolder}
      <Title level={1} style={{ marginBottom: 32 }}>
        Регистрация
      </Title>

      <Form size="large" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Flex gap={24} wrap>
          <Form.Item
            label="Фамилия"
            required
            validateStatus={errors.last_name ? "error" : ""}
            help={errors.last_name?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Имя"
            required
            validateStatus={errors.first_name ? "error" : ""}
            help={errors.first_name?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Отчество"
            validateStatus={errors.middle_name ? "error" : ""}
            help={errors.middle_name?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="middle_name"
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
            validateStatus={errors.phone_number ? "error" : ""}
            help={errors.phone_number?.message}
            style={{ flex: 1 }}
          >
            <Controller
              name="phone_number"
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
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
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
