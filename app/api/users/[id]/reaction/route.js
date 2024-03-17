import {conectTODB} from  '@utils/database'
import Recep from '@models/recep';

export const POST = async (req ,{params}) =>{
    await conectTODB()
    if(req.method === 'POST'){
       try {
        const {type} =  await req.json()
        const recepe = await Recep.findById(params.id)
        if(!recepe) new Response("Recepe not found",{status: 404})
         if(type==="like"){
            recepe.likes++;
         }
         else if(type==="dislike"){
            recepe.dislikes++
         }

         recepe.save()
         return new Response("you liked the recepe",{status: 200})
       } catch (error) {
      return  new Response("sever error",{status:500})
       }
        
    }

}