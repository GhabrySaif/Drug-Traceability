import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "antd/dist/antd.css";
import Administrateur from "./Components/AdministrateurComp/AdministrateurComp";
import Fabricant from "./Components/FabricantComp/FabricantComp";
import Transporteur from "./Components/TransporteurComp/TransporteurComp";
import Pharmacien from "./Components/PharmacienComp/PharmacienComp";
import Login from "./Components/LoginComp/LoginComp";
import smartcontract from "./contracts/Main.json";
import getWeb3 from "./getWeb3";
import "./App.css";
import Dashboard from "./Components/AdministrateurComp/Dashboard";
import EditFabricant from "./Components/AdministrateurComp/Fabricant";
import EditPharmacien from "./Components/AdministrateurComp/Pharmacien";
import EditTransporteur from "./Components/AdministrateurComp/Transporteur";
import ProtectedRoutes from "./ProtectedRoutes";
import AjouterUnedemande from "./Components/FabricantComp/AjouterUnedemande";
import Listedesdemandesdutransporteur from "./Components/TransporteurComp/Listedesdemandesdutransporteur";
import Transporteurlist from "./Components/Liste/Transporteurlist";
import Pharmacienlist from "./Components/Liste/Pharmacienlist";
import Fabricantlist from "./Components/Liste/Fabricantlist";
import AjouterUnMedicament from "./Components/FabricantComp/AjouterUnMedicament";
import ListedesMedicaments from "./Components/FabricantComp/ListedesMedicaments";
import ListedesdemandesEnvoyees from "./Components/FabricantComp/ListedesdemandesEnvoyees";
import Listedesdemandesdupharmacien from "./Components/PharmacienComp/Liste_des_demandesdupharmacien";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contract: null,
      accounts: null,
    };
  }

  componentDidMount = async () => {
    try {
      var web3 = await getWeb3();
      var accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const contractAddr = "0x005Dcd67A0Ab8b0BE86eD24938883D660c34df31";

      const contract = new web3.eth.Contract(smartcontract.abi, contractAddr);
      // set State variables to derived values.
      this.setState({ web3, accounts, contract });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                contract={this.state.contract}
                accounts={this.state.accounts}
              />
            }
          ></Route>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="Administrateur"
              element={
                <Administrateur
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="editFabricant"
                element={
                  <EditFabricant
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="editTransporteur"
                element={
                  <EditTransporteur
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="editPharmacien"
                element={
                  <EditPharmacien
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
            </Route>
            <Route
              path="Fabricant"
              element={
                <Fabricant
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="Ajouter_un_medicament"
                element={
                  <AjouterUnMedicament
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Liste_des_medicaments"
                element={
                  <ListedesMedicaments
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Ajouter_une_demande"
                element={
                  <AjouterUnedemande
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Liste_des_demandes_envoyees"
                element={
                  <ListedesdemandesEnvoyees
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Transporteurs_disponibles"
                element={
                  <Transporteurlist
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Pharmaciens_disponible"
                element={
                  <Pharmacienlist
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route path="Dashboard" element={<Dashboard />}></Route>
            </Route>
            <Route
              path="Transporteur"
              element={
                <Transporteur
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="Liste_des_demandes_du_transporteur"
                element={
                  <Listedesdemandesdutransporteur
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Fabricants_disponibles"
                element={
                  <Fabricantlist
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Pharmaciens_disponible"
                element={
                  <Pharmacienlist
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
            </Route>
            <Route
              path="Pharmacien"
              element={
                <Pharmacien
                  contract={this.state.contract}
                  accounts={this.state.accounts}
                />
              }
            >
              <Route path="Dashboard" element={<Dashboard />}></Route>
              <Route
                path="Liste_des_demandes_du_pharmacien"
                element={
                  <Listedesdemandesdupharmacien
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Fabricants_disponibles"
                element={
                  <Fabricantlist
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
              <Route
                path="Transporteurs_disponibles"
                element={
                  <Transporteurlist
                    contract={this.state.contract}
                    accounts={this.state.accounts}
                  />
                }
              ></Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to={"/"} />}></Route>
        </Routes>
      </div>
    );
  }
}
export default App;
