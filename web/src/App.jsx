import { RouterProvider } from "react-router-dom";
import router from "./components/router";
import Header from "./components/Header";
import Background from "./assets/background.jpg";

function App() {
  return (
    <div className="relative min-h-[100vh] w-full">
      <Header />
      <RouterProvider router={router} />
      <img
        src={Background}
        className="absolute top-0 left-0 h-full w-full object-fit z-10"
      />
    </div>
  );
}

export default App;
