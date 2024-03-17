 'use client'
 
 import {useState , useEffect} from 'react'
 import PromptCard from './PromptCard'

 const RecepCardList=({data,handelTagClick})=>{
  return (
    <div className="mt-16 prompt_layout">
      {
        data?.map((post)=>(
          <PromptCard
          key={post._id}
          post={post}
          handelTagClick={handelTagClick}
          />
        ))
      }
    </div>
  )

}
const Feed = ({}) => {
 const [serachText, setserachText] = useState("");
 const [posts, setPosts] = useState([])
 const [searchTimeout, setSearchTimeout] = useState(null);
 const [searchedResults, setSearchedResults] = useState([]);

 const filterPrompts = (searchtext) => {
  const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  return posts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
};

 const handelSearchChange =(e)=>{
  clearTimeout(searchTimeout);
  setserachText(e.target.value);
  console.log(e.target.value)
  // debounce method
  setSearchTimeout(
    setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
      console.log(searchResult)
    }, 800)
  );
 }
 const handleTagClick = (tagName) => {
  setserachText(tagName);
 console.log(" tag clicked")
  const searchResult = filterPrompts(tagName);
  setSearchedResults(searchResult);
};

 useEffect(()=>{
  const fetchPost= async ()=>{
    const respons = await fetch ('/api/recep');
    const data= await respons.json()
    setPosts(data)
  }
  fetchPost()
 },[])

  return (
   <section className="feed">
    <form className=" relative  w-full  felx-center">
      <input type="text" placeholder="serach for a tag or username" value={serachText} onChange={handelSearchChange }required className="search_input peer"/>

    </form>
    {serachText ? (
        <RecepCardList
          data={searchedResults}
          handelTagClick={handleTagClick}
        />
      ) : (
        <RecepCardList data={posts} handelTagClick={handleTagClick} />
      )}

   </section>
  )
}

export default Feed