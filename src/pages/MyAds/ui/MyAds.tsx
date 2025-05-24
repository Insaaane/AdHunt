import {
  getListingsRequestStatus,
  getUserListings,
  getUserActiveListings,
  getUserPendingListings,
  getUserRejectedListings,
  TListingStatus,
} from "@/entities/Listings";
import { NotFoundInner } from "@/pages/NotFound";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { AdCard } from "@/widgets/AdCard";
import { Flex, Radio, Spin, Typography } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;

function MyAds() {
  const [status, setStatus] = useState<TListingStatus>("active");

  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(getListingsRequestStatus);

  const adsList = useAppSelector(
    status === "active"
      ? getUserActiveListings
      : status === "pending"
      ? getUserPendingListings
      : getUserRejectedListings
  );

  useEffect(() => {
    dispatch(getUserListings());
  }, [dispatch]);

  return (
    <>
      <Flex
        justify="space-between"
        align="end"
        gap={24}
        style={{ width: "100%", marginBottom: 32 }}
      >
        <Title level={1}>Мои объявления</Title>

        <Radio.Group
          size="large"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <Radio.Button value="active">Активные</Radio.Button>
          <Radio.Button value="pending">На модерации</Radio.Button>
          <Radio.Button value="rejected">Отклонены</Radio.Button>
        </Radio.Group>
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

export default MyAds;
