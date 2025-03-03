require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT || 5000
const app = express();
app.use(express.json())
app.use(cors())

const Movie = require('./schema.js')

const db = async()=>{
    try{
      await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB connected')
    }
    catch(e){
        console.log(e)
    }
}
db();

app.get('/film',(req,res)=>{
   res.status(200).json('Hello World')
});

app.post('/film',async(req,res)=>{
    try{
        const {title,director,genre,releaseyear,availablecopies} = req.body
        if(!title || !director || !genre || !releaseyear || !availablecopies === undefined)
            return res.status(400).json('Movie not reached')
        res.status(200).json('Movie reached')
        const film = new Movie.mongoose
        await film.save();
    }
    catch(e){
        console.log(e)
    }
});

app.put('/film/:id',async(req,res)=>{
    try{
    const updatedmovie = await Movie.FindByIdAndUpdate(req.params.id,req.body, {new:true})
    if(!updatedmovie)
        return res.status(404).json('Movie not updated')
    res.status(200).json('movie updated')
}catch(e){
    console.log(e)
}
})
app.delete('/film/:id',async(req,res)=>{
    try{
    const deletedmovie = await Movie.FindByIdAndDelete(req.params.id)
    if(!deletedmoviemovie)
        return res.status(404).json('Movie not deleted')
    res.status(200).json('movie deleted')
}catch(e){
    console.log(e)
}
});

app.listen(port,()=>{
    console.log(`connected: http//localhost:${port}`)
})