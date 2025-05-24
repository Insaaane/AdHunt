import {
  getListingsRequestStatus,
  getModerateInfo,
  getModerationList,
} from "@/entities/Listings";
import { NotFoundInner } from "@/pages/NotFound";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { resetStore } from "@/shared/store";
import { AdCard } from "@/widgets/AdCard";
import { Button, Flex, Spin, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Moderation() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading } = useAppSelector(getListingsRequestStatus);

  const adsList = useAppSelector(getModerateInfo);

  useEffect(() => {
    dispatch(getModerationList());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetStore());
    navigate("/login");
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="end"
        style={{ marginBottom: 32, width: "100%" }}
      >
        <Title level={1}>Объявления на модерацию</Title>
        <Button size="large" danger onClick={handleLogout} type="default">
          Выйти
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

export default Moderation;
