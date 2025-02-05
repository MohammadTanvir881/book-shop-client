import AboutSection from "./AboutSection/AboutSection";
import Slider from "./Banner/slider";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";



const HomePage = () => {
    return (
        <div>
           <Slider></Slider>
           <FeaturedProducts></FeaturedProducts>
           <AboutSection></AboutSection>
           
        </div>
    );
};

export default HomePage;