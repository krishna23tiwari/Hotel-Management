const addstatemodel = require('../Model/AddStateModel')
const addcitymodel = require('../Model/AddCityModel')
const addhotel = require('../Model/AddHotelModel')
const addroom = require('../Model/AddRoomModel')
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
      
        const updatedState = await addstatemodel.findByIdAndUpdate(
          id,
          { status: 'inactive' },
          { new: true }
        );
      
        if (!updatedState) {
          return res.status(404).json({ message: 'State not found' });
        }
      
        const linkedCities = await addcitymodel.find({ state: id });
        const cityIds = linkedCities.map(city => city._id);
      
        await addcitymodel.updateMany(
          { state: id },
          { status: 'inactive' }
        );
      
        const hotelUpdateResult = await addhotel.updateMany(
          { city: { $in: cityIds } },
          { status: 'inactive' }
        );
      
        const linkedHotels = await addhotel.find({ city: { $in: cityIds } });
        const hotelIds = linkedHotels.map(h => h._id);
      
        const roomUpdateResult = await addroom.updateMany(
          { hotel: { $in: hotelIds } },
          { status: 'inactive' }
        );
      
        res.status(200).json({
          message: 'State, cities, hotels, and rooms deactivated successfully',
          updatedState,
          deactivatedCitiesCount: cityIds.length,
          deactivatedHotelsCount: hotelUpdateResult.modifiedCount,
          deactivatedRoomsCount: roomUpdateResult.modifiedCount,
        });
      };



      
      exports.activateState = async (req, res) => {
        const { id } = req.params;

        const updatedEntry = await addstatemodel.findByIdAndUpdate(
          id,
          { status: 'active' },
          { new: true }
        );
      
        if (!updatedEntry) {
          return res.status(400).json({ message: 'Entry not found' });
        }

        const linkedCities = await addcitymodel.find({ state: id });
        const cityIds = linkedCities.map(city => city._id);
      
        await addcitymodel.updateMany(
          { state: id },
          { status: 'active' }
        );
      
        const hotelUpdateResult = await addhotel.updateMany(
          { city: { $in: cityIds } },
          { status: 'active' }
        );
      
        const linkedHotels = await addhotel.find({ city: { $in: cityIds } });
        const hotelIds = linkedHotels.map(h => h._id);
      
        const roomUpdateResult = await addroom.updateMany(
          { hotel: { $in: hotelIds } },
          { status: 'active' }
        );
      
        res.status(200).json({
          message: 'State, cities, hotels, and rooms activated successfully',
          updatedState: updatedEntry,
          activatedCitiesCount: cityIds.length,
          activatedHotelsCount: hotelUpdateResult.modifiedCount,
          activatedRoomsCount: roomUpdateResult.modifiedCount,
        });
      };


      
    

      exports.hardDeleteState = async (req, res) => {
        const { id } = req.params;

        const cities = await addcitymodel.find({ state: id });
        const cityIds = cities.map(city => city._id);
      

        const hotels = await addhotel.find({ city: { $in: cityIds } });
        const hotelIds = hotels.map(hotel => hotel._id);
    
        const deletedRooms = await addroom.deleteMany({ hotel: { $in: hotelIds } });
      
        const deletedHotels = await addhotel.deleteMany({ city: { $in: cityIds } });
      
        const deletedCities = await addcitymodel.deleteMany({ state: id });
      
        const deletedState = await addstatemodel.findByIdAndDelete(id);
      
        if (!deletedState) {
          return res.status(400).json({ message: 'State not found!' });
        }
      
        res.status(200).json({
          message: 'State, its cities, hotels, and rooms deleted successfully',
          deletedState,
          deletedCitiesCount: deletedCities.deletedCount,
          deletedHotelsCount: deletedHotels.deletedCount,
          deletedRoomsCount: deletedRooms.deletedCount,
        });
      };
      










  


