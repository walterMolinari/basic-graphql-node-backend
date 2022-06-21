import dotenv from 'dotenv'
dotenv.config()

import  mongoose from 'mongoose'

const conectionString = process.env.CONECTION_STRING

mongoose.connect(conectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( () => {
    console.log('Data base connected')
}).catch( err => {
    console.log(err)
})
