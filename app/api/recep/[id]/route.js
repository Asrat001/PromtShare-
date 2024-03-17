//Get 
import {conectTODB} from  '@utils/database'
import Recep from '@models/recep';


export const GET = async (request ,{params}) =>{

    try {
        
        await conectTODB()
        const receps= await Recep.findById(params.id).populate('creator');
     if(!receps) return new Response("recepe  not found",{status:400})    
      return new Response(JSON.stringify(receps),{status:200})
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all Receps",{
            status:500
        })
    }
}

//Patch
export const PATCH = async (req , {params})=>{

    const {recepe , title , tag} =await req.json()
    try {
       await conectTODB();
       const existingRecepe = await Recep.findById(params.id)
       if (!existingRecepe) new Response("recepe not found",{status:404})
       existingRecepe.title = title?.trim().length===0 ? existingRecepe.title:title
       existingRecepe.recepe = recepe?.trim().length===0 ? existingRecepe.recepe:recepe
       existingRecepe.tag = tag?.trim().length===0 ? existingRecepe.tag:tag
       await existingRecepe.save();
       return  new Response(JSON.stringify(existingRecepe),{status: 200})
    } catch (error) {
        
        new Response("Failed to update recepe",{status:500})
    }


}    

//Delete

export const DELETE =async (req ,{params})=>{
    try {
         await conectTODB() 
         await Recep.findByIdAndDelete(params.id)
         return new Response (" Recepe Deleted Sucssfuly",{status:200})
        
    } catch (error) {
        return new Response(" Faileld to Delete the Recepe",{status:500})
    }
}