const addcitymodel = require('../Model/AddCityModel')
const addstatemodel = require('../Model/AddStateModel')
const addhotelmodel = require('../Model/AddHotelModel')
const addroommodel = require ('../Model/AddRoomModel')
var jwt = require('jsonwebtoken');
// const { findByIdAndUpdate } = require('../Model/UserModel');
const secret = "asasfasfijqwijjqwmnasfa"


exports.AddCityStateInForm = async(req, res) =>{
    const {state, city} = req.body

    console.log(`>>>>req.body>>>>`, req.body)

    const date = new Date().toISOString().slice(0, 10); 

    const existingcity = await addcitymodel.findOne({city})

    if(existingcity){
        return res.status(400).json({message: "city is already exists"})
    }

    const newCityAndStateAdd = new addcitymodel({
        state,
        city,
        date,
        status : 'active'
    })

    await newCityAndStateAdd.save();

    res.status(200).json({message: "city successfully saved"})

}

exports.GetAllCityState = async(req, res) =>{
    
    const allData = await addcitymodel.find()

    if(!allData){
        return res.status(500).json({message: "error fetching data"})
    }else{
        return res.status(200).json({ message: "All city and state data fetched", data: allData })
    }

}

// exports.getAllStatesFromStates = async(req, res) => {

//     const cities = await addcitymodel.find()
//     .populate("state")

//     console.log(`>>>cities>>>>`, cities)

//     if(!cities){
//         return res.status(400).json({message: "data not found"})
//     }

//     return res.status(200).json({ status: true, message: "Location fetched Successfully", state: cities })

// }

exports.getAllStatesFromStates = async(req, res) => {
    
    const cities = await addcitymodel.aggregate([
        {
            $lookup:{
                from: "addstates",
                localField: "state",
                foreignField: "_id",
                as : "stateinfo "

            }
        }
    ])

        console.log(`>>>cities>>>>`, cities)

    if(!cities){
        return res.status(400).json({message: "data not found"})
    }

    return res.status(200).json({ status: true, message: "Location fetched Successfully", state: cities })

}




  

exports.UpdateCityState = async(req, res) => {
    const {id} = req.params
    const {city, state, status} = req.body

    try{
        const updatedtask = await addcitymodel.findByIdAndUpdate(id, { city, state, status }, {new: true})
        return res.json({message: 'Update is complete', updatedtask})
    }catch{
        return res.status(500).json({message: 'failed to update',})
    }

}



exports.softdelete = async (req, res) => {
    const { id } = req.params;
  
    const updatedCity = await addcitymodel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true }
    );
  
    if (!updatedCity) {
      return res.status(404).json({ message: 'City not found' });
    }
  
    const hotels = await addhotelmodel.find({ city: id });
    const hotelIds = hotels.map(hotel => hotel._id);
  
    const updatedHotels = await addhotelmodel.updateMany(
      { city: id },
      { status: 'inactive' }
    );
  
    const updatedRooms = await addroommodel.updateMany(
      { hotel: { $in: hotelIds } },
      { status: 'inactive' }
    );
  
    res.status(200).json({
      message: 'City, hotels, and related rooms deactivated successfully',
      updatedCity,
      deactivatedHotelsCount: updatedHotels.modifiedCount,
      deactivatedRoomsCount: updatedRooms.modifiedCount
    });
  };



exports.ActivateEntryFromDeactivation = async (req, res) => {
    const { id } = req.params;
    const city = await addcitymodel.findById(id).populate('state');
    if (!city) return res.status(404).json({ message: 'City not found' });
    if (city.state?.status !== 'active')
      return res
        .status(400)
        .json({ message: 'Cannot activate city because its state is inactive' });
  
    const updatedCity = await addcitymodel.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );
  
    const hotels = await addhotelmodel.find({ city: id });
    const hotelIds = hotels.map(h => h._id);
  
    const { modifiedCount: activatedHotelsCount } = await addhotelmodel.updateMany(
      { city: id },
      { status: 'active' }
    );
  
    const { modifiedCount: activatedRoomsCount } = await addroommodel.updateMany(
      { hotel: { $in: hotelIds } },
      { status: 'active' }
    );
  
    return res.status(200).json({
      message: 'City, hotels, and related rooms activated successfully',
      updatedCity,
      activatedHotelsCount,
      activatedRoomsCount
    });
  };
    


exports.hardDelete = async (req, res) => {
    const { id } = req.params;
  
    const deleteEntry = await addcitymodel.findByIdAndDelete(id);
  
    if (!deleteEntry) {
      return res.status(404).json({ message: "City not found!" });
    }
  
    const hotels = await addhotelmodel.find({ city: id });
    const hotelIds = hotels.map(hotel => hotel._id);
  
    const deletedRooms = await addroommodel.deleteMany({ hotel: { $in: hotelIds } });
  
    const deletedHotels = await addhotelmodel.deleteMany({ city: id });
  
    res.status(200).json({
      message: "City, hotels, and related rooms deleted successfully",
      deletedCity: deleteEntry,
      deletedHotelsCount: deletedHotels.deletedCount,
      deletedRoomsCount: deletedRooms.deletedCount
    });
  };
  
  

