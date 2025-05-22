import { Roles } from "@/shared/config";
import { adsWithFavorite, adsWithoutFavorite } from "@/shared/config/mock";
import { AdCard } from "@/widgets/AdCard";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";

const { Title } = Typography;

function MainPage() {
  const role = Roles.MODERATOR;
  const token = "gff";

  const isModerator = token && role === Roles.MODERATOR;
  const isUser = token && role === Roles.USER;

  const ads = isUser ? adsWithFavorite : adsWithoutFavorite;

  return (
    <>
      <Flex
        justify="space-between"
        align="end"
        gap={24}
        style={{ width: "100%", marginBottom: 32 }}
      >
        <Title level={1}>
          {isModerator ? "Объявления на модерацию" : "Объявления"}
        </Title>
        <Input.Search
          style={{ maxWidth: 600 }}
          placeholder="Поиск объявлений..."
          allowClear
          enterButton="Поиск"
          size="large"
          onSearch={(value) => console.log(value)}
        />
        <Button icon={<FilterOutlined />} size="large">
          Фильтры и сортировка
        </Button>
      </Flex>

      <Flex wrap gap={24} justify="center">
        {ads.map((item, index) => (
          <AdCard
            key={index}
            title={item.title}
            description={item.description}
            img={item.img}
            cost={item.cost}
            isFavorite={item.isFavorite}
          />
        ))}
      </Flex>
    </>
  );
}

export default MainPage;
