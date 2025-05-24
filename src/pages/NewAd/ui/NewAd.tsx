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
  message,
} from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { formSchema, FormValues } from "../model/validateSchema";
import { FileType, getBase64 } from "../lib/file";
import { MAX_IMAGES_COUNT } from "../config/const";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import {
  createNewListing,
  editListing,
  getCurrentListingItemInfo,
  getListingItem,
} from "@/entities/Listings";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

function NewAd() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const { adId } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const adItem = useAppSelector(getCurrentListingItemInfo);

  const [initialImageIds, setInitialImageIds] = useState<number[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
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

  useEffect(() => {
    if (adId) {
      dispatch(getListingItem(adId));
    }
  }, [dispatch, adId]);

  useEffect(() => {
    if (adId && adItem) {
      const mappedImages = adItem.images.map((img) => ({
        uid: String(img.id),
        name: `image-${img.id}`,
        status: "done",
        url: img.image,
      }));
      setValue("photos", mappedImages);
      setInitialImageIds(adItem.images.map((img) => img.id));
      setValue("title", adItem.title || "");
      setValue("description", adItem.description || "");
      setValue("price", Number(adItem.price) || 0);
    }
  }, [adId, adItem, setValue]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", String(data.price));

    data.photos?.forEach((file) => {
      if (!file.url && file.originFileObj) {
        formData.append("images", file.originFileObj);
      }
    });

    const removedImageIds = initialImageIds.filter(
      (id) => !data.photos?.some((f) => String(id) === f.uid && !!f.url)
    );
    removedImageIds.forEach((id) => {
      formData.append("deleted_images", String(id));
    });

    try {
      if (adId) {
        await dispatch(editListing({ id: adId, data: formData })).unwrap();
        messageApi.success({
          content: "Объявление успешно обновлено",
          key: "ad",
        });
        setTimeout(() => navigate(`/ads/${adId}`), 1000);
      } else {
        const result = await dispatch(createNewListing(formData)).unwrap();
        messageApi.success({
          content: "Объявление успешно создано и отправлено на модерацию",
          key: "ad",
        });
        reset();
        setTimeout(() => navigate(`/ads/${result.id}`), 1000);
      }
    } catch {
      messageApi.error({
        content: adId
          ? "Ошибка при обновлении объявления"
          : "Ошибка при создании объявления",
        key: "ad",
      });
    }
  };

  const handleCancel = () => {
    if (adId) {
      navigate(`/ads/${adId}`);
    } else {
      if (location.state && location.state.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Добавить</div>
    </button>
  );

  return (
    <Flex vertical style={{ width: 600, margin: "auto" }}>
      {contextHolder}
      <Title level={1} style={{ marginBottom: 32 }}>
        {adId ? "Редактировать объявление" : "Новое объявление"}
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
                onChange={({ fileList: newFileList }) => {
                  field.onChange(newFileList);
                  console.log(newFileList);
                }}
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

        <Flex justify="space-between" gap={12}>
          <Button
            variant="outlined"
            color="danger"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {adId ? "Сохранить" : "Отправить на модерацию"}
          </Button>
        </Flex>
      </Form>
    </Flex>
  );
}

export default NewAd;
