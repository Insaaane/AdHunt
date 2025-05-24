import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router-dom";

interface Props {
  desc: string;
  isReload?: boolean;
}

function NotFoundInner({ desc, isReload }: Props) {
  const navigate = useNavigate();

  const extra = isReload ? (
    <Button size="large" type="primary" onClick={() => location.reload()}>
      Обновить
    </Button>
  ) : (
    <Button size="large" type="primary" onClick={() => navigate("/")}>
      На главную
    </Button>
  );

  return (
    <Flex style={{ margin: "auto" }}>
      <Result
        style={{ width: 600 }}
        status="404"
        title="404"
        subTitle={desc}
        extra={extra}
      />
    </Flex>
  );
}

export default NotFoundInner;
