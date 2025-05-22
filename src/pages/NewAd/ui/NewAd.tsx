import { logToFile } from "@/shared/lib/logger";
import { PlusOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image,
  Form,
  Input,
  Typography,
  Upload,
  UploadFile,
  Button,
  InputNumber,
  Flex,
} from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formSchema, FormValues } from "../model/validateSchema";
import { FileType, getBase64 } from "../lib/file";
import { MAX_IMAGES_COUNT } from "../config/const";

const { Title } = Typography;

function NewAd() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      photos: [],
    },
    mode: "onBlur",
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);

    logToFile("Открыл превью изображения");
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", {
      ...data,
      photos: data.photos?.map((file) => file.originFileObj || file),
    });

    logToFile("Отправил объявление на модерацию");
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Добавить</div>
    </button>
  );

  return (
    <Flex vertical style={{ width: 600, margin: "auto" }}>
      <Title level={1} style={{ marginBottom: 32 }}>
        Новое объявление
      </Title>

      <Form size="large" layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Заголовок"
          required
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Описание"
          required
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={2} {...field} />}
          />
        </Form.Item>

        <Form.Item
          label="Цена"
          required
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
        >
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                onChange={(value) => field.onChange(value ?? 0)}
                prefix="₽"
                style={{ width: "100%" }}
                min={0}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Фотографии"
          validateStatus={errors.photos ? "error" : ""}
          help={errors.photos?.message}
        >
          <Controller
            name="photos"
            control={control}
            render={({ field }) => (
              <Upload
                beforeUpload={() => false}
                accept="image/*"
                listType="picture-card"
                fileList={field.value}
                maxCount={MAX_IMAGES_COUNT}
                onPreview={handlePreview}
                onChange={({ fileList: newFileList }) =>
                  field.onChange(newFileList)
                }
              >
                {field.value?.length >= MAX_IMAGES_COUNT ? null : uploadButton}
              </Upload>
            )}
          />
        </Form.Item>

        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            Отправить на модерацию
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
}

export default NewAd;
