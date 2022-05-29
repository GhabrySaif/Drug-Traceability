import React, { Component } from "react";
import { Input, Card, Button, Form, Space, DatePicker, message } from "antd";

class AjouterUnMedicament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nommedicament: "",
      Datef: "",
      Dated: "",
      id: "",
      Quantite: "",
      Tempmax: "",
      Tempmin: "",
      Temp: "",
    };
  }

  contract = this.props.contract;
  accounts = this.props.accounts;

  onChange = async (date, dateString) => {
    this.setState({ Datef: dateString });
  };

  handleChange = async (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (event) => {
    try {
      let result = await this.contract.methods
        .setMedicament(
          this.state.nommedicament,
          this.state.Datef,
          this.state.Tempmax,
          this.state.Tempmin
        )
        .send({ from: this.accounts[0] });
      if (result.status === true) {
        message.info("Medicament ajouté avec succés");
      }
    } catch (error) {
      alert(error);
    }
    event.preventDefault(true);
  };

  handleReset = () => {
    this.setState({
      nommedicament: "",
      Datef: "",
      Tempmax: "",
      Tempmin: "",
    });
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
          <legend>Nouveau medicament :</legend>
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
              label="Nom du médicament :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="nommedicament"
                value={this.state.nommedicament}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Date de fabriquation :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <DatePicker
                placeholder={""}
                onChange={this.onChange.bind(this)}
                style={{ width: "100%" }}
                format={"DD/MM/YYYY"}
              />
            </Form.Item>
            <Form.Item
              label="Température min en &#8451; :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="Tempmin"
                value={this.state.Tempmin}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Item>
            <Form.Item
              label="Température max en &#8451; :"
              rules={[
                {
                  required: true,
                  message: "champs requis!",
                },
              ]}
            >
              <Input
                name="Tempmax"
                value={this.state.Tempmax}
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
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleSubmit.bind(this)}
                >
                  Envoyer
                </Button>
                <Button htmlType="submit" onClick={this.handleReset}>
                  Annuler
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  }
}
export default AjouterUnMedicament;
