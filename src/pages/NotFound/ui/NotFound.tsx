import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Result
        style={{ width: 600 }}
        status="404"
        title="404"
        subTitle="Страница, которую вы ищете, не найдена. Возможно, она была удалена, переименована или никогда не существовала."
        extra={
          <Button size="large" type="primary" onClick={() => navigate("/")}>
            На главную
          </Button>
        }
      />
    </Flex>
  );
}

export default NotFound;
