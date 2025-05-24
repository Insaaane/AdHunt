import {
  deleteListing,
  favoriteListing,
  getCurrentListingItemInfo,
  getListingItem,
  getListingsPostStatus,
  getListingsRequestStatus,
  postModerationStatus,
  unFavoriteListing,
} from "@/entities/Listings";
import { getUserInfo } from "@/entities/User";
import { NotFoundInner } from "@/pages/NotFound";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { Gallery } from "@/widgets/Gallery";
import { AdActionsPanel } from "@/widgets/AdActionsPanel";
import { Flex, Spin, Typography, message } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const { Title, Text } = Typography;

function AdItemPage() {
  const dispatch = useAppDispatch();
  const { adId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isGetLoading = useAppSelector(getListingsRequestStatus).isLoading;
  const isPostLoading = useAppSelector(getListingsPostStatus).isLoading;

  const adItem = useAppSelector(getCurrentListingItemInfo);
  const userInfo = useAppSelector(getUserInfo);
  const { id, role } = userInfo;
  const isAuthenticated = !!localStorage.getItem("token");
  const [messageApi, contextHolder] = message.useMessage();

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      await dispatch(favoriteListing(adId!)).unwrap();
      messageApi.success({ content: "Добавлено в избранное", key: "favorite" });
    } catch {
      messageApi.error({
        content: "Ошибка при добавлении в избранное",
        key: "favorite",
      });
    }
  };

  const handleUnFavoriteClick = async () => {
    try {
      await dispatch(unFavoriteListing(adId!)).unwrap();
      messageApi.success({ content: "Удалено из избранного", key: "favorite" });
    } catch {
      messageApi.error({
        content: "Ошибка при удалении из избранного",
        key: "favorite",
      });
    }
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteListing(adId!)).unwrap();
      messageApi.success({
        content: "Объявление успешно удалено",
        key: "delete",
      });
      navigate("/my-ads", { replace: true });
    } catch {
      messageApi.error({
        content: "Ошибка при удалении объявления",
        key: "delete",
      });
    }
  };

  const handleApproveClick = async () => {
    const newData = {
      data: {
        status: "active",
      },
      id: adId!,
    };

    try {
      await dispatch(postModerationStatus(newData)).unwrap();
      messageApi.success({
        content: "Объявление успешно одобрено",
        key: "approve",
      });
      navigate("/moderation", { replace: true });
    } catch {
      messageApi.error({
        content: "Ошибка при одобрении объявления",
        key: "approve",
      });
    }
  };

  const handleRejectClick = async () => {
    const newData = {
      data: {
        status: "rejected",
      },
      id: adId!,
    };

    try {
      await dispatch(postModerationStatus(newData)).unwrap();
      messageApi.success({
        content: "Объявление успешно отклонено",
        key: "reject",
      });
      navigate("/moderation", { replace: true });
    } catch {
      messageApi.error({
        content: "Ошибка при отклонении объявления",
        key: "reject",
      });
    }
  };

  const handleEditClick = async () => {
    navigate(`/editAd/${adId}`);
  };

  useEffect(() => {
    dispatch(getListingItem(adId!));
  }, [dispatch, adId]);

  if (isGetLoading) {
    return <Spin style={{ margin: "auto" }} size="large" />;
  }

  if (!adItem) {
    return (
      <NotFoundInner desc="Объявление, которое вы ищете, не найдено. Возможно, оно было удалено или никогда не существовала." />
    );
  }

  return (
    <Flex vertical>
      {contextHolder}
      <Title level={1} style={{ marginBottom: 32 }}>
        {adItem.title}
      </Title>

      <Flex gap={32} style={{ marginBottom: 32 }}>
        <Gallery adItem={adItem} />

        <Flex style={{ width: 300 }} vertical justify="space-between">
          <AdActionsPanel
            adItem={adItem}
            id={id}
            role={role}
            handleFavoriteClick={handleFavoriteClick}
            handleUnFavoriteClick={handleUnFavoriteClick}
            handleDeleteClick={handleDeleteClick}
            handleEditClick={handleEditClick}
            handleApproveClick={handleApproveClick}
            handleRejectClick={handleRejectClick}
            isLoading={isPostLoading}
          />

          <Flex vertical gap={24}>
            <Flex vertical>
              <Title style={{ marginBottom: 16 }} level={3}>
                Контакты
              </Title>
              <Text copyable style={{ fontSize: 16 }}>
                Email: {adItem.author.email}
              </Text>
              <Text copyable style={{ fontSize: 16 }}>
                Телефон: {adItem.author.phone_number}
              </Text>
            </Flex>

            <Flex justify="space-between" align="center">
              <Title level={3}>Цена</Title>
              <Text style={{ fontSize: 24 }} strong>
                {adItem.price} ₽
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <div style={{ marginLeft: 110, maxWidth: 810 }}>
        <Title level={2} style={{ marginBottom: 16 }}>
          Описание
        </Title>
        <Text style={{ maxWidth: 800, fontSize: 18, whiteSpace: "pre-wrap" }}>
          {adItem.description}
        </Text>
      </div>
    </Flex>
  );
}

export default AdItemPage;
