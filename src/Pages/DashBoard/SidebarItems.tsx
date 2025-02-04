import { Button, Layout, Menu } from 'antd';
import { useAppSelector } from '@/Redux/feature/hook';
import { useCurrentUser } from '@/Redux/feature/Auth/authSlice';
import SidebarItemsGenerator from './SidebarItemGenerator';
import { adminPaths, userPaths } from './admin.routes';
import { Link } from 'react-router-dom';


const { Sider } = Layout;
const userRole = {
  ADMIN: "admin",
  USER: "user",
};

const SidebarItems = () => {

    const user = useAppSelector(useCurrentUser);
    console.log(user)

    let sidebarItems;

    switch (user!.role) {
      case userRole.ADMIN:
        sidebarItems = SidebarItemsGenerator(adminPaths, userRole.ADMIN);
        break;
      case userRole.USER:
        sidebarItems = SidebarItemsGenerator(userPaths, userRole.USER);
        break;
  
      default:
        break;
    }

    return (
        <Sider
        style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
       <Link to="/"> <Button className='bg-green-400 w-full text-white border-none mt-5'>Return Home</Button></Link>
      </Sider>
    );
};

export default SidebarItems;