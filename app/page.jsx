import Feed from "@components/Feed";

 const Home = () => {
  return (
        <section className=" w-full flex-center flex-col">
            <h1 className="head_text text-center">
      Discover & Share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center">
            Best Recipes
      </span>
            </h1>
            <p className="desc text-center">
            ላጤ Recipes is an open-source recipe sharing website designed for the modern world. Explore, create, and share creative recipes with our vibrant community.
            </p>

            <Feed/>
        </section>
  )
}


export default Home;