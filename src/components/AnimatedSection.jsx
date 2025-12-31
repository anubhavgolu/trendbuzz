import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedSection({ children, animationKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
