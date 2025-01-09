"use client";
import NewsLetter from "@/components/Home/NewsLetter";
import ProductDetails from "@/components/Product/ProductDetails";
import SubSection from "@/components/Product/SubSection";
import { use, useEffect, useState } from "react";
import Loading from "./loading";

const Page = ({ params }: any) => {
  const { id } = use(params);

  const [data, setData] = useState<any>(null); // Initializing as null, to represent no data yet

  // Fetch product data based on the id
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:4000/products/${id}`);
      const d = await res.json();
      console.log("Fetched data:", d);
      setData(d);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("data", data);
  // Fetch the data when the component mounts
  useEffect(() => {
    if (id) {
      // Ensure id exists before fetching
      fetchData();
    }
  }, [id]); // Adding `id` to dependencies to refetch data when the id changes

  // Show loading message until data is fetched
  if (!data)
    return (
      <div className="min-h-50vh mt-40  max-w-7xl mx-auto  w-full">
        <Loading />
      </div>
    );
  //   {
  //     "rating": 4,
  //     "comment": "Very satisfied!",
  //     "date": "2024-05-23T08:56:21.618Z",
  //     "reviewerName": "Liam Garcia",
  //     "reviewerEmail": "liam.garcia@x.dummyjson.com"
  // }
  return (
    <div>
      <div className="mx-auto max-w-7xl mt-20 max-md:px-5  max-2xl:px-10">
        <ProductDetails data={data} />
        {/* <SubSection data={data} /> */}
      </div>
      {/* <NewsLetter /> */}
    </div>
  );
};

export default Page;
