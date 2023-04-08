const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Getting all
router.get('/', async(req, res) => {
    try{
        const subscribers = await Subscriber.find()
        res.status(200).json(subscribers)
    }catch (err){
        res.status(500).json({ message: err.message })
    }
})

//Getting one
router.get('/:id', getSubscriber, async(req, res) => {
    //  const id = req.params.id
    //  const subscriber = await Subscriber.findById(id)
     return res.status(400).json(res.subscriber)

    // const id = req.params.id
    // console.log(id)
    // try{
    //     const subscriber = await Subscriber.findById(id)
    //     console.log("ssssssss", subscriber)
    //     if(subscriber === null) {
    //         return res.status(404).json({ message: 'Cannot find subscriber' })
    //     }
    //     //res.subscriber = subscriber
    //     res.status(200).json(subscriber.name)
    // }catch (err){
    //     console.log(err)
    //     return res.status(500).json({ message: err })
    }
)

//Creating one
router.post('/', async(req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    });
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }catch(err){
        res.status(400).json({ message: err.message })
    }
})
//Updating one
router.patch('/:id', getSubscriber, async(req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel
    }

    try{
        const updateSubscriber = await res.subscriber.save()
        res.json(updateSubscriber)
    }catch (err){
        res.status(400).json({ message: err.message})
    }
})
//Deleting one
router.delete('/:id', async(req, res) => {
    try{
        await Subscriber.deleteOne({_id: req.params.id})
        res.json({ message: "Successfully deleted subscriber"})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
// router.delete('/:id', getSubscriber, async(req, res) => {
//     try{
//         await res.subscriber.deleteOne()
//         res.json({ message: "Successfully deleted subscriber"})
//     } catch (err) {
//         res.status(500).json({ message: err.message})
//     }
// })


//get subscriber middleware
// async function getSubscriber(req, res, next)  {
//     let subscriber;
//     try{
//         subscriber = await Subscriber.findById(req.params.id)
//         console.log("ssssssss", subscriber)
//         if(!subscriber) {
//             return res.status(404).json({ message: 'Cannot find subscriber' })
//         }
//     }catch (err){
//         return res.status(500).json({ message: err.messsage })
//     }
//     res.subscriber = subscriber
//     next()
// }

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
      subscriber = await Subscriber.findById(req.params.id);
      if (subscriber === null) {
        return res.status(404).json({ message: 'Cannot find subscriber' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.subscriber = subscriber;
    next();
  }
module.exports = router