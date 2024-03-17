import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import {conectTODB} from  '@utils/database'
import User from '@models/user';

const handler =NextAuth({
    providers:[GoogleProvider({
        clientId:process.env.GOOGLE_ID, 
        clientSecret:process.env.GOOGLE_CLIENT_SECRET

    })
],
   callbacks:{
    async  session({session}){

        const sesionUser= await User.findOne({
            email:session.user.email
        })
        session.user.id=sesionUser._id.toString();
    
        return session
    },
    async signIn({profile}){
        try {
            await conectTODB()
            console.log("afret db connected")
            const userExists= await User.findOne({
                email:profile.email
            });

            if(!userExists){
                await User.create({
                    email:profile.email,
                    username:profile.name.replace(" ","").toLowerCase(),
                    image:profile.picture
                })
            }
       return true
            
        } catch (error) {
            console.log(error +" error logging")
        }
    },
   },
//    secret: process.env.NEXTAUTH_SECRET,

})

export  {handler as GET ,handler as POST}