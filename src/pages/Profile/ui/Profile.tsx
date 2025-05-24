import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input, Typography, Button, Flex, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  profileSchema,
  ProfileFormValues,
  changePasswordSchema,
  ChangePasswordFormValues,
} from "../model/validateSchema";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import {
  getUser,
  getUserInfo,
  editUser,
  changePassword,
} from "@/entities/User";
import { resetStore } from "@/shared/store";
import { useEffect } from "react";

const { Title } = Typography;

function Profile() {
  const dispatch = useAppDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const userInfo = useAppSelector(getUserInfo);

  // Основная форма профиля
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      last_name: userInfo.last_name || "",
      first_name: userInfo.first_name || "",
      middle_name: userInfo.middle_name || "",
      email: userInfo.email || "",
      phone_number: userInfo.phone_number || "",
    },
    mode: "onBlur",
  });

  // Форма смены пароля
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPasswordForm,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    reset({
      last_name: userInfo.last_name || "",
      first_name: userInfo.first_name || "",
      middle_name: userInfo.middle_name || "",
      email: userInfo.email || "",
      phone_number: userInfo.phone_number || "",
    });
  }, [userInfo, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await dispatch(
        editUser({
          last_name: data.last_name,
          first_name: data.first_name,
          middle_name: data.middle_name,
          email: data.email,
          phone_number: data.phone_number,
        })
      ).unwrap();
      messageApi.success("Данные успешно обновлены");
    } catch {
      messageApi.error("Ошибка обновления профиля");
    }
  };

  const onChangePassword = async (data: ChangePasswordFormValues) => {
    try {
      await dispatch(
        changePassword({
          old_password: data.old_password,
          new_password: data.new_password,
          confirm_password: data.confirm_password,
        })
      ).unwrap();
      messageApi.success("Пароль успешно изменён");
      resetPasswordForm();
    } catch {
      messageApi.error("Ошибка смены пароля");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetStore());
  };

  return (
    <Flex vertical style={{ margin: "auto" }}>
      {contextHolder}
      <Flex justify="space-between" align="end" style={{ marginBottom: 32 }}>
        <Title level={1}>Личный кабинет</Title>
        <Button size="large" danger onClick={handleLogout} type="default">
          Выйти
        </Button>
      </Flex>
      <Flex gap={64}>
        <Form size="large" layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Flex style={{ maxWidth: 500 }} vertical>
            <Flex gap={24}>
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

            <Flex gap={24}>
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
          </Flex>

          <Form.Item style={{ marginTop: 24 }}>
            <Flex align="center">
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                disabled={!isDirty}
              >
                Сохранить
              </Button>
            </Flex>
          </Form.Item>
        </Form>

        <Form
          layout="vertical"
          size="large"
          onFinish={handlePasswordSubmit(onChangePassword)}
        >
          <Flex style={{ maxWidth: 250 }} vertical>
            <Form.Item
              label="Старый пароль"
              required
              validateStatus={passwordErrors.old_password ? "error" : ""}
              help={passwordErrors.old_password?.message}
              style={{ flex: 1 }}
            >
              <Controller
                name="old_password"
                control={passwordControl}
                render={({ field }) => <Input.Password {...field} />}
              />
            </Form.Item>

            <Form.Item
              label="Новый пароль"
              required
              validateStatus={passwordErrors.new_password ? "error" : ""}
              help={passwordErrors.new_password?.message}
              style={{ flex: 1 }}
            >
              <Controller
                name="new_password"
                control={passwordControl}
                render={({ field }) => <Input.Password {...field} />}
              />
            </Form.Item>

            <Form.Item
              label="Подтверждение нового пароля"
              required
              validateStatus={passwordErrors.confirm_password ? "error" : ""}
              help={passwordErrors.confirm_password?.message}
              style={{ flex: 1 }}
            >
              <Controller
                name="confirm_password"
                control={passwordControl}
                render={({ field }) => <Input.Password {...field} />}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={isPasswordSubmitting}
              style={{ marginTop: 8 }}
            >
              Сменить пароль
            </Button>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
}

export default Profile;
