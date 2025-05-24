import { Alert, Button, Flex } from "antd";
import { Roles } from "@/shared/config";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { IListingItem } from "@/entities/Listings/model/types";
import React from "react";

interface AdActionsPanelProps {
  adItem: IListingItem;
  id: number | null;
  role: string | null;
  handleFavoriteClick: () => void;
  handleUnFavoriteClick: () => void;
  handleDeleteClick: () => void;
  handleEditClick: () => void;
  handleApproveClick: () => void;
  handleRejectClick: () => void;
  isLoading: boolean;
}

const AdActionsPanel: React.FC<AdActionsPanelProps> = ({
  adItem,
  id,
  role,
  handleFavoriteClick,
  handleUnFavoriteClick,
  handleDeleteClick,
  handleEditClick,
  handleApproveClick,
  handleRejectClick,
  isLoading,
}) => {
  const isAuthor = adItem.author.id === id;
  const isModerator = role === Roles.MODERATOR;

  return (
    <Flex gap={12} vertical>
      {(isAuthor || isModerator) && (
        <>
          {adItem.status === "rejected" && (
            <Alert message="Объявление отклонено" type="error" showIcon />
          )}
          {adItem.status === "active" && (
            <Alert message="Объявление активно" type="success" showIcon />
          )}
          {adItem.status === "pending" && (
            <Alert message="Объявление на модерации" type="warning" showIcon />
          )}
        </>
      )}

      {isAuthor && (
        <>
          <Button type="primary" onClick={handleEditClick}>
            Редактировать
          </Button>
          <Button
            color="danger"
            variant="outlined"
            onClick={handleDeleteClick}
            loading={isLoading}
          >
            Удалить
          </Button>
        </>
      )}

      {isModerator && adItem.status === "pending" && (
        <>
          <Button
            type="primary"
            loading={isLoading}
            onClick={handleApproveClick}
          >
            Одобрить
          </Button>
          <Button
            color="danger"
            variant="outlined"
            loading={isLoading}
            onClick={handleRejectClick}
          >
            Отклонить
          </Button>
        </>
      )}

      {!isModerator &&
        !isAuthor &&
        (!adItem.is_favorite ? (
          <Button
            icon={<HeartOutlined />}
            onClick={handleFavoriteClick}
            loading={isLoading}
          >
            В избранное
          </Button>
        ) : (
          <Button
            color="danger"
            variant="outlined"
            icon={<HeartTwoTone twoToneColor="#FF0000" />}
            onClick={handleUnFavoriteClick}
            loading={isLoading}
          >
            Убрать из избранного
          </Button>
        ))}
    </Flex>
  );
};

export default AdActionsPanel;
