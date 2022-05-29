import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { Card } from "antd";

class Fabricantlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      id: [],
      number: [],
      gouvernorat: [],
    };
  }
  contract = this.props.contract;
  accounts = this.props.accounts;

  componentDidMount = async () => {
    let result = await this.contract.methods
      .Fabricantlist()
      .call({ from: this.accounts[0] });
    this.setState({
      id: result[0],
      name: result[1],
      number: result[2],
      gouvernorat: result[3],
    });
    var table1 = document.getElementById("Table1");
    for (var j = 0; j < this.state.id.length; j++) {
      var row_1 = table1.insertRow(1);
      var cell_1 = row_1.insertCell(0);
      var cell_2 = row_1.insertCell(1);
      var cell_3 = row_1.insertCell(2);
      var cell_4 = row_1.insertCell(3);
      cell_1.innerHTML = this.state.id[j];
      cell_2.innerHTML = this.state.name[j];
      cell_3.innerHTML = this.state.number[j];
      cell_4.innerHTML = this.state.gouvernorat[j];
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
          <legend>Liste des Fabricants :</legend>
          <Table id="Table1" striped bordered hover>
            <thead>
              <tr>
                <th>Adresse Ethereum</th>
                <th>Nom et Prénom :</th>
                <th>Numero de telephone</th>
                <th>Gouvernorat</th>
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
export default Fabricantlist;
