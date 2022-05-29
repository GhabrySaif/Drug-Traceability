import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { NavLink, Outlet } from "react-router-dom";
import { Layout, Menu, Typography, Avatar } from "antd";
import {
  UserOutlined,
  UserAddOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import LogoutButton from "../LogoutButton/LogoutButton";

const { Sider, Header } = Layout;
const { Title } = Typography;

class AdministrateurComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    const result = await this.contract.methods
      .AdministrateurName()
      .call({ from: this.accounts[0] });
    this.setState({ result });
  };

  render() {
    return (
      <>
        <Header
          style={{
            zIndex: 1,
            width: "100%",
            backgroundColor: "#20232a",
            position: "fixed",
          }}
        >
          <img
            style={{ float: "left", width: "60px", height: "60px" }}
            alt=""
            src="/favicon.png"
            width="35"
            height="35"
            className="d-inline-block align-top"
          />
          <Title
            level={3}
            style={{
              position: "relative",
              color: "white",
              float: "left",
              top: "15px",
              marginLeft: "7px",
            }}
          >
            Drug Traceability
          </Title>
          <LogoutButton></LogoutButton>
        </Header>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: "64px",
            bottom: 0,
          }}
          width={"255px"}
        >
          <br />
          <Avatar size={90} icon={<UserOutlined />} />
          <br />
          <br />
          <h5 style={{ color: "white" }}>
            Administrateur : {this.state.result}
          </h5>
          <br />
          <Menu theme="dark" mode="inline">
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <NavLink to="dashboard" />
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}>
              <NavLink to="editFabricant" />
              Fabricant
            </Menu.Item>
            <Menu.Item key="3" icon={<UserAddOutlined />}>
              <NavLink to="editTransporteur" />
              Transporteur
            </Menu.Item>
            <Menu.Item key="4" icon={<UserAddOutlined />}>
              <NavLink to="editPharmacien" />
              Pharmacien
            </Menu.Item>
          </Menu>
        </Sider>
        <Outlet />
      </>
    );
  }
}
export default AdministrateurComp;
