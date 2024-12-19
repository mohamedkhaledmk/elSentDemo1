import HeroHome from "../components/home/HeroHome";
import LiveHome from "../components/home/LiveHome";
import ProcessHome from "../components/home/ProcessHome";
import UpcommingHome from "../components/home/UpcommingHome";
import YoutubeLive from "../components/home/YoutubeLive";
import { register } from "swiper/element/bundle";

register();

const Home = () => {
  return (
    <>
      <HeroHome />
      <div className="px-5 lg:px-12 flex flex-col gap-20">
        <LiveHome />
        <YoutubeLive />
        <ProcessHome />
        <div className="text-white flex flex-col gap-8">
        </div>
      </div>
    </>
  );
};

export default Home;
