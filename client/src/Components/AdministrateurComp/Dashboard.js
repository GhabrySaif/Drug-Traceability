import React from "react";
import { Card } from "antd";
import "rsuite/styles/index.less";
function Dashboard() {
  return (
    <Card
      style={{
        position: "relative",
        width: "80%",
        left: "265px",
        top: "70px",
        borderRadius: "7px",
      }}
    >
      <h1>Bienvenue !</h1>
    </Card>
  );
}

export default Dashboard;
