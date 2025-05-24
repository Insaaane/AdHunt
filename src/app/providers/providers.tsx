import { ReactNode } from "react";
import { store } from "../stores";

import { ConfigProvider } from "antd";
import { themeConfig } from "@/shared/config";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <ConfigProvider
        message={{ style: { marginTop: 75 } }}
        theme={themeConfig}
      >
        {children}
      </ConfigProvider>
    </Provider>
  );
}
