// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
import "./Secondary.sol";

contract Main is Secondary {
    constructor() {
        Admins[Admin].name = "Mariem Turki";
        signupFabricant(
            0xbbf5efc3E61bcfF9aAd5803f041D2A32E4cd9bD6,
            "Saif Ghabri",
            123456,
            "gabes"
        );
        signupTransporteur(
            0xa521a269092a7f1031d111fC2e640cb2231dA29f,
            "Ali",
            123456,
            "gafsa"
        );
        signupPharmacien(
            0xaF8286dEE528F10a786Fee951DD6D419eaecC13e,
            "Sami",
            123456,
            "sfax"
        );
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function signupFabricant(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat
    ) public {
        Fabricants[_id].Fabricant_id = _id;
        Fabricants[_id].name = _name;
        Fabricants[_id].phonenumber = _phonenumber;
        Fabricants[_id].gouvernorat = _gouvernorat;
        Fabricants[_id].statut = "Debloquee";
        Fabricantaddress.push(_id);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function signupTransporteur(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat
    ) public {
        transporteurs[_id].transporteur_id = _id;
        transporteurs[_id].name = _name;
        transporteurs[_id].phonenumber = _phonenumber;
        transporteurs[_id].gouvernorat = _gouvernorat;
        transporteurs[_id].statut = "Debloquee";
        transporteuraddress.push(_id);
    }

    function signupPharmacien(
        address _id,
        string memory _name,
        uint32 _phonenumber,
        string memory _gouvernorat
    ) public {
        pharmaciens[_id].pharmacien_id = _id;
        pharmaciens[_id].name = _name;
        pharmaciens[_id].phonenumber = _phonenumber;
        pharmaciens[_id].gouvernorat = _gouvernorat;
        pharmaciens[_id].statut = "Debloquee";
        pharmacienaddress.push(_id);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function block_deblockFabricant(address _id, string calldata _statut)
        external
    {
        Fabricants[_id].statut = _statut;
    }

    function block_deblockTransporteur(address _id, string calldata _statut)
        external
    {
        transporteurs[_id].statut = _statut;
    }

    function block_deblockPharmacien(address _id, string calldata _statut)
        external
    {
        pharmaciens[_id].statut = _statut;
    }

    // ***********************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    // ***********************************************************************************************

    function isAdminExists() external view returns (string memory) {
        if (msg.sender == Admin) {
            return "true";
        } else {
            return "false";
        }
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function isFabricantExists() external view returns (string memory) {
        _Fabricant storage f = Fabricants[msg.sender];
        if (
            (f.Fabricant_id > address(0x0)) &&
            (keccak256(abi.encodePacked(f.statut)) ==
                keccak256(abi.encodePacked("Debloquee")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function isTransporteurExists() external view returns (string memory) {
        _transporteur storage d = transporteurs[msg.sender];
        if (
            (d.transporteur_id > address(0x0)) &&
            (keccak256(abi.encodePacked(d.statut)) ==
                keccak256(abi.encodePacked("Debloquee")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function isPharmacienExists() external view returns (string memory) {
        _pharmacien storage p = pharmaciens[msg.sender];
        if (
            (p.pharmacien_id > address(0x0)) &&
            (keccak256(abi.encodePacked(p.statut)) ==
                keccak256(abi.encodePacked("Debloquee")))
        ) {
            return "true";
        } else {
            return "false";
        }
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function AdministrateurName() external view returns (string memory) {
        return Admins[msg.sender].name;
    }

    function FabricantName() external view returns (string memory) {
        return Fabricants[msg.sender].name;
    }

    function TransporteurName() external view returns (string memory) {
        return transporteurs[msg.sender].name;
    }

    function PharmacienName() external view returns (string memory) {
        return pharmaciens[msg.sender].name;
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function setMedicament(
        string memory _nommedicament,
        string memory _Datef,
        uint32 _Tempmax,
        uint32 _Tempmin
    ) public {
        medicaments[_nommedicament].nommedicament = _nommedicament;
        medicaments[_nommedicament].Datef = _Datef;
        medicaments[_nommedicament].Tempmin = _Tempmin;
        medicaments[_nommedicament].Tempmax = _Tempmax;
        medicaments[_nommedicament].requested = false;
        Fabricants[msg.sender].medicamentslist.push(_nommedicament);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function setRequest(
        string memory _nommedicament,
        uint32 _Quantite,
        string memory _Dated,
        address _idtransporteur,
        address idpharmacien
    ) public {
        medicaments[_nommedicament].Quantite = _Quantite;
        medicaments[_nommedicament].Dated = _Dated;
        medicaments[_nommedicament].requested = true;
        medicaments[_nommedicament].condition = "bonne conditions";
        medicaments[_nommedicament].etatdelademande = "en attente";
        medicaments[_nommedicament].etatdelacommande = "en attente";
        medicaments[_nommedicament].Fabricantname = Fabricants[msg.sender].name;
        medicaments[_nommedicament].transporteurname = transporteurs[
            _idtransporteur
        ].name;
        medicaments[_nommedicament].pharmacienname = pharmaciens[idpharmacien]
            .name;
        transporteurs[_idtransporteur].medicamentslist.push(_nommedicament);
        pharmaciens[idpharmacien].medicamentslist.push(_nommedicament);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function getTempmin(string memory _nommedicament)
        external
        view
        returns (uint32)
    {
        return medicaments[_nommedicament].Tempmin;
    }

    function getTempmax(string memory _nommedicament)
        external
        view
        returns (uint32)
    {
        return medicaments[_nommedicament].Tempmax;
    }

    function setCondtion(string memory _nommedicament, string memory _condition)
        external
    {
        medicaments[_nommedicament].condition = _condition;
    }

    function setEtatdelademande(
        string memory _nommedicament,
        string memory _demande
    ) external {
        medicaments[_nommedicament].etatdelademande = _demande;
    }

    function setEtatdelacommande(
        string memory _nommedicament,
        string memory _commande
    ) external {
        medicaments[_nommedicament].etatdelacommande = _commande;
    }
}
