import { ReactNode } from "react";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/shared/config";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
}
