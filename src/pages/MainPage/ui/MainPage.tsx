import {
  getListingsFull,
  getListingsFullInfo,
  getListingsRequestStatus,
} from "@/entities/Listings";
import { getUserInfo } from "@/entities/User";
import { NotFoundInner } from "@/pages/NotFound";
import { Roles } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { AdCard } from "@/widgets/AdCard";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

function MainPage() {
  const dispatch = useAppDispatch();
  const adsList = useAppSelector(getListingsFullInfo);
  const { isLoading } = useAppSelector(getListingsRequestStatus);
  const role = useAppSelector(getUserInfo).role;
  const token = localStorage.getItem("token");
  const isModerator = token && role === Roles.MODERATOR;
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getListingsFull(""));
  }, [dispatch]);

  const handleSearch = (value: string) => {
    dispatch(getListingsFull(value));
  };

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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        <Button icon={<FilterOutlined />} size="large">
          Фильтры и сортировка
        </Button>
      </Flex>

      {isLoading ? (
        <Spin style={{ margin: "auto" }} size="large" />
      ) : adsList.length ? (
        <Flex wrap gap={24} justify="center">
          {adsList.map((item, index) => (
            <AdCard key={index} item={item} />
          ))}
        </Flex>
      ) : (
        <NotFoundInner
          desc="Объявления не найдены. Попробуйте обновить страницу."
          isReload
        />
      )}
    </>
  );
}

export default MainPage;
