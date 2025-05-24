import { z } from "zod";

export const profileSchema = z.object({
  last_name: z.string().min(1, "Введите фамилию"),
  first_name: z.string().min(1, "Введите имя"),
  middle_name: z.string().optional(),
  email: z.string().email("Некорректный email"),
  phone_number: z
    .string()
    .regex(/^[+]?\d{11,15}$/, "Некорректный номер телефона"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    old_password: z.string().min(8, "Введите старый пароль"),
    new_password: z.string().min(8, "Минимум 8 символов"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Пароли не совпадают",
    path: ["confirm_password"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
