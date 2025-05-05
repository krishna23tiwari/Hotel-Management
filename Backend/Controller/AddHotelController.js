const addstatemodel = require('../Model/AddStateModel')
const addhotelmodel = require('../Model/AddHotelModel')
const addroommodel = require ('../Model/AddRoomModel')
const addcitymodel = require('../Model/AddCityModel');

// exports.addHotel = async(req, res) =>{
//     const {hotel, state, city} = req.body

//     console.log(`>>>>req.body>>>>`, req.body)

//     const date = new Date().toISOString().slice(0, 10); 

//     const existinghotel = await addhotelmodel.findOne({hotel})

//     if(existinghotel){
//         return res.status(400).json({message : "This hotel is already exists"})
//     }

//     const newhoteladded = new addhotelmodel({
//         hotel,
//         state,
//         city,
//         date,
//         status : 'active'
//     })

//     await newhoteladded.save();

//     res.status(200).json({message: "Hotel successfully added"})

// }



exports.addHotel = async (req, res) => {
    const {
      hotel,
      city,
      type,
      address,
      room,
      phone,
      email,
      description
    } = req.body;
  
    const date = new Date().toISOString().slice(0, 10);
  
    const existinghotel = await addhotelmodel.findOne({ hotel });
  
    if (existinghotel) {
      return res.status(400).json({ message: "This hotel already exists" });
    }
  
    const newhoteladded = new addhotelmodel({
      hotel,
      city,
      date,
      type,
      address,
      room,
      phone,
      email,
      description,
      status: 'active'
    });
  
    await newhoteladded.save();
  
    res.status(200).json({ message: "Hotel successfully added" });
  };
  


exports.getAllHotels = async(req, res) => {

       const allData = await addhotelmodel.find()
       .populate({
           path: 'city',
           populate: {
               path: 'state',
               model: 'AddState'
           }
       });

       console.log(allData)
    
        if(!allData){
            return res.status(500).json({message: "error fetching data"})
        }else{
            return res.status(200).json({ message: "All city and state data fetched", data: allData })
        }
}

exports.updateHotel = async(req, res) => {
    const {id} = req.params
    const {hotel} = req.body

     try{
            const updatedtask = await addhotelmodel.findByIdAndUpdate(id, 
                {hotel}, {new: true})
            return res.json({message: 'Update is complete', updatedtask})
        }catch{
            return res.status(500).json({message: 'failed to update',})
        }

}



exports.softDeleteHotel = async (req, res) => {
    const { id } = req.params;
  
    const updatestatus = await addhotelmodel.findByIdAndUpdate(
      id,
      { status: 'inactive' },
      { new: true }
    );
  
    if (!updatestatus) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
  
    await addroommodel.updateMany(
      { hotel: id },
      { status: 'inactive' }
    );
  
    res.status(200).json({
      message: "Hotel and related rooms deactivated successfully",
      updatedHotel: updatestatus
    });
  };


  exports.activateHotel = async (req, res) => {
    const { id } = req.params;
  
    const hotel = await addhotelmodel.findById(id).populate('city');
    if (!hotel) {
      return res.status(400).json({ message: 'Hotel not found' });
    }
  
    const city = hotel.city;
    if (city.status !== 'active') {
      return res.status(400).json({ message: 'Cannot activate hotel because its city is inactive' });
    }
  
    const state = await addstatemodel.findById(city.state);
    if (state.status !== 'active') {
      return res.status(400).json({ message: 'Cannot activate hotel because its associated state is inactive' });
    }
  
    const updatedHotel = await addhotelmodel.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true }
    );
  
    await addroommodel.updateMany(
      { hotel: id },
      { status: 'active' }
    );
  
    res.status(200).json({
      message: 'Hotel and related rooms activated successfully',
      updatedHotel
    });
  };
  


// exports.activateHotel = async (req, res) => {
//     const { id } = req.params;
  
//     const updatedentry = await addhotelmodel.findByIdAndUpdate(
//       id,
//       { status: 'active' },
//       { new: true }
//     );
  
//     if (!updatedentry) {
//       return res.status(400).json({ message: "Hotel not found" });
//     }
  
//     await addroommodel.updateMany(
//       { hotel: id },
//       { status: 'active' }
//     );
  
//     res.status(200).json({
//       message: "Hotel and related rooms activated successfully",
//       updatedHotel: updatedentry
//     });
//   };


  exports.hardDeleteHotel = async (req, res) => {
    const { id } = req.params;
  
    const deletedHotel = await addhotelmodel.findByIdAndDelete(id);
  
    if (!deletedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }
  
    const deletedRooms = await addroommodel.deleteMany({ hotel: id });
  
    res.status(200).json({
      message: "Hotel and related rooms deleted successfully",
      deletedHotel,
      deletedRoomsCount: deletedRooms.deletedCount
    });
  };
  
  



exports.getAllStateprint = async (req, res) => {
    try {
        const hotels = await addhotelmodel.find()
            .populate({
                path: 'city',
                populate: {
                    path: 'state',
                    model: 'AddState'
                }
            });

        if (!hotels) {
            return res.status(404).json({ message: 'No hotels found' });
        }

        return res.status(200).json({
            status: true,
            message: 'Hotels fetched successfully',
            data: hotels
        });

    } catch (err) {
        console.error("Error fetching hotels: ", err);
        return res.status(500).json({ message: "Server error" });
    }
};
