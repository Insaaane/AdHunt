import { Layout, Menu } from "antd";
import cls from "./GlobalLayout.module.css";
import { Logo } from "@/shared/ui";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Roles } from "@/shared/config";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { logToFile } from "@/shared/lib/logger";

const { Header, Content, Footer } = Layout;

const commonItems = [{ key: "/", label: "Доска объявлений" }];

const unAuthItems: ItemType<MenuItemType>[] = [
  ...commonItems,
  { key: "auth", label: "Вход/Регистрация" },
];

const userItems: ItemType<MenuItemType>[] = [
  ...commonItems,
  { key: "/my-ads", label: "Мои объявления" },
  { key: "/newAd", label: "Разместить объявление" },
  { key: "/favorites", label: "Избранное" },
  { key: "/profile", label: "Личный кабинет" },
];

const moderatorItems: ItemType<MenuItemType>[] = [
  { key: "/moderation", label: "Модерация" },
  { key: "/profile", label: "Личный кабинет" },
];

function GlobalLayout() {
  const token = "ff";
  const role = Roles.MODERATOR;

  const navigate = useNavigate();
  const location = useLocation();

  const getSelectedKey = () => {
    const path = location.pathname;

    if (path === "/login" || path === "/register") return "auth";

    return path;
  };

  const handleMenuClick = (key: string) => {
    if (key === "auth") {
      navigate("/login");
      return;
    }
    navigate(key);
    logToFile(`Navigated to ${key}`);
  };

  const menuItems = token
    ? role === Roles.USER
      ? userItems
      : moderatorItems
    : unAuthItems;

  return (
    <Layout>
      <Header className={cls.header}>
        <img
          src={Logo}
          alt="Логотип AdHunt"
          width={160}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        <Menu
          className={cls.menu}
          theme="dark"
          mode="horizontal"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Header>
      <Content className={cls.content}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        AdHunt ©{new Date().getFullYear()} Created by Insaneee
      </Footer>
    </Layout>
  );
}

export default GlobalLayout;
