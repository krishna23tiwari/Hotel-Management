const couponmodel = require('../Model/CouponForUser')

exports.addcoupon = async(req, res) => {

    const {couponName, discount, startDate, endDate, isActive } = req.body

    console.log(`>>>>coupon req.body>>>>`, req.body)

    const existinCoupon = await couponmodel.findOne({couponName})

    if(existinCoupon){
        return res.statue(400).json({message: "Coupon is already exists"})
    }

    const coupon = new couponmodel({couponName, discount, startDate, endDate, isActive})

    await coupon.save()

    return res.status(200).json({message: "New Coupon has been added"})
}


exports.getallcoupon = async(req,res) =>{
    
    const showallcoupon = await couponmodel.find()

    if(!showallcoupon){
        return res.status(400).json({message: "Error in fectching all coupons"})
    }

    res.status(200).json({message: "All coupons are fetched", showallcoupon})
}

exports.harddelete = async(req, res) => {

    const {id} = req.params

    const findCouponAndDelete = await couponmodel.findByIdAndDelete(id)

    if(!findCouponAndDelete){
        return res.status(400).json({message: "No Coupon found for delete"})
    }

    res.status(200).json({message: "Coupon has been deleted"})
}

exports.softdelete = async(req,res) =>{

    const {id} = req.params

    const softdelete = await couponmodel.findByIdAndUpdate(
        id,
        {isActive: "false"},
        {new: true}
    )

    console.log(`>>>>softdelet>>>`,softdelete)

    if(!softdelete){
        return res.status(400).json({message: "Found some error "})
    }

    res.status(200).json({message: "Soft Delete done successfully"})
}

exports.activatecoupon = async(req, res) => {

    const {id} = req.params

    const activatecoupon = await couponmodel.findByIdAndUpdate(
        id,
        {isActive: 'true'},
        {new: true}
    )

    if(!activatecoupon){
        res.statue(400).json({message: "Error Activating Coupon"})
    }

    res.status(200).json({message: "Activated coupon from deactivation"})
}

exports.updatecoupon = async(req,res) => {

    const {id} = req.params
    const{couponName, discount, startDate, endDate} = req.body

    const updatecopon = await couponmodel.findById(id)

    if(!updatecopon){
        return res.status(400).json({message: "Eroor updating coupon"})
    }

    const updatedcoupon = await couponmodel.findByIdAndUpdate(
        id,
        {
            couponName,
            discount,
            startDate,
            endDate,
        }
    )

    res.status(200).json({message: "Coupon has been updated", data: updatedcoupon})
}