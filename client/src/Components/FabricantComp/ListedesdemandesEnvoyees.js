import React, { Component } from "react";
import { Card, Table, Tag } from "antd";

const columns = [
  {
    title: "Nom du medicament",
    dataIndex: "Nomdumedicament",
    align: ["center"],
    responsive: ["md"],
  },

  {
    title: "Date de la demande",
    dataIndex: "Datedelademande",
    align: ["center"],
    responsive: ["md"],
  },

  {
    title: "Quantité",
    dataIndex: "Quantité",
    align: ["center"],
    responsive: ["md"],
  },

  {
    title: "Etat de la Demande",
    dataIndex: "Etatdelademande",
    align: ["center"],
    responsive: ["md"],
    render: (Etatdelademande) => (
      <>
        {Etatdelademande.map((tag) => {
          let color;
          if (tag === "en attente") {
            color = "geekblue";
          } else if (tag === "Demande Refusée") {
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
    responsive: ["md"],
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
    title: "Nom du Transporteur",
    dataIndex: "Nomdutransporteur",
    align: ["center"],
    responsive: ["md"],
  },

  {
    title: "Nom du pharmacien",
    dataIndex: "Nomdupharmacien",
    align: ["center"],
    responsive: ["md"],
  },
];

class ListedesdemandesEnvoyees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      nommedicament: [],
      dated: [],
      quantite: [],
      etatdelademande: [],
      etatdelacommande: [],
      transporteurname: [],
      pharmacienname: [],
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    let resultat = await this.contract.methods
      .medicamentListforFabricant2()
      .call({ from: this.accounts[0] });
    console.log(resultat);
    this.setState({
      nommedicament: resultat[0],
      dated: resultat[1],
      quantite: resultat[2],
      etatdelademande: resultat[3],
      etatdelacommande: resultat[4],
      transporteurname: resultat[5],
      pharmacienname: resultat[6],
    });
    for (let i = 0; i < this.state.nommedicament.length; i++) {
      this.setState((x) => ({
        tab: [
          ...x.tab,
          {
            key: i,
            Nomdumedicament: x.nommedicament[i],
            Datedelademande: x.dated[i],
            Quantité: x.quantite[i],
            Etatdelademande: [x.etatdelademande[i]],
            EtatdelaCommande: [x.etatdelacommande[i]],
            Nomdutransporteur: x.transporteurname[i],
            Nomdupharmacien: x.pharmacienname[i],
          },
        ],
      }));
    }
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
            columns={columns}
            dataSource={this.state.tab}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </>
    );
  }
}
export default ListedesdemandesEnvoyees;
