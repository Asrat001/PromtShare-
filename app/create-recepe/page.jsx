'use client'
import {useState} from 'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'

const CreateRecepe = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submtting,setSubmitting]=useState(false)
  const [post , setPost]=useState({
    title:"",
    recepe:"",
    tag:""

  })
 

 const CreateRecepes = async (e) =>{
  e.preventDefault()
  setSubmitting(true)
  try {
    const respose= await fetch('/api/recep/new',{
      method:'POST',
      body:JSON.stringify({
        title:post.title,
        recepe:post.recepe,
        tag:post.tag,
        userID:session?.user.id,
      })

    
    })
    if(respose.ok){
      router.push('/')
    }
    
  } catch (error) {

    console.log(error)

  }finally{
    setSubmitting(false)
  }
 }

  return (
     <Form
      type="create"
      post={post}
      setPost={setPost}
      submtting={submtting}
      handleSubmiting={CreateRecepes}
     />
  )
}
export default CreateRecepe