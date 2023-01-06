import Sala from "../models/SalaModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getSalas = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin" , "user"){
            response = await Sala.findAll({
                attributes:['uuid','name','numero','status'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Sala.findAll({
                attributes:['uuid','name','numero','status'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getSalaById = async(req, res) =>{
    try {
        const sala = await Sala.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!sala) return res.status(404).json({msg: "Data not found"});
        let response;
        if(req.role === "admin" , "user"){
            response = await Sala.findOne({
                attributes:['uuid','name','numero','status'],
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Sala.findOne({
                attributes:['uuid','name','numero','status'],
                where:{
                    [Op.and]:[{id: sala.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createSala = async(req, res) =>{
    const {name, numero, status} = req.body;
    try {
        await Sala.create({
            name: name,
            numero: numero,
            status: status,
            userId: req.userId
        });
        res.status(201).json({msg: "Sala Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateSala = async(req, res) =>{
    try {
        const sala = await Sala.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!sala) return res.status(404).json({msg: "Data not found"});
        const {name, numero, status} = req.body;
        if(req.role === "admin"){
            await Sala.update({name, numero, status},{
                where:{
                    id: sala.id
                }
            });
        }else{
            if(req.userId !== sala.userId) return res.status(403).json({msg: "Forbidden access"});
            await Sala.update({name, numero, status},{
                where:{
                    [Op.and]:[{id: sala.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Sala updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteSala = async(req, res) =>{
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