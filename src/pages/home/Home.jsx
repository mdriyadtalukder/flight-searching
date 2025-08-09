import InputForm from "../../components/InputForm";
import FAQ from "../../components/FAQ";
import Hero from "../../components/Hero";
import PopularRoutes from "../../components/popularRoutes/PopularRoutes";

const Home = () => {
  return (
    <>
      <InputForm></InputForm>
      <div className=" bg-gradient-to-br from-purple-200 via-purple-100 to-blue-200 pt-14">
        <Hero></Hero>
        <PopularRoutes></PopularRoutes>
        <FAQ></FAQ>
      </div>
    </>
  );
};

export default Home;
