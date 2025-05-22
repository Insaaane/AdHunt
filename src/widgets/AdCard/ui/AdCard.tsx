import { Card, Typography } from "antd";
import React from "react";
import cls from "./AdCard.module.css";
import { HeartOutlined, HeartTwoTone } from "@ant-design/icons";

interface Props {
  title: string;
  description: string;
  img: string;
  cost: number | null;
  isFavorite?: boolean;
}

const { Text, Paragraph } = Typography;

function AdCard({ title, description, img, cost, isFavorite }: Props) {
  const actions =
    isFavorite === undefined
      ? [<Text strong={!!cost}>{cost ? `${cost} ₽` : "Цена не указана"}</Text>]
      : [
          <Text strong={!!cost}>{cost ? `${cost} ₽` : "Цена не указана"}</Text>,
          <>
            {isFavorite ? (
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
          <img src={img} height={200} alt="Изображение карточки объявления" />
        </div>
      }
      actions={actions}
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
