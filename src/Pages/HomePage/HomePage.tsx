import AuthorSpotlight from "../Home/Author/AuthorSpotlight";
import NewsSetter from "../Home/NewsSetter/NewsSetter";
import FeaturedCategories from "../Home/ShopByCategory/shopByCategory";
import AboutSection from "./AboutSection/AboutSection";
import Slider from "./Banner/slider";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

const HomePage = () => {
  return (
    <div>
      <Slider></Slider>
      <FeaturedCategories></FeaturedCategories>
      <FeaturedProducts></FeaturedProducts>
      <AboutSection></AboutSection>
      <AuthorSpotlight></AuthorSpotlight>
      <NewsSetter></NewsSetter>
    </div>
  );
};

export default HomePage;
