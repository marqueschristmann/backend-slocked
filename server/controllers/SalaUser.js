import Sala from "../models/SalaModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";
import SalaUser from "../models/SalaUserModel.js";


export const getSalasUser = async (req, res) =>{
    try {
        let response;
        function listaSalas(lista){
            const resposta = [];
            for(var i=0; i<lista.length; i++){
                resposta.push({id: lista[i].dataValues.salaId});
            }
            return resposta;
        };
        const lista = await SalaUser.findAll({
            attributes:['salaId'],
            where:{
                userId: req.userId
            },
        });
        console.log(lista[0].dataValues.salaId);
        response = await Sala.findAll({
            attributes:['uuid','name','numero','status'],
            where:{
                [Op.or]: listaSalas(lista)
            },
            include:[{
                model: User,
                attributes:['name','email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSalaUser = async(req, res) =>{
    const {salaId, userId} = req.body;
    try {
        await SalaUser.create({
            salaId: salaId,
            userId: userId
        });
        res.status(201).json({msg: "Sala Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSalaUser = async(req, res) =>{
    try {
        const sala = await Sala.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!sala) return res.status(404).json({msg: "Data not found"});
        const {name, numero, status} = req.body;
        if(req.role === "admin"){
            await Sala.destroy({
                where:{
                    id: sala.id
                }
            });
        }else{
            if(req.userId !== sala.userId) return res.status(403).json({msg: "Forbidden access"});
            await Sala.destroy({
                where:{
                    [Op.and]:[{id: sala.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Sala deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}