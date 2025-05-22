import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  price: z.number().min(0, "Поле не может быть пустым"),
  photos: z.array(z.any()),
});

export type FormValues = z.infer<typeof formSchema>;
