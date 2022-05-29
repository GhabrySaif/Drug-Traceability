import React from "react";
import { Button, Form, message, Layout, Typography } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
const { Title } = Typography;

const LoginComp = (props) => {
  const contract = props.contract;
  const accounts = props.accounts;
  const navigate = useNavigate();

  const checkAdmin = async () => {
    let result = await contract.methods
      .isAdminExists()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        localStorage.setItem("loggedas", JSON.stringify("administrateur"));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("Administrateur/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };
  const checkFabricant = async () => {
    let result = await contract.methods
      .isFabricantExists()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        localStorage.setItem("loggedas", JSON.stringify("Fabricant"));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("Fabricant/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };

  const checkTransporteur = async () => {
    let result = await contract.methods
      .isTransporteurExists()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        localStorage.setItem("loggedas", JSON.stringify("transporteur"));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("Transporteur/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };

  const checkPharmacien = async () => {
    let result = await contract.methods
      .isPharmacienExists()
      .call({ from: accounts[0] });
    if (result === "true") {
      setTimeout(() => {
        localStorage.setItem("isloggedin", JSON.stringify(true));
        localStorage.setItem("loggedas", JSON.stringify("pharmacien"));
        message.success("C'est parti !");
      }, 500);
      setTimeout(() => {
        navigate("Pharmacien/dashboard");
      }, 1000);
    } else {
      setTimeout(() => {
        message.error("Ce compte n'existe pas.");
      }, 1000);
    }
  };

  return (
    <div className="back">
      <Header style={{ zIndex: 1, width: "100%", backgroundColor: "#20232a" }}>
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
      </Header>
      <br />
      <br />
      <br />
      <h1>Bienvenue</h1> <br />
      <br />
      <h2>Connecter en tant que</h2>
      <Form>
        <Button
          shape={"round"}
          className="button1"
          type="primary"
          size={"large"}
          onClick={checkAdmin}
        >
          Administrateur
        </Button>
        <Button
          shape={"round"}
          className="button1"
          type="primary"
          size={"large"}
          onClick={checkFabricant}
        >
          Fabricant
        </Button>
        <Button
          shape={"round"}
          className="button1"
          type="primary"
          size={"large"}
          onClick={checkTransporteur}
        >
          Transporteur
        </Button>
        <Button
          shape={"round"}
          className="button1"
          type="primary"
          size={"large"}
          onClick={checkPharmacien}
        >
          Pharmacien
        </Button>
      </Form>
    </div>
  );
};

export default LoginComp;
