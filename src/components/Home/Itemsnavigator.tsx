"use client";
import { Link as Link2 } from "react-scroll";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addtocart } from "@/redux/slices/product";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LoaderPinwheelIcon } from "lucide-react";
import LoadingSkeleton from "../Loaders/LoadingProducts";

const Itemsnavigator = () => {
  const menuitmes = [
    {
      _id: 1,
      title: "I'm Back!",
    },
    {
      _id: 2,
      title: "Starters",
    },
    {
      _id: 3,
      title: "Somewhat Local",
    },
    {
      _id: 4,
      title: "Somewhat Sooper",
    },
    {
      _id: 5,
      title: "Cheezy Treats",
    },
    {
      _id: 6,
      title: "Pizza Deals",
    },
    {
      _id: 7,
      title: "Sandwiches & Platters",
    },
    {
      _id: 8,
      title: "Special Pizza",
    },
    {
      _id: 9,
      title: "Somewhat Amazing",
    },
    {
      _id: 10,
      title: "Pastas",
    },
    {
      _id: 11,
      title: "Burgerz",
    },
    {
      _id: 12,
      title: "Side Orders",
    },
    {
      _id: 13,
      title: "Addons",
    },
  ];

  const dispatch = useAppDispatch();
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);

  async function getProducts() {
    try {
      setloading(true);
      const { data } = await axios.get("http://localhost:4000/products");
      console.log(data);
      setproducts(data.products);
    } catch (e: any) {
      toast.message(e.response.data.message);
    } finally {
      setloading(false);
    }
  }
  // function handleCardClick(product) {
  //   setproductObject(product);
  // }

  function handleAddToCartPress(product: any) {
    dispatch(
      addtocart({
        item: product,
      })
    );
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      {/* Navbar */}

      {/* Sections */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <nav className="md:mt-2 flex justify-center items-center ">
            <div className="scroll customScroll pb-5 container lg:w-full mx-auto flex lg:overflow-visible lg:min-h-20 lg:flex-wrap justify-between pl-5 items-center overflow-x-auto w-[90%]">
              <div className=" flex lg:flex-wrap justify-center items-center gap-2 md:gap-4 md:my-2 h-fit max-w-7xl lg:min-h-10  ">
                {menuitmes.map((item) => (
                  <Link2
                    to={`${item.title}`}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    key={item.title}
                    // Add activeClass prop
                    className="linkitem bg-slate-200 rounded-full   lg:text-[16px] lg:py-3 lg:px-4 py-2 px-2 hover:bg-yellow-300 cursor-pointer font-bold text-nowrap text-sm  "
                  >
                    {item.title}
                  </Link2>
                ))}
              </div>
            </div>
          </nav>
          {menuitmes.map((item) => (
            <section
              key={item._id}
              id={`${item.title}`}
              className=" flex flex-col  mb-10 mt-5 md:mt-10 p-2 last:pb-20"
            >
              <div className="divider border-t border-gray-300 mb-5 " />
              <div>
                <h2 className="text-xl max-w-7xl mx-auto md:2xl lg:text-3xl pl-2 lg:pl-10 2xl:p-0 font-bold ">
                  {item.title}
                </h2>
                <div className="cards max-w-7xl mx-auto pl-2 2xl:pl-0 lg:pl-8 mt-2 lg:mt-5 flex flex-wrap gap-5 md:gap- ">
                  {products
                    .filter((product: any) => product.category === item.title) // Filter products based on category
                    .map(
                      (
                        matchingproduct: any // Mapping over filtered products
                      ) => (
                        <div
                          className="w-[150px] md:w-[max-content]"
                          key={matchingproduct._id}
                        >
                          <div
                            className="
                        max-w-[150px]
                        lg:max-w-[200px] 
                        card bg-white md:max-w-[230px] p-1 rounded-3xl border-[2px]  border-gray-100 hover:border-yellow-300 hover:border-2 hover:shadow-md shadow-sm cursor-pointer"
                            // onClick={() => {
                            //   handleCardClick(matchingproduct.id);
                            // }}
                          >
                            <div className="thumbnail w-full min-h-40 sm:min-h-20 lg:min-h-[180px] relative mb-4 ">
                              <img
                                src={matchingproduct.thumbnail}
                                alt="logo"
                                className="rounded-2xl w-full"
                                loading="lazy"
                              />
                            </div>
                            {/* <div className="heart bg-gray-300 w-min rounded-full p-1 absolute top-1 right-1">
                          <RiHeartLine className="text-2xl text-white" />
                        </div> */}
                            <Link
                              href={`/products/${matchingproduct._id}`}
                              className="description md:mt-2"
                            >
                              <h1 className="font-bold md:text-lg text-center text-sm">
                                {matchingproduct.title}
                              </h1>
                              <p
                                className="text-center md:text-[14px]  text-[12px] "
                                title={matchingproduct.description}
                              >
                                {matchingproduct.description.length > 20
                                  ? matchingproduct.description
                                      .substring(0, 30)
                                      .concat("  ...more")
                                  : matchingproduct.description}
                              </p>
                            </Link>
                            <div className="divider border-t border-gray-300 md:mb-2 mt-5" />
                            <div className="pricing flex flex-col justify-center items-center">
                              <h3 className="font-bold text-md text-center text-red-500 ">
                                Rs {matchingproduct.price.toFixed(2)}
                              </h3>
                              <button
                                className=" bg-red-600 text-sm py-2 px-2  md:px-3 font-bold md:py-3 rounded-full  text-white hover:bg-yellow-400 hover:text-black mt-1 mb-1  "
                                onClick={() => {
                                  handleAddToCartPress(matchingproduct);
                                }}
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};

export default Itemsnavigator;
