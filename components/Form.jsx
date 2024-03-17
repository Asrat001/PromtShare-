import Link from 'next/link'

const Form = ({ type, post, setPost, submtting, handleSubmiting }) => {
    console.log(post.recepe+" Recep")
    console.log(post.tag+" Recep")
    console.log(post.title+" Recep")


  return (
    <section className="wful min-w-full flex flex-start flex-col">
    <h1 className="head_text text-left blue_gradient">
        {type} Recepe
    </h1>
    <p className="desc  text-left max-w-md ">
        {type} and share your amazing recepes , your personal canvas for culinary expression! Here, you become the chef, artist, and storyteller as you craft your own delectable recipes to share with our community.
    </p>

    <form onSubmit={handleSubmiting} className=" mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
    <lablel>
        <span className=" font-satoshi  font-semibold  text-base  text-gray-700">
           Title
        </span>
     </lablel>
     <input
           value={post.title}
           onChange={(e)=>{setPost({...post ,title:e.target.value})}
          
          }
          type='text'
      placeholder="doro wat"
      required
     className="form_input"
     />
     <lablel>
        <span className=" font-satoshi  font-semibold  text-base  text-gray-700">Your Recepe</span>
     </lablel>
     <textarea
     value={post.recepe}
     onChange={(e)=>{setPost({...post ,recepe:e.target.value})}
    
    }
    placeholder="write your recepe here..."
    required
    className=" form_textarea"
     >

     </textarea>
     <lablel>
        <span className=" font-satoshi  font-semibold  text-base  text-gray-700">
            Tag 
            <span className=" font-normal">(#Ethiopian #የዖም #የፍስክ)</span>
        </span>
     </lablel>
     <input
        type='text'
         value={post.tag}
         onChange={(e)=>{setPost({...post ,tag:e.target.value})}
        
        }
      placeholder="#tag"
      required
     className="form_input"
     />
     <div className="flex-end  mx-3 mb-5  gap-4 ">
       <Link href="/" className=" text-gray-500  text-sm ">
        Cancel
       </Link>
       <button type="submit"
       className=" px-5  py-1.5  text-sm  bg-primary-orange rounded-full text-white"
       disabled={submtting}
        
       >
{submtting ? `${type}ing ...`:type}
       </button>
     </div>
    </form>
    </section>

    
  )

  
};

export default Form;
