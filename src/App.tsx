import { PasswordGdprForm } from "./components";
import { ConfigProvider } from "antd";
import { app } from "./config";
import { mockApi } from "./data";

import "./App.less";

// turn on mocked API if that specified in config
if (app.mockedApi) {
  mockApi();
}

const App = () => (
  <ConfigProvider>
    <PasswordGdprForm redirectUrl={app.redirectUrl} />
  </ConfigProvider>
);

export default App;
