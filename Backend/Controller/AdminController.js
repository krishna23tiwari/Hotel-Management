const adminmodel = require('../Model/AdminModel')
const addstatemodel = require('../Model/AddStateModel')
var jwt = require('jsonwebtoken');
const { findByIdAndUpdate } = require('../Model/UserModel');
const secret = "asasfasfijqwijjqwmnasfa"


exports.AddCityStateInForm = async(req, res) =>{
    const {state, city} = req.body

    console.log(`>>>>req.body>>>>`, req.body)

    const date = new Date().toISOString().slice(0, 10); 

    const newCityAndStateAdd = new adminmodel({
        state,
        city,
        date,
        status : 'active'
    })

    await newCityAndStateAdd.save();

    res.status(200).json({message: "city successfully saved"})

}

exports.GetAllCityState = async(req, res) =>{
    
    const allData = await adminmodel.find()

    if(!allData){
        return res.status(500).json({message: "error fetching data"})
    }else{
        return res.status(200).json({ message: "All city and state data fetched", data: allData })
    }

}

exports.getAllStatesFromStates = async(req, res) => {

    const cities = await addstatemodel.find()
    .populate('state')

    console.log(`>>>cities>>>>`, cities)

    if(!cities){
        return res.status(400).json({message: "data not found"})
    }

    res.status(200).json({ state: cities })

}



  

exports.UpdateCityState = async(req, res) => {
    const {id} = req.params
    const {city, state, status} = req.body

    try{
        const updatedtask = await adminmodel.findByIdAndUpdate(id, { city, state, status }, {new: true})
        return res.json({message: 'Update is complete', updatedtask})
    }catch{
        return res.status(500).json({message: 'failed to update',})
    }

}

exports.softdelete = async(req,res) => {
    const {id} = req.params

    const updatestatus = await adminmodel.findByIdAndUpdate(
        id,
        {status: 'inactive'},
        {new: true}
    )

    if(!updatestatus){
        return res.status(404).json({message : 'user not found'})
    }

    res.status(200).json({message : "delete is done", updatestatus})
}


exports.hardDelete = async (req, res) => {
    const { id } = req.params;
    
    const deleteEntry = await adminmodel.findByIdAndDelete(id)

    if(!deleteEntry){
        return res.status(400).json({message:  "entry not found !!"})
    }

    res.status(200).json({message: "entry deleted successfully"})
  };



exports.ActivateEntryFromDeactivation = async(req, res) => {
    const {id} = req.params

    const updatedentry = await adminmodel.findByIdAndUpdate(
        id,
        {status : 'active'},
        {new: true}
    )

    if(!updatedentry){
        return res.status(400).json({messgae: "Entry not found "})
    }

    res.status(200).json({message: "entry is activated"})
}
  