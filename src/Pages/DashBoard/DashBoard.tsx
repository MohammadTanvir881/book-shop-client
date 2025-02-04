
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import SidebarItems from "./SidebarItems";

const { Header, Content, Footer, Sider } = Layout;



const DashBoard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
   
    <Layout>
      <SidebarItems></SidebarItems>
      <Layout style={{ height: "100%" }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content  style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
