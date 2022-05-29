import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Avatar } from "antd";
import { Menu, Layout, Typography } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import {
  UserOutlined,
  DashboardOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Sider, Header } = Layout;
const { Title } = Typography;

class FabricantComp extends Component {
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
      .FabricantName()
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
          <h5 style={{ color: "white" }}>Fabricant : {this.state.result}</h5>
          <br />
          <Menu theme="dark" mode="inline">
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <NavLink to="dashboard" />
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<UserAddOutlined />}>
              <NavLink to="Ajouter_un_medicament" />
              Ajouter un medicament
            </Menu.Item>
            <Menu.Item key="3" icon={<UserAddOutlined />}>
              <NavLink to="Liste_des_medicaments" />
              Liste des medicaments
            </Menu.Item>
            <Menu.Item key="4" icon={<UserAddOutlined />}>
              <NavLink to="Ajouter_une_demande" />
              Ajouter une demande
            </Menu.Item>
            <Menu.Item key="5" icon={<UserAddOutlined />}>
              <NavLink to="Liste_des_demandes_envoyees" />
              Liste des demandes
            </Menu.Item>
            <Menu.Item key="6" icon={<UserAddOutlined />}>
              <NavLink to="Transporteurs_disponibles" />
              Transporteurs disponibles
            </Menu.Item>
            <Menu.Item key="7" icon={<UserAddOutlined />}>
              <NavLink to="Pharmaciens_disponible" />
              Pharmaciens disponibles
            </Menu.Item>
          </Menu>
        </Sider>
        <Outlet />
      </>
    );
  }
}
export default FabricantComp;
