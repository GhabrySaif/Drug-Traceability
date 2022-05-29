import React, { Component } from "react";
import { Card, Button, Form, Select, Input, Space, message } from "antd";
const { Option } = Select;

class AjouterUnedemande extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Quantite: "",
      medicamentlist: [],
      nommedicament_1: "",
      nommedicament_2: [],
      //***************** */
      transporteurlist: [],
      nametransporteur: [],
      idtransporteur_1: [],
      idtransporteur_2: "",
      //***************** */
      pharmacienlist: [],
      namepharmacien: [],
      idpharmacien_1: [],
      idpharmacien_2: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  medicamentlist = async () => {
    let result = await this.contract.methods
      .medicamentListforFabricant1()
      .call({ from: this.accounts[0] });
    this.setState({
      nommedicament_2: result[0],
    });
    for (let j = 0; j < this.state.nommedicament_2.length; j++) {
      this.setState((x) => ({
        medicamentlist: [
          ...x.medicamentlist,
          {
            key: j,
            nommedicament: x.nommedicament_2[j],
          },
        ],
      }));
    }
  };

  transporteurlist = async () => {
    let result = await this.contract.methods
      .transporteurlist()
      .call({ from: this.accounts[0] });
    this.setState({
      idtransporteur_1: result[0],
      nametransporteur: result[1],
    });
    for (let j = 0; j < this.state.idtransporteur_1.length; j++) {
      this.setState((x) => ({
        transporteurlist: [
          ...x.transporteurlist,
          {
            key: j,
            id: x.idtransporteur_1[j],
            name: x.nametransporteur[j],
          },
        ],
      }));
    }
  };

  pharmacienlist = async () => {
    let result = await this.contract.methods
      .pharmacienlist()
      .call({ from: this.accounts[0] });
    this.setState({
      idpharmacien_1: result[0],
      namepharmacien: result[1],
    });
    for (let j = 0; j < this.state.idpharmacien_1.length; j++) {
      this.setState((x) => ({
        pharmacienlist: [
          ...x.pharmacienlist,
          {
            key: j,
            id: x.idpharmacien_1[j],
            name: x.namepharmacien[j],
          },
        ],
      }));
    }
  };

  componentDidMount = async () => {
    this.medicamentlist();
    this.transporteurlist();
    this.pharmacienlist();
  };

  handleChange1 = async (value) => {
    console.log(`selected ${value}`);
    setTimeout(() => {
      this.setState({ nommedicament_1: value });
      console.log("id nom medicament", this.state.nommedicament_1);
    }, 200);
  };

  handleChange2 = async (value) => {
    console.log(`selected ${value}`);
    setTimeout(() => {
      this.setState({ idtransporteur_2: value });
      console.log("id transporteur", this.state.idtransporteur_2);
    }, 200);
  };

  handleChange3 = async (value) => {
    console.log(`selected ${value}`);
    setTimeout(() => {
      this.setState({ idpharmacien_2: value });
      console.log("id pharmacien", this.state.idpharmacien_2);
    }, 200);
  };

  handleChange_1 = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleReset = () => {
    this.setState({
      nommedicament_1: "",
      Quantite: "",
      idtransporteur_2: "",
      idpharmacien_2: "",
    });
  };

  handleSubmit = async (event) => {
    try {
      event.preventDefault(true);
      let current = new Date();
      let date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      let result = await this.contract.methods
        .setRequest(
          this.state.nommedicament_1,
          this.state.Quantite,
          date,
          this.state.idtransporteur_2,
          this.state.idpharmacien_2
        )
        .send({ from: this.accounts[0] });
      if (result.status === true) {
        message.info("Demande envoyée avec succés ! ");
      }
    } catch (error) {
      alert(error);
    }
  };

  render() {
    let medicamentselect = this.state.medicamentlist.map((x, i) => (
      <Option key={i} value={x.nommedicament}>
        {x.nommedicament}
      </Option>
    ));
    let transporteurselect = this.state.transporteurlist.map((x, i) => (
      <Option key={i} value={x.id}>
        {x.name}
      </Option>
    ));
    let pharmacienselect = this.state.pharmacienlist.map((x, i) => (
      <Option key={i} value={x.id}>
        {x.name}
      </Option>
    ));
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
          <legend>Nouvelle Demande :</legend>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Selectionner un médicament :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Select onChange={this.handleChange1.bind(this)}>
                {medicamentselect}
              </Select>
            </Form.Item>
            <Form.Item
              label="Quantité :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="Quantite"
                value={this.state.Quantite}
                onChange={this.handleChange_1.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Selectionner un transporteur :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Select onChange={this.handleChange2.bind(this)}>
                {transporteurselect}
              </Select>
            </Form.Item>
            <Form.Item
              label="Selectionner un pharmacien :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Select onChange={this.handleChange3.bind(this)}>
                {pharmacienselect}
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
                <Button type="primary" onClick={this.handleSubmit.bind(this)}>
                  Envoyer
                </Button>
                <Button onClick={this.handleReset.bind(this)}>Annuler</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}
export default AjouterUnedemande;
