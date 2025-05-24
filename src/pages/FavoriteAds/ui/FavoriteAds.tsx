import {
  getListingsRequestStatus,
  getFavoriteListings,
  getFavoriteListingsInfo,
} from "@/entities/Listings";
import { NotFoundInner } from "@/pages/NotFound";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { AdCard } from "@/widgets/AdCard";
import { Flex, Spin, Typography } from "antd";
import { useEffect } from "react";

const { Title } = Typography;

function MyAds() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(getListingsRequestStatus);

  const adsList = useAppSelector(getFavoriteListingsInfo);

  useEffect(() => {
    dispatch(getFavoriteListings());
  }, [dispatch]);

  return (
    <>
      <Title level={1} style={{ width: "100%", marginBottom: 32 }}>
        Избранные объявления
      </Title>

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

export default MyAds;
