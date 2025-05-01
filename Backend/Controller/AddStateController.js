const addstatemodel = require('../Model/AddStateModel')
var jwt = require('jsonwebtoken');
// const { findByIdAndUpdate } = require('../Model/UserModel');
const secret = "asasfasfijqwijjqwmnasfa"

exports.addingstate = async (req, res) => {
    const {state, code} = req.body

    console.log(`>>>>req.body for state>>>>`, req.body)

    const date = new Date().toISOString().slice(0, 10); 

    const newStateAdded = new addstatemodel({
        state,
        code,
        date,
        status : 'active'
    })

    console.log(`>>>>newstateadded>>>>>`, newStateAdded)

    await newStateAdded.save()

    res.status(200).json({message: "Sate is successfully added"})
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