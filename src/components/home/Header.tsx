import I2 from '../../assets/images (24).jpeg'
import I3 from '../../assets/images (26).jpeg'
import I5 from '../../assets/s21front.jpeg'
import I4 from '../../assets/gettyimages-2150200129-612x612.jpg'
import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: I4,
    title: "Shop Premium Devices",
    subtitle: "Tech that elevates your lifestyle.",
    bg: "bg-red-100",
  },
  {
    image: I2,
    title: "Style Meets Innovation",
    subtitle: "Smart meets sleek in every device.",
    bg: "bg-blue-100",
  },
  {
    image: I3,
    title: "All-in-One Store",
    subtitle: "One-stop shop for gadgets and gear.",
    bg: "bg-green-100",
  },
  {
    image: I5,
    title: "Next-Gen Smartphones",
    subtitle: "Future in your hands today.",
    bg: "bg-yellow-100",
  },
];


export const Header = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const loop = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 4 seconds for each slide
    return () => clearInterval(loop);
  }, []);
  return (
    <div className="relative bg-white w-full h-screen ">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 1 }}
          className=" w-[90%] mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-6"
        >
          
          <div className="w-full md:w-1/2 h-[500px]">
            <img
              src={slides[index].image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>

       
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-800">
              {slides[index].title}
            </h1>
            <p className="text-lg text-gray-600">{slides[index].subtitle}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      
    </div>
  )
}
