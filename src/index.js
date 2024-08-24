import connectDB from './db/index.js'
import app from './app.js'

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 2000, ()=>{
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("Mongodb connection Failed",error)
})