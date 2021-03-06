import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrapper } from "../store";
import "../style.scss";

// This default export is required in a new `pages/_app.js` file.
const MyApp = ({ Component, pageProps, router }) => {
  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren"
  };
  return (
    <AnimatePresence>
      <div className="page-transition-wrapper">
        <motion.div
          transition={spring}
          key={router.pathname}
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          id="page-transition-container"
        >
          <Component {...pageProps} key={router.pathname} />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default wrapper.withRedux(MyApp);
