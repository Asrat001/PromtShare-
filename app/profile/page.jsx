 'use client'
 import { useState,useEffect } from "react"
 import { useSession } from "next-auth/react"
 import { useRouter } from "next/navigation"
 import Profile from "@components/Profile"

const ProfilePage = () => {
   const {data:session} = useSession()
   const router = useRouter()
   const [posts , setPosts] =useState([])

   const  handleEdit=(post)=>{
   
    router.push(`/update-recepe?id=${post._id}`)
    
  }
  const handleDelete= async(post)=>{
    const hasConform = confirm("Are you sure you want to delete the Recepe")
    if(hasConform){
      try {
        await fetch(`api/recep/${post._id.toString()}`,{
          method: 'DELETE'
        })
    const filterdata = posts.filter((p)=>{p.id !== post._id})
    setPosts(filterdata)

      } catch (error) {
        console.log(error)
      }
    }


  }
  useEffect(()=>{
    const fetchPost= async ()=>{
      const respons = await fetch (`/api/users/${session?.user.id}/posts`)
      const data= await respons.json()
      setPosts(data)
    }
    if(session?.user.id) fetchPost()
   },[])
  return (
    <Profile
    name='my'
    desc="My Profile Page  Component Component  Description   Description  Description Description Description Description"
    data={posts}
    handleEdit={handleEdit}
    handelDelete={handleDelete}
  
    />
  )
}

 

export default ProfilePage