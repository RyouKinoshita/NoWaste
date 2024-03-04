import React from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav, Toggle } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import ProductIcon from "@rsuite/icons/legacy/ProductHunt";
import OrdersIcon from "@rsuite/icons/legacy/OrderForm";
import ArticlesIcon from "@rsuite/icons/legacy/Pencil";
import "rsuite/dist/rsuite.min.css";

const Sidebar = () => {
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <div style={{ width: 260, height: "100vh", overflowY: "auto" }}>
      <Sidenav defaultOpenKeys={["3", "4"]}>
        <Sidenav.Body>
          <Nav activeKey={activeKey} onSelect={setActiveKey}>
            <Nav.Item eventKey="1" icon={<DashboardIcon />}>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              <Link to="/admin/userslist" className="nav-link">
                User Group
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="1" icon={<ProductIcon />}>
              <Link to="/admin/productslist" className="nav-link">
                Products
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="1" icon={<OrdersIcon />}>
              <Link to="/admin/orderslist" className="nav-link">
                Orders
              </Link>
            </Nav.Item>
            <Nav.Item eventKey="1" icon={<ArticlesIcon />}>
              <Link to="/admin/articleslist" className="nav-link">
                Articles
              </Link>
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Sidebar;
