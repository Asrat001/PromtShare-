'use client'
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname,useRouter } from 'next/navigation'

const PromptCard = ({post ,handleEdit ,handleDelete,handelTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied , setCopied] =useState()
  const [likes ,setLikes] = useState(post.likes)
  const [dislikes , setDislikes]= useState(post.dislikes)
  const [submtting,setSubmitting]=useState(false)

  const handleProfileClick = () => {
   
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = (event) =>{
    event.stopPropagation();
    setCopied(post.recepe);
    console.log("clecked "+copied)
    navigator.clipboard.writeText(post.recepe)
    setTimeout(() => setCopied(false), 3000);
    console.log("after clecked")
  }
  const handleLikes= async(id)=>{
    setLikes(likes=>likes+1)
      try{

        const response = await fetch(`/api/users/${id}/reaction`,{
          method:'POST',
          body:JSON.stringify({
            type:'like'
          })
        })
       if(response.ok){
        setSubmitting(true)
       }
        

      }catch(error){
     alert("erro liking recepe")
      }
  }
  const handelDislikes = async (id)=>{
    setDislikes(likes=>likes+1)
    try{
      const response = await fetch(`/api/users/${id}/reaction`,{
        method:'POST',
        body:JSON.stringify({
          type:'dislike'
        })
      })
     if(response.ok){
      setSubmitting(true)
     }
      

    }catch(error){
   alert("erro liking recepe")
    }
  }

  return (
    <div className="prompt_card">
      <div className=" felx  justify-between  items-start gap-5">
        <div className=" flex  justify-start flex-1  items-center gap-3  cursor-pointer" onClick={handleProfileClick}>
          <Image
          src={post.creator.image}
          alt="user image"
          width={40}
          height={40}
          className=" rounded-full"
          />
          <div className="felx  flex-col ">
            <h3 className="font-satoshi font-semibold  text-gray-900  ">{post.creator.username}</h3>
            <p className=" font-inter text-sm  text-gray-500">{post.creator.email}</p>
          </div>
          <button className="copy_btn" onClick={handleCopy}>
             <Image
              src={copied===post.recepe ? '/assets/icons/tick.svg': '/assets/icons/copy.svg'}
              width={12}
              height={12}
              alt="copy image"
             />
          </button>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-70  font-bold'>{post.title}</p>
        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.recepe}</p>
       <div className="flex justify-between items-center">
       <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handelTagClick && handelTagClick(post.tag)}>{post.tag}</p>
       <div className="flex gap-4">
      <div className=" flex gap-2">
      <button className="copy_btn" disabled={submtting} onClick={()=>handleLikes(post._id)}>
          <BiSolidLike className=" text-orange-400"/>
        </button>
        <p>{likes}</p>
      </div>
        <div className=" flex gap-2">
        <button className="copy_btn" disabled={submtting} onClick={()=>handelDislikes(post._id)}>
        <BiSolidDislike className="text-red-400"/>
        </button>
        <p>{dislikes}</p>
        </div>
       </div>
       </div>
        {
          session?.user.id ===post.creator._id && pathName ==='/profile' &&(
          <div className=" mt-5 flex-start gap-4  border-t border-gray-300  pt-3 ">
                      <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
</div>
         
         )
        }
      </div>

    </div>
  )
}

export default PromptCard