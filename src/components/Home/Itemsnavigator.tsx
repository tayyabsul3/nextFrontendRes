"use client";
import { Link as Link2 } from "react-scroll";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addtocart } from "@/redux/slices/product";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Lectern, LoaderPinwheelIcon } from "lucide-react";
import LoadingSkeleton from "../Loaders/LoadingProducts";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Itemsnavigator = () => {
  const dispatch = useAppDispatch();
  const [products, setproducts] = useState([
    {
      name: "Chicken Extreme",
      price: "1450",
      quantity: "1",
      description:
        "Combination of 3 Flavors of Chicken with Onion, Bell Pepper, Green Olives, Mushrooms, and Special Sauce.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "pizza",
      variation: true,
      customization: [
        {
          size: ["small", "regular", "medium", "large"],
          extra_topping: ["chicken", "cheese"],
        },
      ],
    },
    {
      name: "Cheezious Special",
      price: "1450",
      quantity: "1",
      description:
        "Delicious Special Chicken with Black Olives, Sausages, and Bell Pepper.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "pizza",
      variation: true,
      customization: [
        {
          size: ["small", "regular", "medium", "large"],
          extra_topping: ["chicken", "cheese"],
        },
      ],
    },
    {
      name: "Stuff Crust Pizza",
      price: "1500",
      quantity: "1",
      description:
        "Special Chicken, Green Olives, Mushroom, Edges Filled with Cheese or Kabab.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "Pizza",
      variation: true,
      customization: [
        {
          size: ["small", "regular", "medium", "large"],
          extra_topping: ["chicken", "cheese"],
        },
      ],
    },
    {
      name: "Somewhat Amazing 2",
      price: "1550",
      quantity: "1",
      description:
        "2 Bazinga Burger, 2 Pcs Chicken, Large Fries, 2 Regular Drink.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "burger",
      variation: false,
    },
    {
      name: "Somewhat Amazing 3",
      price: "1750",
      quantity: "1",
      description: "3 Bazinga Burger, Large Fries, 1 Liter Drink.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "burger",
      variation: false,
    },
    {
      name: "Large Pizza Deal",
      price: "1790",
      quantity: "1",
      description:
        "Any Flavor From Local Love or Over the Sea Flavor category & 1 Liter Drink.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "pizza",
      variation: true,
      customization: [
        {
          size: ["small", "regular", "medium", "large"],
          extra_topping: ["chicken", "cheese"],
        },
      ],
    },
    {
      name: "Crunchy Chicken Pasta",
      price: "1850",
      quantity: "1",
      description:
        "Yummiest Macaroni Pasta in White Sauce Topped with Crispy Chicken & Cheese.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "pizza",
      variation: false,
    },
    {
      name: "Somewhat Amazing 4",
      price: "1850",
      quantity: "1",
      description: "3 Bazinga Burger, 3 Chicken Pieces, 1 Liter Drink.",
      image:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      category: "burger",
      variation: false,
    },
  ]);
  const [menuitmes, setmenuitmes] = useState([
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
  ]);

  const [loading, setloading] = useState(true);

  // async function getProducts() {
  //   try {
  //     setloading(true);
  //     const { data } = await axios.get("http://localhost:4000/products");
  //     console.log(data);
  //     setproducts(data.products);
  //   } catch (e: any) {
  //     toast.message(e.response.data.message);
  //   } finally {
  //     setloading(false);
  //   }
  // }
  async function getCategories() {
    try {
      setloading(true);
      const { data } = await axios.post(
        "http://localhost:5000/companycategory/name",
        {
          company: "Dassoft",
        }
      );
      console.log("data", data);
      setmenuitmes(data.categories);
    } catch (e: any) {
      toast.message(e.response.data.message);
    } finally {
      setloading(false);
    }
  }
  // function handleCardClick(product) {
  //   setproductObject(product);
  // }

  const [variation, setvariation] = useState<any>();
  const variationRef = useRef<any>();
  function handleAddToCartPress(product: any) {
    if (product.variation) {
      setvariation(product);
      variationRef.current.click();
    } else {
      dispatch(
        addtocart({
          item: product,
        })
      );
    }
  }
  const addToCart = () => {
    let item;
    setvariation((prev: any) => {
      // Properly clone the entire variation object to avoid direct mutation
      const cloned = {
        ...prev,
        customization: [
          {
            ...prev.customization[0], // Clone the first customization object
            size: [selectedSize], // Now you can safely update the size array
          },
        ],
      };

      item = cloned;

      return cloned; // Return the updated cloned state
    });
    // Dispatch the updated variation to the cart
    dispatch(
      addtocart({
        item,
      })
    );
    setvariation(null);
  };

  const [selectedSize, setselectedSize] = useState("");
  const handleSizeSelect = (size: string) => {
    setselectedSize(size);
  };

  useEffect(() => {
    // getProducts();
    getCategories();
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
                <Dialog>
                  <DialogTitle className="text-2xl font-bold">
                    {variation?.name}
                  </DialogTitle>
                  <DialogTrigger
                    ref={variationRef}
                    className=" w-0 h-0 cursor-pointer"
                  ></DialogTrigger>
                  <DialogContent className="p-8 max-w-lg mx-auto">
                    <img
                      src={variation?.image}
                      alt="Variation Image"
                      className="w-60 h-60 mx-auto object-cover rounded-lg"
                    />
                    <div className="flex justify-between items-center">
                      <h1 className="text-xl font-bold mt-4">
                        {variation?.name}
                      </h1>
                      <p className="text-lg font-medium text-gray-700">
                        Rs {variation?.price}
                      </p>
                    </div>
                    <div className="sizes mt-4">
                      <h1 className="text-xl font-semibold">Sizes</h1>
                      {variation?.customization[0]?.size?.map(
                        (sizeOption: any, i: any) => (
                          <div
                            key={i}
                            className="size-option flex items-center mt-2"
                          >
                            <input
                              type="radio"
                              id={sizeOption}
                              name="size"
                              onChange={() => handleSizeSelect(sizeOption)}
                              className="mr-2 mt-1 h-4 w-4 accent-red-500 border-gray-300 rounded "
                            />
                            <label htmlFor={sizeOption} className="">
                              {sizeOption}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                    <div className="add-to-cart mt-4">
                      <DialogClose className="w-full">
                        <p
                          onClick={addToCart}
                          className="w-full py-3 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-400 focus:outline-none cursor-pointer "
                        >
                          Add to Cart
                        </p>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
                {menuitmes.map((item) => (
                  <Link2
                    to={`${item}`}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    key={item}
                    // Add activeClass prop
                    className="linkitem bg-slate-200 rounded-full   lg:text-[16px] lg:py-3 lg:px-4 py-2 px-2 hover:bg-yellow-300 cursor-pointer font-bold text-nowrap text-sm  "
                  >
                    {item}
                  </Link2>
                ))}
              </div>
            </div>
          </nav>
          {menuitmes.map((item: any) => (
            <section
              key={item}
              id={`${item}`}
              className=" flex flex-col  mb-10 mt-5 md:mt-10 p-2 last:pb-20"
            >
              <div className="divider border-t border-gray-300 mb-5 " />
              <div>
                <h2 className="text-xl max-w-7xl mx-auto md:2xl lg:text-3xl pl-2 lg:pl-10 2xl:p-0 font-bold ">
                  {item}
                </h2>
                <div className="cards max-w-7xl mx-auto pl-2 2xl:pl-0 lg:pl-8 mt-2 lg:mt-5 flex flex-wrap gap-5 md:gap- ">
                  {products
                    .filter((product: any) => product.category === item) // Filter products based on category
                    .map(
                      (
                        matchingproduct: any // Mapping over filtered products
                      ) => (
                        <div
                          className="w-[150px] md:w-[max-content]"
                          key={matchingproduct.name}
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
                                src={matchingproduct.image}
                                alt="logo"
                                className="rounded-2xl w-full"
                                loading="lazy"
                              />
                            </div>
                            {/* <div className="heart bg-gray-300 w-min rounded-full p-1 absolute top-1 right-1">
                          <RiHeartLine className="text-2xl text-white" />
                        </div> */}
                            <Link
                              href={`/products/${matchingproduct.name}`}
                              className="description md:mt-2"
                            >
                              <h1 className="font-bold md:text-lg text-center text-sm">
                                {matchingproduct.name}
                              </h1>
                              {/* <p
                                className="text-center md:text-[14px]  text-[12px] "
                                title={matchingproduct.description}
                              >
                                {matchingproduct.description.length > 20
                                  ? matchingproduct.description
                                      .substring(0, 30)
                                      .concat("  ...more")
                                  : matchingproduct.description}
                              </p> */}
                            </Link>
                            <div className="divider border-t border-gray-300 md:mb-2 mt-5" />
                            <div className="pricing flex flex-col justify-center items-center">
                              <h3 className="font-bold text-md text-center text-red-500 ">
                                Rs {matchingproduct.price}
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
