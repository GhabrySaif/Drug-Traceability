import React, { Component } from "react";
import { Card } from "antd";
import Table from "react-bootstrap/esm/Table";

class ListedesMedicaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nommedicament: [],
      Datef: [],
      Tempmin: [],
      Tempmax: [],
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    let result = await this.contract.methods
      .medicamentListforFabricant1()
      .call({ from: this.accounts[0] });
    this.setState({
      nommedicament: result[0],
      Datef: result[1],
      Tempmin: result[2],
      Tempmax: result[3],
    });
    var table1 = document.getElementById("Table1");
    for (var j = 0; j < this.state.nommedicament.length; j++) {
      var row_1 = table1.insertRow(1);
      var cell_1 = row_1.insertCell(0);
      var cell_2 = row_1.insertCell(1);
      var cell_4 = row_1.insertCell(2);
      var cell_5 = row_1.insertCell(3);
      cell_1.innerHTML = this.state.nommedicament[j];
      cell_2.innerHTML = this.state.Datef[j];
      cell_4.innerHTML = this.state.Tempmin[j];
      cell_5.innerHTML = this.state.Tempmax[j];
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
          <legend>Liste des medicaments :</legend>
          <Table id="Table1" striped bordered hover>
            <thead>
              <tr>
                <th>Nom du médicament</th>
                <th>Date de fabriquation</th>
                <th>Température minimale</th>
                <th>Température maximale</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </Table>
        </Card>
      </>
    );
  }
}
export default ListedesMedicaments;
