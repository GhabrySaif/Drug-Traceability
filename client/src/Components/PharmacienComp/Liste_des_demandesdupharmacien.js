import React, { Component } from "react";
import { Button, Card, Table, Space, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

class Listedesdemandesdupharmacien extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      dated: [],
      nommedicament: [],
      quantite: [],
      Tempmin: [],
      Tempmax: [],
      etatdelademande: [],
      etatdelacommande: [],
      Fabricantname: [],
      transporteurname: [],
      columns: [
        {
          title: "Nom du Fabricant",
          dataIndex: "NomduFabricant",
          align: ["center"],
        },

        {
          title: "Date de la demande",
          dataIndex: "Datedelademande",
          align: ["center"],
        },

        {
          title: "Nom du medicament",
          dataIndex: "Nomdumedicament",
          align: ["center"],
        },

        {
          title: "Quantité",
          dataIndex: "quantite",
          align: ["center"],
        },

        {
          title: "Temperature minimale",
          dataIndex: "Temperatureminimale",
          align: ["center"],
        },

        {
          title: "Temperature maxiamle",
          dataIndex: "Temperaturemaxiamle",
          align: ["center"],
        },

        {
          title: "Conditions",
          dataIndex: "condition",
          align: ["center"],
          render: (condition) => (
            <>
              {condition.map((tag) => {
                let color;
                if (tag === "en bonne conditions") {
                  color = "green";
                } else {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={condition}>
                    {condition}
                  </Tag>
                );
              })}
            </>
          ),
        },

        {
          title: "Etat de la Demande",
          dataIndex: "Etatdelademande",
          align: ["center"],
          render: (Etatdelademande) => (
            <>
              {Etatdelademande.map((tag) => {
                let color;
                if (tag === "en attente") {
                  color = "geekblue";
                } else if (tag === "Refusée") {
                  color = "volcano";
                } else {
                  color = "green";
                }
                return (
                  <Tag color={color} key={Etatdelademande}>
                    {Etatdelademande}
                  </Tag>
                );
              })}
            </>
          ),
        },

        {
          title: "Etat de la Commande",
          dataIndex: "EtatdelaCommande",
          align: ["center"],
          render: (EtatdelaCommande) => (
            <>
              {EtatdelaCommande.map((tag) => {
                let color;
                if (tag === "en attente") {
                  color = "geekblue";
                } else if (tag === "Livré") {
                  color = "green";
                } else {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={EtatdelaCommande}>
                    {EtatdelaCommande}
                  </Tag>
                );
              })}
            </>
          ),
        },

        {
          title: "Nom du transporteur",
          dataIndex: "Nomdutransporteur",
          align: ["center"],
        },

        {
          title: "Action",
          key: "action",
          align: ["center"],
          render: (record) => (
            <Space size={1}>
              <Button
                type="primary"
                shape={"round"}
                onClick={async () => {
                  try {
                    let result = await this.contract.methods
                      .setEtatdelacommande(record.Nomdumedicament, "Livré")
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.medicamentlist();
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                <CheckOutlined />
              </Button>
              <Button
                danger
                type="primary"
                shape={"round"}
                onClick={async () => {
                  try {
                    let result = await this.contract.methods
                      .setEtatdelacommande(record.Nomdumedicament, " Non Livré")
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.medicamentlist();
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                <CloseOutlined />
              </Button>
            </Space>
          ),
        },
      ],
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  medicamentlist = async () => {
    this.setState(() => ({
      tab: [],
    }));
    let resultat1 = await this.contract.methods
      .medicamentListforpharmacien1()
      .call({ from: this.accounts[0] });
    let resultat2 = await this.contract.methods
      .medicamentListforpharmacien2()
      .call({ from: this.accounts[0] });
    this.setState({
      nommedicament: resultat1[0],
      dated: resultat1[1],
      quantite: resultat1[2],
      Tempmin: resultat1[3],
      Tempmax: resultat1[4],
      condition: resultat1[5],
      etatdelademande: resultat2[0],
      etatdelacommande: resultat2[1],
      Fabricantname: resultat2[2],
      transporteurname: resultat2[3],
    });
    for (let i = 0; i < this.state.nommedicament.length; i++) {
      this.setState((x) => ({
        tab: [
          ...x.tab,
          {
            key: i,
            NomduFabricant: x.Fabricantname[i],
            Datedelademande: x.dated[i],
            Nomdumedicament: x.nommedicament[i],
            quantite: x.quantite[i],
            Temperatureminimale: x.Tempmin[i],
            Temperaturemaxiamle: x.Tempmax[i],
            condition: [x.condition[i]],
            Etatdelademande: [x.etatdelademande[i]],
            EtatdelaCommande: [x.etatdelacommande[i]],
            Nomdutransporteur: x.transporteurname[i],
          },
        ],
      }));
    }
  };

  componentDidMount = async () => {
    this.medicamentlist();
  };

  render() {
    return (
      <>
        <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "70px",
            borderRadius: "7px",
          }}
        >
          <legend>Liste des Demandes :</legend>
          <Table
            size="small"
            columns={this.state.columns}
            dataSource={this.state.tab}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </>
    );
  }
}

export default Listedesdemandesdupharmacien;
