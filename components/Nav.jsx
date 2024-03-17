 "use client"
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'
import {useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/assets/images/logo.png'

const Nav = () => {
 const {data:session}=useSession()
  const [providers,setProviders]=useState(null);
  const [toggle,setToggle]=useState(false);
  useEffect(( )=>{
    const setUpProviders= async ( )=>{
      const response = await getProviders();
      setProviders(response)
    }
    setUpProviders();
  },[])
  return (
    <nav className="flex-between w-full pt-3 mb- items-center">
     <Link href="/" className="flex gap-2">
   <Image
   src={logo} alt="logo"
   width={50}
   height={50}
   className=" object-contain"
   />
   <p className="logo_text">ላጤ recipes</p>
     </Link>
     {/*desktop navigation */}
     <div className="sm:flex  hidden">
    {
      session?.user ? (
      <div className="flex gap-3 md:gap-5">
<Link href="/create-recepe" className="black_btn">
create Recepe
</Link>
<button type="button" onClick={signOut} className="outline_btn">
sign Out
</button>
<Link href="/profile">
  <Image
  src={session?.user.image}
  width={37}
  height={37}
  className="rounded-full"
  alt="profile picture"
  />
</Link>
      </div>):
    (  <>
      {
        providers && Object.values(providers).map(provider =>(
          <button
          type="button"
          key={provider.name}
          onClick={()=> signIn(provider.id)}
          className="black_btn"
          >
            Sign In

          </button>
        ))
      }
      </>)
    }
     </div>
      {/*mobile app navigation */}
      {console.log(session?.user.image)}
      <div className="sm:hidden flex relative">
        {
        session?.user  ? (
    <div className="flex">
<Image
src={session?.user?.
image
}
width={37}
height={37}
className="rounded-full"
alt="profile"
onClick={()=>setToggle((prev)=>!prev)}
/>
{
  toggle && (
    <div className="dropdown">
    <Link
    href="/profile"
    className="dropdown_link"
    onClick={()=>setToggle(false)}
    >
      my profile
    </Link>
    <Link
    href="/create-recepe"
    className="dropdown_link"
    onClick={()=>setToggle(false)}
    >
      create recepe
    </Link>
    <button
    type="button"
    onClick={()=>{setToggle(false), signOut}}
    className="mt-5 w-full black_btn "
    >
      Sign Out
    </button>
      </div>
  )
}
    </div>
          ):(  <>
            {
              providers && Object.values(providers).map(provider =>(
                <button
                type="button"
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className="black_btn"
                >
                  Sign In
      
                </button>
              ))
            }
            </>)
        }
      </div>
    </nav>
  )
}

export default Nav