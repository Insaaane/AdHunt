import { Card, Typography, Watermark } from "antd";
import React from "react";
import cls from "./AdCard.module.css";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";
import { IListingItem } from "@/entities/Listings/model/types";
import { useNavigate } from "react-router-dom";

interface Props {
  item: IListingItem;
}

const { Text, Paragraph } = Typography;

function AdCard({ item }: Props) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");

  const { id, description, title, price, images, is_favorite } = item;

  const image = images[0] ? images[0].image : "";

  const actions =
    isAuth === null
      ? [
          <Text strong={!!price}>
            {price ? `${price} ₽` : "Цена не указана"}
          </Text>,
        ]
      : [
          <Text strong={!!price}>
            {price ? `${price} ₽` : "Цена не указана"}
          </Text>,
          <>
            {is_favorite ? (
              <HeartTwoTone twoToneColor="#FF0000" key="favourites" />
            ) : (
              <HeartOutlined />
            )}
          </>,
        ];

  return (
    <Card
      hoverable
      style={{ width: 320 }}
      cover={
        <div className={cls.imgContainer}>
          {image ? (
            <img src={image} alt="Изображение карточки объявления" />
          ) : (
            <Watermark gap={[30, 50]} zIndex={0} content="No image">
              <div style={{ height: 230 }} />
            </Watermark>
          )}
        </div>
      }
      actions={actions}
      onClick={() => navigate(`/ads/${id}`)}
    >
      <Card.Meta
        title={title}
        description={
          <Paragraph style={{ marginBottom: 0 }} type="secondary" ellipsis>
            {description}
          </Paragraph>
        }
      />
    </Card>
  );
}

export default React.memo(AdCard);
