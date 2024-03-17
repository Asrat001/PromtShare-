import  {Schema ,model,models}  from 'mongoose';

const RecepSchema = new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    recepe:{
        type:String,
        required:[true," recepe is required"],

    },
    title:{
        type:String,
        required:[true," tile is required"], 
    },
    tag:{
        type:String,
        required:[true," tag is required"],
    },
    likes:{type:Number,default:0},
    dislikes:{type:Number,default:0}
});

const Recep= models.Recep || model("Recep",RecepSchema);
export default Recep;