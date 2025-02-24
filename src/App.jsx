import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? ( <ProductPage setIsAuth={setIsAuth}/> ) : ( <LoginPage setIsAuth={setIsAuth}/>)
      }
    </>
  );
}
export default App;