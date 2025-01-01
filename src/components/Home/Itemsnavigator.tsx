"use client";
import { Link as Link2 } from "react-scroll";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { addtocart } from "@/redux/slices/product";

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

  const products = [
    {
      _id: 1,
      title: "Fettuccine Alfredo Pasta",
      description:
        "Pasta Made In Yummiest White Sauce With Chicken Chunks Topped With Cheese",
      price: 990,
      category: "I'm Back!",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Fettuccine%20Alfredo%20Pasta.webp",
      quantity: 1,
    },
    {
      _id: 2,
      title: "Cheezy Sticks",
      description:
        "Freshly Baked Bread Filled With The Yummiest Cheese Blend To Satisfy Your Cravings.",
      price: 590,
      category: "Starters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Cheezy%20Sticks.webp",

      quantity: 1,
    },
    {
      _id: 3,
      title: "Oven Baked Wings",
      description: "Fresh Oven Baked Wings Served With Dip Sauce",
      price: 550,
      category: "Starters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Oven%20Baked%20Wings.webp",

      hasRange: true,
      quantity: 1,
      startingfrom: {
        pcs6: 550,
        pcs12: 1050,
      },
    },
    {
      _id: 4,
      title: "Flaming Wings",
      description:
        "Fresh Oven Baked Wings Tossed In Hot Peri Peri Sauce And Served With Dip Sauce",
      price: 600,
      category: "Starters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Flaming%20Wings.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        pcs6: 600,
        pcs12: 1150,
      },
    },

    {
      _id: 5,
      title: "Calzone Chunks",
      description: "4 Pcs Stuffed Calzone Chunks Served with Sauce & Fries",
      price: 1050,
      category: "Starters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp",
      quantity: 1,
    },

    {
      _id: 6,
      title: "Arabic Rolls",
      description:
        "4 Pcs Arabic Rolls Stuffed with Yummiest Mix Served with Sauce",
      price: 650,
      category: "Starters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Arabic%20Rolls.webp",
      quantity: 1,
    },
    {
      _id: 7,
      title: "Behari Rolls",
      description:
        "4 Pcs Behari Rolls Stuffed with Yummiest Mix Served with Sauce",
      price: 650,
      category: "Starters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Behari%20Rolls.webp",
      quantity: 1,
    },
    {
      _id: 8,
      title: "Chicken Tikka",
      description:
        "Tender Chunks of Marinated Grilled Chicken with Savory Onion",
      price: 590,
      category: "Somewhat Local",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicke%20Tikka.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 9,
      title: "Chicken Fajita",
      description:
        "An Authentic Taste of Fajita Marinated Chicken Onion and Bell Peppers.",
      price: 590,
      category: "Somewhat Local",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicken%20Fajita.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 10,
      title: "Chicken Lover",
      description:
        "Extreme Quantity of Chicken and Onion with Rich Mozzarella Cheese",
      price: 590,
      category: "Somewhat Local",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicken%20Lover.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 11,
      title: "Vegetable Pizza",
      description: "Vegetables, Pizza Sauce And Cheese",
      price: 590,
      category: "Somewhat Local",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Vegetable%20Pizza.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 12,
      title: "Chicken Tandoori",
      description:
        "Our Traditionally Developed Tandoori Chicken with Onion, Olives, Jalapeno and Tomato Sauce",
      price: 590,
      category: "Somewhat Local",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicken%20Tandoori.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 13,
      title: "Hot n Spicy",
      description: "Hot and Spicy Chicken Onion, Jalapeno",
      price: 590,
      category: "Somewhat Local",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Hot%20n%20Spicy.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 14,
      title: "Chicken Mushroom",
      description:
        "Tender Chunks of Marinated Grilled Chicken Tikka, Lots of Mushrooms, Onion and Tomato Sauce",
      price: 590,
      category: "Somewhat Sooper",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicken%20Mushroom.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 15,
      title: "Euro",
      description:
        "Delight Combination of Specially Marinated Smoked Chicken Bell Pepper, Mushrooms with Tomato Sauce",
      price: 590,
      category: "Somewhat Sooper",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Euro.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 16,
      title: "Chicken Supreme",
      description:
        "A Combination Of 3 Flavors of Chicken, Black Olives, Mushrooms Bell Pepper and Onion with Tomato Sauce.",
      price: 590,
      category: "Somewhat Sooper",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicken%20Supreme.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 17,
      title: "Cheese Lover Pizza",
      description: "Yummiest Blend of Cheese and Pizza Sauce",
      price: 590,
      category: "Somewhat Sooper",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Cheese%20Lover%20Pizza.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 18,
      title: "Chicken Pepperoni Pizza",
      description: "Chicken Pepperoni, Pizza Sauce and Cheese",
      price: 590,
      category: "Somewhat Sooper",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Chicken%20Pepperoni%20Pizza.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 19,
      title: "Black Pepper Tikka",
      description:
        "A Blend of Marinated Black Pepper Chicken, Onion & Bell Pepper",
      price: 590,
      category: "Somewhat Sooper",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Fish%20Tikka.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Small: 590,
        Regular: 1250,
        Large: 1650,
        Party: 2700,
      },
    },
    {
      _id: 20,
      title: "Cheezious Special",
      description:
        "Delicious Special Chicken with Black Olives, Sausages and Bell Pepper",
      price: 1450,
      category: "Cheezy Treats",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Sizzling%20Prawns.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 21,
      title: "Behari Kebab",
      description:
        "Enjoy Special Chicken Bihari Kabab, Grilled Chicken with Onion Jalapenos and Ginger Garnishing",
      price: 1450,
      category: "Cheezy Treats",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Mac%20and%20Cheese.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 22,
      title: "Chicken Extreme",
      description:
        "Combination Of 3 Flavors of Chicken with Onion Bell Pepper,Green Olives, Mushrooms and Special Sauce",
      price: 1450,
      category: "Cheezy Treats",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Grilled%20Paneer.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 23,
      title: "Small Pizza Deal",
      description:
        "Any Flavor From Local Love Or Over the Sea Flavor Category & 1 Soft Drink",
      price: 650,
      category: "Pizza Deals",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/BBQ%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 24,
      title: "Regular Pizza Deal",
      description: "1 Regular Pizza and 2 Regular Drinks.",
      price: 1350,
      category: "Pizza Deals",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Peri%20Peri%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 25,
      title: "Large Pizza Deal",
      description:
        "Any Flavor From Local Love Or Over the Sea Flavor Category & 1 Liter Drink",
      price: 1790,
      category: "Pizza Deals",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 26,
      title: "Special Roasted Platter",
      description: "4 Pcs Behari Rolls, 6pcs Wings Served with Fries & Sauce",
      price: 1080,
      category: "Sandwiches & Platters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 27,
      title: "Mexican Sandwich",
      description:
        "Mozzarella Dipped Chicken Topped with Garlic Sauce, Tomato’s Served in Baked Bread.",
      price: 850,
      category: "Sandwiches & Platters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 28,
      title: "Pizza Stacker",
      description:
        "A Unique Blend of Delicious Sauce, Crispy Chicken and Pizza Crust.",
      price: 850,
      category: "Sandwiches & Platters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 29,
      title: "Euro Sandwich",
      description:
        "Mozzarella Dipped Black Pepper Chicken Topped with Garlic Sauce, Pineapples and Tomato’s Served in Baked Bread.",
      price: 850,
      category: "Sandwiches & Platters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 30,
      title: "Classic Roll Platter",
      description:
        "4Pcs Behari Rolls, 4pcs Arabic Rolls Served with Fries & Sauce",
      price: 1080,
      category: "Sandwiches & Platters",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 31,
      title: "Crown Crust",
      description:
        "Scrumptious Pizza with A Yummy Blend of Grilled Chicken, Olives, Onion, Capsicum and Special Sauce",
      price: 1450,
      category: "Special Pizza",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 32,
      title: "Stuff Crust Pizza",
      description:
        "Special Chicken, Green Olives, Mushroom, Edges Filled With Cheese Or Kabab",
      price: 1500,
      category: "Special Pizza",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 33,
      title: "Somewhat Amazing 1",
      description: "2 Bazinga, Regular Fries, 2 Regular Drink",
      price: 1150,
      category: "Somewhat Amazing",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 34,
      title: "Somewhat Amazing 2",
      description:
        "2 Bazinga Burger,2 Pcs Chicken, Large Fries,2 Regular Drink",
      price: 1550,
      category: "Somewhat Amazing",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 35,
      title: "Somewhat Amazing 3",
      description: "3 Bazinga Burger, Large Fries, 1 Liter Drink",
      price: 1750,
      category: "Somewhat Amazing",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 36,
      title: "Somewhat Amazing 4",
      description: "3 Bazinga, 3 Chicken Pieces, 1 Liter Drink",
      price: 1850,
      category: "Somewhat Amazing",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 37,
      title: "Crunchy Chicken Pasta",
      description:
        "Yummiest Macaroni Pasta in White Sauce Topped with Crispy Chicken & Cheese",
      price: 1850,
      category: "Pastas",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      hasRange: true,
      quantity: 1,
      startingfrom: {
        Regular: 1450,
        Large: 1850,
        Party: 2900,
      },
    },
    {
      _id: 38,
      title: "Fettuccine Alfredo Pasta",
      description:
        "Pasta Made In Yummiest White Sauce With Chicken Chunks Topped With Cheese",
      price: 990,
      category: "Pastas",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 39,
      title: "Bazinga Supreme",
      description:
        "2 Crispy Fried To Perfection Boneless Thigh with Signature Sauce, Lettuce and A Cheese Slice Held in Corn-Dusted Bun.",
      price: 730,
      category: "Burgerz",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 40,
      title: "Reggy Burger",
      description:
        "Perfectly Fried Chicken Patty With Fresh Lettuce and Sauce in a Sesame Seed Bun",
      price: 390,
      category: "Burgerz",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 41,
      title: "Bazinga Burger",
      description:
        "Crispy Fried To Perfection Boneless Thigh with Signature Sauce and Lettuce Held in Corn-Dusted Bun.",
      price: 530,
      category: "Burgerz",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 42,
      title: "Fries",
      description: "Crispy Fried To Fries",
      price: 390,
      category: "Side Orders",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
    },
    {
      _id: 43,
      title: "Nuggets",
      description: "5 Pcs",
      price: 270,
      category: "Side Orders",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 44,
      title: "Mayo Dip",
      description: "",
      price: 70,
      category: "Addons",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 45,
      title: "Juics",
      description: "",
      price: 50,
      category: "Addons",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
    },
    {
      _id: 46,
      title: "Water Small",
      description: "",
      price: 50,
      category: "Addons",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
    {
      _id: 47,
      title: "Soft Drink",
      description: "",
      price: 70,
      category: "Addons",
      thumbnail:
        "https://plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Calzone%20Chunks.webp", //plrhlsmmhmuutumibwez.supabase.co/storage/v1/object/public/pictures/Korma%20Chicken.webp",
      quantity: 1,
    },
  ];
  const dispatch = useAppDispatch();

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

  return (
    <div>
      {/* Navbar */}
      <nav className="md:mt-2 flex justify-center items-center ">
        <div className="scroll container lg:w-full mx-auto flex lg:overflow-visible lg:min-h-20 lg:flex-wrap justify-between pl-5 items-center overflow-x-auto w-[90%]">
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

      {/* Sections */}
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
                .filter((product) => product.category === item.title) // Filter products based on category
                .map(
                  (
                    matchingproduct // Mapping over filtered products
                  ) => (
                    <Link
                      href="product"
                      // state={{
                      //   product: matchingproduct,
                      // }}
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
                        <div className="thumbnail w-full relative mb-4 ">
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
                        <div className="description md:mt-2">
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
                        </div>
                        <div className="divider border-t border-gray-300 md:mb-2 mt-5" />
                        <div className="pricing flex flex-col justify-center items-center">
                          <h3 className="font-bold text-md text-center text-red-500 ">
                            Rs {matchingproduct.price.toFixed(2)}
                          </h3>
                          <Link href={"/"} className="addtocartbutton">
                            <button
                              className=" bg-red-600 text-sm py-2 px-2  md:px-3 font-bold md:py-3 rounded-full  text-white hover:bg-yellow-400 hover:text-black mt-1 mb-1  "
                              onClick={() => {
                                handleAddToCartPress(matchingproduct);
                              }}
                            >
                              Add to cart
                            </button>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  )
                )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Itemsnavigator;
