import FileUpload from "@/components/FileUpload";
import Collections from "@/components/Home/Collections";
import Features from "@/components/Home/Features";
import Hero from "@/components/Home/Hero";
import Instagram from "@/components/Home/Instagram";
import Itemsnavigator from "@/components/Home/Itemsnavigator";
import NewArrivals from "@/components/Home/NewArrivals";
import NewsLetter from "@/components/Home/NewsLetter";
import Promotion from "@/components/Home/Promotion";
import Slider from "@/components/Home/Slider";
import TopSellers from "@/components/Home/TopSellers";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Slider />
      <Itemsnavigator />
      {/* <Hero /> */}
      {/* <FileUpload /> */}
      {/* <NewArrivals />
      <Collections />
      <TopSellers />
      <Promotion />
      <div className="my-20 max-2xl:px-10 ">
        <Features />
      </div>
      <Instagram />
      <NewsLetter /> */}
    </main>
  );
}
