const addstatemodel = require('../Model/AddStateModel')
const addcitymodel = require('../Model/AddCityModel')
const addhotel = require('../Model/AddHotelModel')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
// const { findByIdAndUpdate } = require('../Model/UserModel');
const secret = "asasfasfijqwijjqwmnasfa"

exports.addingstate = async (req, res) => {
    const {state, code} = req.body

    console.log(`>>>>req.body for state>>>>`, req.body)

    const findstate = await addstatemodel.findOne({state})
    if(findstate){
        return res.status(400).json({message: "already have this state name"})
    }

    const date = new Date().toISOString().slice(0, 10); 

    const newStateAdded = new addstatemodel({
        state,
        code,
        date,
        status : 'active'
    })

    console.log(`>>>>newstateadded>>>>>`, newStateAdded)

    await newStateAdded.save()

    return res.status(200).json({message: "Sate is successfully added"})
}

exports.showAllState = async(req, res) =>{
    
    const getallstate = await addstatemodel.find()

    console.log(`>>>>getallstate>>>>`,getallstate)

    if(!getallstate){
        return res.status(400).json({message : "error to fetching state data"})
    }else{
       return res.status(200).json({message: "all state data fetched", data : getallstate})
    }
}

exports.updateState = async(req, res) => {
    const {id} = req.params
    const {state, stateCode} = req.body

     try{
            const updatedtask = await addstatemodel.findByIdAndUpdate(id, 
                {state, code: stateCode}, {new: true})
            return res.json({message: 'Update is complete', updatedtask})
        }catch{
            return res.status(500).json({message: 'failed to update',})
        }

}


exports.softDeleteState = async (req, res) => {
    const { id } = req.params;
  
    const updatedstate = await addstatemodel.findByIdAndUpdate(
        id,
        {status: 'inactive'},
        {new: true}
    )

    if (!updatedstate) {
        return res.status(404).json({ message: "State not found" });
      }

      const linkedCities = await addcitymodel.find({
        state: new mongoose.Types.ObjectId(id),
      });
console.log("Linked Cities:", linkedCities);


    await addcitymodel.updateMany(
        { state: id }, 
        { status: 'inactive' } 
    )

    res
    .status(200)
    .json({ message: "State and linked cities deactivated successfully" })
 
  };
  


exports.activateState = async(req, res) => {
        const {id} = req.params
    
        const updatedentry = await addstatemodel.findByIdAndUpdate(
            id,
            {status : 'active'},
            {new: true}
        )
    
        if(!updatedentry){
            return res.status(400).json({messgae: "Entry not found "})
        }
    
        res.status(200).json({message: "entry is activated"})
}

exports.hardDeleteState = async(req, res) => {
     const { id } = req.params;

        
        const deleteEntry = await addstatemodel.findByIdAndDelete(id)
    
        if(!deleteEntry){
            return res.status(400).json({message:  "entry not found !!"})
        }

        const deletecity = await addcitymodel.deleteMany({
            state: new mongoose.Types.ObjectId(id),
        })

        const deletehotel = await addhotel.deleteMany({
            state: new mongoose.Types.ObjectId(id),
        })

        console.log(`>>>delete>>>>`, deletecity)
    
        res.status(200).json({
            message: "State and linked cities permanently deleted successfully",
            deleteEntry,
            deletedCitiesCount: deletecity.deletedCount,
          });
}








  


