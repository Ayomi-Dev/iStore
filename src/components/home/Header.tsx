import I2 from '../../assets/images (24).jpeg'
import I3 from '../../assets/images (26).jpeg'
import I5 from '../../assets/s21front.jpeg'
import I4 from '../../assets/home.png'
import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: I4,
    title: "Shop Premium Devices",
    subtitle: "Tech that elevates your lifestyle."
  },
  {
    image: I2,
    title: "Style Meets Innovation",
    subtitle: "Smart meets sleek in every device."
  },
  {
    image: I3,
    title: "All-in-One Store",
    subtitle: "One-stop shop for gadgets and gear."
  },
  {
    image: I5,
    title: "Next-Gen Smartphones",
    subtitle: "Future in your hands today."
  },
];


export const Header = () => {
  const [index, setIndex] = useState<number>(0);
  
  useEffect(() => {
    const loop = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds for each slide
    return () => clearInterval(loop);
  }, []);
  return (
    <div className="relative bg-white w-full py-2 md:h-screen ">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
          transition={{ duration: 1 }}
          className=" w-full mx-auto md:h-full flex flex-col md:flex-row items-center justify-center gap-6"
        > 
          
          <div className="w-full md:w-1/2 px-2">
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
            <p className="text-lg italic font-semibold text-[#f31b87]">{slides[index].subtitle}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      
    </div>
  )
}
