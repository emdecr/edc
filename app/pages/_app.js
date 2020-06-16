import { AnimatePresence } from "framer-motion";
import "../style.scss";

// This default export is required in a new `pages/_app.js` file.
export default function App({ Component, pageProps, router }) {
  return (
    <AnimatePresence>
      <div className="page-transition-wrapper">
        <Component {...pageProps} key={router.pathname} />
      </div>
    </AnimatePresence>
  );
}
