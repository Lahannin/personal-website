import { BrowserRouter } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import AppRoutes from "./AppRoutes";

const App = () => (
  <LazyMotion features={domAnimation}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </LazyMotion>
);

export default App;
