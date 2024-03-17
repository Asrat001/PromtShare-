import {conectTODB} from  '@utils/database'
import Recep from '@models/recep';


export const GET = async (request ,{params}) =>{
    try {
        
        await conectTODB()
        const receps= await Recep.find({creator:params.id}).populate('creator');
        return new Response(JSON.stringify(receps),{
            status:200
        })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all Receps",{
            status:500
        })
    }
}

