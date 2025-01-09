import Carousel from "./Carousel";

const Slider = () => {
  const imagesarray = [
    "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/slider1.webp",
    "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/slider2.webp",
    "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/slider3.webp",
  ];

  return (
    <div className="max-w-[1900px]  min-h-[20vh] 2xl:min-h-[50vh]  mt-20 mb-10 mx-auto  p-2  flex justify-center pt-10 relative">
      <div className=" md:max-w-[80%] rounded-lg">
        <Carousel>
          {imagesarray.map((s) => (
            <img src={s} key={s} className="rounded-2xl" />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Slider;
