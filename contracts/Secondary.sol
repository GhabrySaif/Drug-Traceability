// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

abstract contract Secondary {
    address public Admin = 0xC9d6FbfCea2c8Ce42D34680fF02cBC5e8Df187f5;
    mapping(address => _Admin) internal Admins;
    mapping(address => _Fabricant) internal Fabricants;
    mapping(address => _pharmacien) internal pharmaciens;
    mapping(address => _transporteur) internal transporteurs;
    mapping(string => _medicament) internal medicaments;

    struct _Admin {
        address Admin_id;
        string name;
    }

    struct _Fabricant {
        address Fabricant_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
        string[] medicamentslist;
    }
    struct _transporteur {
        address transporteur_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
        string[] medicamentslist;
    }
    struct _pharmacien {
        address pharmacien_id;
        string name;
        uint32 phonenumber;
        string gouvernorat;
        string statut;
        string[] medicamentslist;
    }

    struct _medicament {
        string nommedicament;
        string Datef;
        string Dated;
        uint32 Quantite;
        uint32 Tempmin;
        uint32 Tempmax;
        string condition;
        string etatdelademande;
        string etatdelacommande;
        string transporteurname;
        string Fabricantname;
        string pharmacienname;
        bool requested;
    }

    address[] Fabricantaddress;
    address[] transporteuraddress;
    address[] pharmacienaddress;

    modifier OnlyAdmin() {
        require(msg.sender == Admin);
        _;
    }
    modifier Onlyfabriquant(address id) {
        _Fabricant storage f = Fabricants[id];
        require(f.Fabricant_id > address(0x0));
        _;
    }
    modifier OnlyTransporteur(address id) {
        _transporteur storage d = transporteurs[id];
        require(d.transporteur_id > address(0x0));
        _;
    }
    modifier Onlypharmacien(address id) {
        _pharmacien storage p = pharmaciens[id];
        require(p.pharmacien_id > address(0x0));
        _;
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function Fabricantlist()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](Fabricantaddress.length);
        string[] memory name = new string[](Fabricantaddress.length);
        uint32[] memory phonenumber = new uint32[](Fabricantaddress.length);
        string[] memory gouvernorat = new string[](Fabricantaddress.length);
        string[] memory statut = new string[](Fabricantaddress.length);
        for (uint256 i = 0; i < Fabricantaddress.length; i++) {
            if (msg.sender == Admin) {
                id[i] = Fabricantaddress[i];
                name[i] = Fabricants[Fabricantaddress[i]].name;
                phonenumber[i] = Fabricants[Fabricantaddress[i]].phonenumber;
                gouvernorat[i] = Fabricants[Fabricantaddress[i]].gouvernorat;
                statut[i] = Fabricants[Fabricantaddress[i]].statut;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(Fabricants[Fabricantaddress[i]].statut)
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = Fabricantaddress[i];
                    name[i] = Fabricants[Fabricantaddress[i]].name;
                    phonenumber[i] = Fabricants[Fabricantaddress[i]]
                        .phonenumber;
                    gouvernorat[i] = Fabricants[Fabricantaddress[i]]
                        .gouvernorat;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function transporteurlist()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](transporteuraddress.length);
        string[] memory name = new string[](transporteuraddress.length);
        uint32[] memory phonenumber = new uint32[](transporteuraddress.length);
        string[] memory gouvernorat = new string[](transporteuraddress.length);
        string[] memory statut = new string[](transporteuraddress.length);
        for (uint256 i = 0; i < transporteuraddress.length; i++) {
            if (msg.sender == Admin) {
                id[i] = transporteuraddress[i];
                name[i] = transporteurs[transporteuraddress[i]].name;
                phonenumber[i] = transporteurs[transporteuraddress[i]]
                    .phonenumber;
                gouvernorat[i] = transporteurs[transporteuraddress[i]]
                    .gouvernorat;
                statut[i] = transporteurs[transporteuraddress[i]].statut;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(
                            transporteurs[transporteuraddress[i]].statut
                        )
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = transporteuraddress[i];
                    name[i] = transporteurs[transporteuraddress[i]].name;
                    phonenumber[i] = transporteurs[transporteuraddress[i]]
                        .phonenumber;
                    gouvernorat[i] = transporteurs[transporteuraddress[i]]
                        .gouvernorat;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function pharmacienlist()
        external
        view
        returns (
            address[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory
        )
    {
        address[] memory id = new address[](pharmacienaddress.length);
        string[] memory name = new string[](pharmacienaddress.length);
        uint32[] memory phonenumber = new uint32[](pharmacienaddress.length);
        string[] memory gouvernorat = new string[](pharmacienaddress.length);
        string[] memory statut = new string[](pharmacienaddress.length);
        for (uint256 i = 0; i < pharmacienaddress.length; i++) {
            if (msg.sender == Admin) {
                id[i] = pharmacienaddress[i];
                name[i] = pharmaciens[pharmacienaddress[i]].name;
                phonenumber[i] = pharmaciens[pharmacienaddress[i]].phonenumber;
                gouvernorat[i] = pharmaciens[pharmacienaddress[i]].gouvernorat;
                statut[i] = pharmaciens[pharmacienaddress[i]].statut;
            } else {
                if (
                    keccak256(
                        abi.encodePacked(
                            pharmaciens[pharmacienaddress[i]].statut
                        )
                    ) == keccak256(abi.encodePacked("Debloquee"))
                ) {
                    id[i] = pharmacienaddress[i];
                    name[i] = pharmaciens[pharmacienaddress[i]].name;
                    phonenumber[i] = pharmaciens[pharmacienaddress[i]]
                        .phonenumber;
                    gouvernorat[i] = pharmaciens[pharmacienaddress[i]]
                        .gouvernorat;
                } else {
                    continue;
                }
            }
        }
        return (id, name, phonenumber, gouvernorat, statut);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function medicamentListforFabricant1()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            uint32[] memory,
            uint32[] memory
        )
    {
        string[] memory nommedicament = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        string[] memory Datef = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        uint32[] memory Tempmin = new uint32[](
            Fabricants[msg.sender].medicamentslist.length
        );
        uint32[] memory Tempmax = new uint32[](
            Fabricants[msg.sender].medicamentslist.length
        );
        for (
            uint256 i = 0;
            i < Fabricants[msg.sender].medicamentslist.length;
            i++
        ) {
            nommedicament[i] = medicaments[
                Fabricants[msg.sender].medicamentslist[i]
            ].nommedicament;
            Datef[i] = medicaments[Fabricants[msg.sender].medicamentslist[i]]
                .Datef;
            Tempmin[i] = medicaments[Fabricants[msg.sender].medicamentslist[i]]
                .Tempmin;
            Tempmax[i] = medicaments[Fabricants[msg.sender].medicamentslist[i]]
                .Tempmax;
        }
        return (nommedicament, Datef, Tempmin, Tempmax);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function medicamentListforFabricant2()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            uint32[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            string[] memory
        )
    {
        string[] memory nommedicament = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        string[] memory Dated = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        uint32[] memory Quantite = new uint32[](
            Fabricants[msg.sender].medicamentslist.length
        );
        string[] memory etatdelademande = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        string[] memory etatdelacommande = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        string[] memory transporteurname = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        string[] memory pharmacienname = new string[](
            Fabricants[msg.sender].medicamentslist.length
        );
        for (
            uint256 i = 0;
            i < Fabricants[msg.sender].medicamentslist.length;
            i++
        ) {
            if (
                medicaments[Fabricants[msg.sender].medicamentslist[i]]
                    .requested == false
            ) {
                continue;
            } else {
                nommedicament[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].nommedicament;
                Dated[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].Dated;
                Quantite[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].Quantite;
                etatdelademande[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].etatdelademande;
                etatdelacommande[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].etatdelacommande;
                transporteurname[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].transporteurname;
                pharmacienname[i] = medicaments[
                    Fabricants[msg.sender].medicamentslist[i]
                ].pharmacienname;
            }
        }
        return (
            nommedicament,
            Dated,
            Quantite,
            etatdelademande,
            etatdelacommande,
            transporteurname,
            pharmacienname
        );
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function medicamentListfortransporteur1()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            uint32[] memory,
            uint32[] memory,
            uint32[] memory,
            string[] memory
        )
    {
        string[] memory nommedicament = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        string[] memory Dated = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        uint32[] memory Quantite = new uint32[](
            transporteurs[msg.sender].medicamentslist.length
        );
        uint32[] memory tempmin = new uint32[](
            transporteurs[msg.sender].medicamentslist.length
        );
        uint32[] memory tempmax = new uint32[](
            transporteurs[msg.sender].medicamentslist.length
        );
        string[] memory condition = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        for (
            uint256 i = 0;
            i < transporteurs[msg.sender].medicamentslist.length;
            i++
        ) {
            if (
                medicaments[transporteurs[msg.sender].medicamentslist[i]]
                    .requested == false
            ) {
                continue;
            } else {
                nommedicament[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].nommedicament;
                Dated[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].Dated;
                Quantite[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].Quantite;
                tempmin[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].Tempmin;
                tempmax[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].Tempmax;
                condition[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].condition;
            }
        }
        return (nommedicament, Dated, Quantite, tempmin, tempmax, condition);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function medicamentListfortransporteur2()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            string[] memory,
            string[] memory
        )
    {
        string[] memory etatdelademande = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        string[] memory etatdelacommande = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        string[] memory Fabricantname = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        string[] memory pharmacienname = new string[](
            transporteurs[msg.sender].medicamentslist.length
        );
        for (
            uint256 i = 0;
            i < transporteurs[msg.sender].medicamentslist.length;
            i++
        ) {
            if (
                medicaments[transporteurs[msg.sender].medicamentslist[i]]
                    .requested == false
            ) {
                continue;
            } else {
                etatdelademande[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].etatdelademande;
                etatdelacommande[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].etatdelacommande;
                Fabricantname[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].Fabricantname;
                pharmacienname[i] = medicaments[
                    transporteurs[msg.sender].medicamentslist[i]
                ].pharmacienname;
            }
        }
        return (
            etatdelademande,
            etatdelacommande,
            Fabricantname,
            pharmacienname
        );
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function medicamentListforpharmacien1()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            uint32[] memory,
            uint32[] memory,
            uint32[] memory,
            string[] memory
        )
    {
        string[] memory nommedicament = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        string[] memory Dated = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        uint32[] memory Quantite = new uint32[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        uint32[] memory tempmin = new uint32[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        uint32[] memory tempmax = new uint32[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        string[] memory condition = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        for (
            uint256 i = 0;
            i < pharmaciens[msg.sender].medicamentslist.length;
            i++
        ) {
            if (
                medicaments[pharmaciens[msg.sender].medicamentslist[i]]
                    .requested == false
            ) {
                continue;
            } else {
                nommedicament[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].nommedicament;
                Dated[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].Dated;
                Quantite[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].Quantite;
                tempmin[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].Tempmin;
                tempmax[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].Tempmax;
                condition[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].condition;
            }
        }
        return (nommedicament, Dated, Quantite, tempmin, tempmax, condition);
    }

    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************
    //************************************************************************************************

    function medicamentListforpharmacien2()
        external
        view
        returns (
            string[] memory,
            string[] memory,
            string[] memory,
            string[] memory
        )
    {
        string[] memory etatdelademande = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        string[] memory etatdelacommande = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        string[] memory Fabricantname = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        string[] memory transporteurname = new string[](
            pharmaciens[msg.sender].medicamentslist.length
        );
        for (
            uint256 i = 0;
            i < pharmaciens[msg.sender].medicamentslist.length;
            i++
        ) {
            if (
                medicaments[pharmaciens[msg.sender].medicamentslist[i]]
                    .requested == false
            ) {
                continue;
            } else {
                etatdelademande[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].etatdelademande;
                etatdelacommande[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].etatdelacommande;
                Fabricantname[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].Fabricantname;
                transporteurname[i] = medicaments[
                    pharmaciens[msg.sender].medicamentslist[i]
                ].transporteurname;
            }
        }
        return (
            etatdelademande,
            etatdelacommande,
            Fabricantname,
            transporteurname
        );
    }
}
