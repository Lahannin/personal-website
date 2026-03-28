import { BrowserRouter } from "react-router-dom";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import AppRoutes from "./AppRoutes";

const App = () => (
  <MotionConfig reducedMotion="user">
    <LazyMotion features={domAnimation}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </LazyMotion>
  </MotionConfig>
);

export default App;
