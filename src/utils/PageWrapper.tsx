import { motion } from "framer-motion"
import { type ReactNode } from "react"

export const PageWrapper = ({children}: {children: ReactNode}) => {
    const variants = {
      hidden: { opacity: 0, x: -100 },
      enter: { opacity: 1, x: 0 },
      exit: { opacity: 0, y: 100 },
    };

  return (
    <motion.section
      className="md:w-[85%] md:left-[15%] md:rounded-tl-lg left-0 top-[60px] px-2 relative"
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
