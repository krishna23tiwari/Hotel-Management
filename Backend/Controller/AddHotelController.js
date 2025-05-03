const addstatemodel = require('../Model/AddStateModel')
const addhotelmodel = require('../Model/AddHotelModel')


exports.addHotel = async(req, res) =>{
    const {hotel, state, city} = req.body

    console.log(`>>>>req.body>>>>`, req.body)

    const date = new Date().toISOString().slice(0, 10); 

    const existinghotel = await addhotelmodel.findOne({hotel})

    if(existinghotel){
        return res.status(400).json({message : "This hotel is already exists"})
    }

    const newhoteladded = new addhotelmodel({
        hotel,
        state,
        city,
        date,
        status : 'active'
    })

    await newhoteladded.save();

    res.status(200).json({message: "Hotel successfully added"})

}


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

exports.softDeleteHotel = async(req,res) => {
      const {id} = req.params
        
        const updatestatus = await addhotelmodel.findByIdAndUpdate(
                id,
                {status: 'inactive'},
                {new: true}
            )
        
            if(!updatestatus){
                return res.status(404).json({message : 'user not found'})
            }
        
            res.status(200).json({message : "delete is done", updatestatus})
}


exports.activateHotel = async(req, res) => {
        const {id} = req.params
    
        const updatedentry = await addhotelmodel.findByIdAndUpdate(
            id,
            {status : 'active'},
            {new: true}
        )
    
        if(!updatedentry){
            return res.status(400).json({messgae: "Entry not found "})
        }
    
        res.status(200).json({message: "entry is activated"})
}


exports.hardDeleteHotel = async (req, res) => {
    const { id } = req.params;

    try {
        
        await addcitymodel.deleteMany({ state: id });

        // Delete the state itself
        const deleteState = await addstatemodel.findByIdAndDelete(id);

        if (!deleteState) {
            return res.status(400).json({ message: "State not found!" });
        }

        res.status(200).json({ message: "State and related cities deleted successfully!" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error." });
    }
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
