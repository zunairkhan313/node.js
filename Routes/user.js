const express = require("express")
const router = express.Router()

router.post('/',(req , res)=>{
    console.log('body console-->',req.body)
    res.send('Post called on user Route')
})

router.get('/',(req , res)=>{
    console.log('body query-->',req.query)
    res.send('Get called on user Route')
})

router.put('/:id',(req , res)=>{
    console.log('body params-->',req.params.id)
    res.send('put called on user Route')
})


router.delete('/:id',(req , res)=>{
    console.log('body params-->',req.params.id)
    res.send('Delete called on user Route')
})

module.exports = router