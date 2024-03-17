import mongoose from 'mongoose'

let isConnected =false;

export const conectTODB = async () =>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_recepe",
            useNewUrlParser: true,
            // useUnifiedTopology:true

        } ) 
      isConnected=true;
      console.log("DB connected");
    } catch (error) {
        console.log(error  +" CANT CONNECT");
    }
}

