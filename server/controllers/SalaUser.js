import Sala from "../models/SalaModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";
import SalaUser from "../models/SalaUserModel.js";


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
            await SalaUser.destroy({
                where:{
                    salaId: sala.id
                }
            });
        }else{
            if(req.userId !== sala.userId) return res.status(403).json({msg: "Forbidden access"});
        }
        res.status(200).json({msg: "Access denied successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteUserSala = async(req, res) =>{
    try {
        const user = await User.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg: "Data not found"});
        const {name, email} = req.body;
        if(req.role === "admin"){
            await SalaUser.destroy({
                where:{
                    userId: user.id
                }
            });
        }else{
            if(req.userId !== user.userId) return res.status(403).json({msg: "Forbidden access"});
        }
        res.status(200).json({msg: "Access denied successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}