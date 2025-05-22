import { z } from "zod";

export const registerSchema = z
  .object({
    lastName: z.string().min(1, "Введите фамилию"),
    firstName: z.string().min(1, "Введите имя"),
    patronymic: z.string().optional(),
    email: z.string().email("Некорректный email"),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{10,14}$/, "Некорректный номер телефона"),
    password: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
