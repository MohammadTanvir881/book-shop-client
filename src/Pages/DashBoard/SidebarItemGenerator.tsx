import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "./sidebarTyoes";

const SidebarItemsGenerator = (sidebarItems: TUserPath[], role: string) => {
  const SidebarItems = sidebarItems.reduce((acc: TSidebarItem[], item) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/dash-board/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if(child.name){ return {
            key: child.name,
            label: (
              <NavLink to={`/dash-board/${child.path}`}>{child.name}</NavLink>
            ),
          };}
         
        }),
      });
    }

    return acc;
  }, []);
  return SidebarItems;
};

export default SidebarItemsGenerator;
