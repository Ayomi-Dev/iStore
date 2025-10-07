import { motion } from "framer-motion"
import { type ReactNode } from "react"
import { useUserContext } from "../contexts/UserContext";

export const PageWrapper = ({children}: {children: ReactNode}) => {
    const variants = {
      hidden: { opacity: 0, x: -100 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, y: 100 },
    };
    const {sidePanel} = useUserContext()

  return (
    <motion.section
      className={`${sidePanel ? 'md:flex-1' : 'w-[97%] mx-auto'} overflow-auto h-screen  px-2 py-3`}
      initial="hidden"
      animate="enter"
      exit="exit" 
      variants={variants}
      transition={{ duration: .5, ease: 'easeInOut' }}
    >
      {children}

    </motion.section>
  )
}
