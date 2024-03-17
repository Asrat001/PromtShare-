'use client'
import {useEffect, useState} from 'react'
import { useRouter ,useSearchParams} from 'next/navigation'
import Form from '@components/Form'

const EditRecepe = () => {
  const router = useRouter();
//   const { data: session } = useSession();
  const serachParems = useSearchParams();
     const recepId = serachParems.get("id")
  const [submtting,setSubmitting]=useState(false)
  const [post , setPost]=useState({
    title:"",
    recepe:"",
    tag:""

  })
 useEffect(() => {
   const getRecepeDetails = async ()=>{
    const response = await fetch(`/api/recep/${recepId}`)

    const data = await response.json();
    setPost({
        title:data.title,
        recepe:data.recepe,
        tag:data.tag
    
      })
   }
    if(recepId) getRecepeDetails()
 
 }, [recepId])

 const updatePrompt = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  if (!recepId) return alert("Missing Recep!");
 console.log(recepId)
  try {
    const response = await fetch(`/api/recep/${recepId}`, {
      method: "PATCH",
      body: JSON.stringify({
        title:post.title,
        recepe: post.recepe,
        tag: post.tag,
      }),
    });

    if (response.ok) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setSubmitting(false);
  }
};


  return (
     <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submtting={submtting}
      handleSubmiting={updatePrompt}
     />
  )
}
export default EditRecepe