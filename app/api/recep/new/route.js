import {conectTODB} from  '@utils/database'
import Recep from '@models/recep';


export const  POST =async (req) =>{
    const {userID , title , recepe ,tag} = await req.json();
    const likes =0;
    const dislikes=0;
    try {

        await conectTODB()
        const newRecepe = new Recep({
            creator:userID,
            title,
            recepe,
            tag,
            likes,
            dislikes
        })
 console.log("created")
        await newRecepe.save();
 console.log("after saved")
        return new Response(JSON.stringify(newRecepe),{status:201})
        
    } catch (error) {   
        console.log(error)
        return new Response("Faild to create a Recepe",{status:500}) 
    }
}