import React, { Component } from "react";
import { Input, Card, Button, Form, Table, Space, Tag, message } from "antd";

class Fabricant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      number: "",
      gouvernorat: "",
      id1: [],
      name1: [],
      number1: [],
      gouvernorat1: [],
      statut1: [],
      data: [],
      columns: [
        {
          title: "Adresse Ethereum",
          dataIndex: "id1",
          align: ["center"],
        },

        {
          title: "Nom et Prénom ",
          dataIndex: "name1",
          align: ["center"],
        },

        {
          title: "Numero de telephone",
          dataIndex: "number1",
          align: ["center"],
        },

        {
          title: "Gouvernorat",
          dataIndex: "gouvernorat1",
          align: ["center"],
        },

        {
          title: "Statut",
          key: "statut1",
          dataIndex: "statut1",
          render: (statut1) => (
            <>
              {statut1.map((tag) => {
                let color = "green";
                if (tag === "Bloquée") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={statut1}>
                    {statut1}
                  </Tag>
                );
              })}
            </>
          ),
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
                      .block_deblockFabricant(record.id1, "Bloquée")
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.Fabricantlist();
                      message.info(this.state.name + " a été bloqué ! ");
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                Bloquer
              </Button>
              <Button
                shape={"round"}
                onClick={async () => {
                  try {
                    let result = await this.contract.methods
                      .block_deblockFabricant(record.id1, "Debloquee")
                      .send({ from: this.accounts[0] });
                    if (result.status === true) {
                      this.Fabricantlist();
                      message.info(this.state.name + " a été débloqué ! ");
                    }
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                Débloquer
              </Button>
            </Space>
          ),
        },
      ],
    };
  }
  contract = this.props.contract;
  accounts = this.props.accounts;

  Fabricantlist = async () => {
    this.setState(() => ({
      data: [],
    }));
    let resultat = await this.contract.methods
      .Fabricantlist()
      .call({ from: this.accounts[0] });
    this.setState({
      id1: resultat[0],
      name1: resultat[1],
      number1: resultat[2],
      gouvernorat1: resultat[3],
      statut1: resultat[4],
    });
    for (let i = 0; i < this.state.id1.length; i++) {
      this.setState((x) => ({
        data: [
          ...x.data,
          {
            key: i,
            id1: x.id1[i],
            name1: x.name1[i],
            number1: x.number1[i],
            gouvernorat1: x.gouvernorat1[i],
            statut1: [x.statut1[i]],
          },
        ],
      }));
    }
  };

  componentDidMount = async () => {
    this.Fabricantlist();
  };

  handleChange = async (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleReset = () => {
    this.setState({
      id: "",
      name: "",
      number: "",
      gouvernorat: "",
    });
  };

  addFabricant = async () => {
    try {
      let result = await this.contract.methods
        .signupFabricant(
          this.state.id,
          this.state.name,
          this.state.number,
          this.state.gouvernorat
        )
        .send({ from: this.accounts[0] });
      if (result.status === true) {
        this.Fabricantlist();
        message.info(this.state.name + " a été ajouté avec succés ! ");
      }
    } catch (error) {
      alert(error);
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
          <legend>Ajouter un Fabricant :</legend>
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
              label="Nom et Prenom"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Adresse Ethereum "
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="id"
                value={this.state.id}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Numero de telephone"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="number"
                value={this.state.number}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Gouvernorat"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="gouvernorat"
                value={this.state.gouvernorat}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 10,
              }}
            >
              <Space size={3}>
                <Button type="primary" onClick={this.addFabricant.bind(this)}>
                  Envoyer
                </Button>
                <Button onClick={this.handleReset.bind(this)}>Annuler</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        <Card
          style={{
            position: "relative",
            width: "80%",
            left: "265px",
            top: "80px",
            borderRadius: "7px",
          }}
        >
          <legend>Liste des Fabricants :</legend>
          <Table
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </>
    );
  }
}
export default Fabricant;
