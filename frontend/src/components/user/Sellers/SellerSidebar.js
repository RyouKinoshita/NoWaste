import React from "react";
import { Link } from "react-router-dom";
import { Sidenav, Nav, Toggle, Grid, Col, Dropdown } from "rsuite";
import DashboardIcon from "@rsuite/icons/legacy/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import ProductIcon from "@rsuite/icons/legacy/ProductHunt";
import OrdersIcon from "@rsuite/icons/legacy/OrderForm";
import ArticlesIcon from "@rsuite/icons/legacy/Pencil";
import "rsuite/dist/rsuite.min.css";

const SellerSidebar = () => {
  const [activeKey, setActiveKey] = React.useState("1");
  return (
    <Grid fluid>
      <Col xs={30} md={20}>
        <Sidenav defaultOpenKeys={[]} appearance="subtle">
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item icon={<DashboardIcon />}>
                <Link to="/sellerdashboard" className="nav-link">
                  Dashboard
                </Link>
              </Nav.Item>
              <Dropdown.Separator />
              <Nav.Item icon={<ProductIcon />}>
                <Link to="/sellerproductslist" className="nav-link">
                  Products
                </Link>
              </Nav.Item>
              <Dropdown.Separator />
              <Nav.Item icon={<OrdersIcon />}>
                <Link to="/admin/orderslist" className="nav-link">
                  Orders
                </Link>
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </Col>
    </Grid>
  );
};

export default SellerSidebar;
