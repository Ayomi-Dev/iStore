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
      className={`${sidePanel ? 'md:w-[85%] md:left-[15%] md:mx-0 ' : 'left-0 w-[97%] mx-auto'} min-h-screen  md:top-[10px] px-2 relative`}
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
