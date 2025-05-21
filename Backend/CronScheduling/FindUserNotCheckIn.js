// const cron = require('node-cron')
// const userbooking = require('../Model/ForUserBookingModel')


// cron.schedule('* * * * *', async() => {

//     const users = await userbooking.find({
//             status : 'pending',
//             ischecking : {$ne : 'checkIn'}
        
//     })

//     const mapping = {}

//     for (let i= 0; i < users.length; i++) {
//       const id = users[i].userId.toString()

//       mapping[id] = (mapping[id] || 0) + 1
//     }

//     for(let id in mapping){
//         if(mapping[id] >= 3){
//             console.log(`user ${id} has ${mapping[id]} failed`)
//         }
//     }

//     console.log(`>>>Bookings>>>>`, users);
//     console.log(`>>>>totalbookings>>>>`, users.length)
// })

