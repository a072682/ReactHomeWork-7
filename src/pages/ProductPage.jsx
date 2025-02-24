import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";
import Toast from "../components/Toast";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
    imageUrl: "",
    title: "",
    category: "",
    unit: "",
    origin_price: "",
    price: "",
    description: "",
    content: "",
    is_enabled: 0,
    imagesUrl: [""],
  };




function ProductPage({setIsAuth}){

    useEffect(() => {
    //從cookie取得token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,"$1");
    //預設所有請求都會帶入token
    axios.defaults.headers.common["Authorization"] = token;
    //執行確認是否有取得產品列表
    getProducts();
    }, []);

    //取得商品列表狀態
    const [products, setProducts] = useState([]);
    //取得商品列表函式
    const getProducts = async (page = 1) => {
    try {
        const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`);
        setProducts(res.data.products);
        setPageInfo(res.data.pagination);
        console.log("取得產品成功");
        console.log("更新的 pageInfo:", res.data.pagination);
    } catch (error) {
        alert("取得產品失敗");
    }
    };

      const [tempProduct, setTempProduct] = useState(defaultModalState);
      
      const [modalMode, setModalMode] = useState(null);

        const[pageInfo, setPageInfo] = useState({});

        const [isProductModalOpen,setIsProductModalOpen]=useState(false);

        const [isDelProductModalOpen,setIsDelProductModalOpen]=useState(false);

        const handlePageChange = (page) => {
            getProducts(page);
        }

        const handleLogout = async() => {
            try {
                const handleLogoutres = await axios.post(`${BASE_URL}/v2/logout`);
                console.log("登出成功",handleLogoutres.data);
                setIsAuth(false);
            } catch (error) {
                alert("登出失敗");
            }
        };


    const handleOpenProductModal = (mode, product) => {
    setModalMode(mode);
    switch (mode) {
        case "create":
            setTempProduct(defaultModalState);
            console.log("初始化表單");
        break;
        case "edit":
            setTempProduct(product);
        break;
        default:
        break;
    }

    setIsProductModalOpen(true);
    };

    const handleOpenDelProductModal = (product) => {
        setTempProduct(product);

        setIsDelProductModalOpen(true);
    };
  
    return(
        <>
            <div className="container py-5">
                <div className="row mb-3">
                    <div className="justify-content-end">
                        <button onClick={()=>{handleLogout()}} type="button" className="btn btn-secondary">
                        登出
                        </button>
                    </div>
                </div>      
                <div className="row">   
                    <div className="col">   
                        <div className="d-flex justify-content-between">  
                        <h2>產品列表</h2> 
                        <button
                            onClick={() => handleOpenProductModal("create")}
                            type="button"
                            className="btn btn-primary"
                        >
                            建立新的產品
                        </button> 
                        </div> 
                        <table className="table">               
                            <thead>                  
                                <tr>
                                    <th scope="col">產品名稱</th> 
                                    <th scope="col">原價</th> 
                                    <th scope="col">售價</th> 
                                    <th scope="col">是否啟用</th> 
                                    <th scope="col"></th> 
                                </tr>
                            </thead> 
                        <tbody>                
                            {products.map((product) => (
                            <tr key={product.id}>                    
                                <th scope="row">{product.title}</th> 
                                <td>{product.origin_price}</td> <td>{product.price}</td> 
                                <td>
                                {product.is_enabled ? (
                                    <span className="text-success">啟用</span>
                                ) : (
                                    <span>未啟用</span>
                                )}
                                </td> 
                                <td>                      
                                <div className="btn-group">                         
                                    <button
                                    onClick={() =>
                                        handleOpenProductModal("edit", product)
                                    }
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    >
                                    編輯
                                    </button> 
                                    <button
                                    onClick={() => handleOpenDelProductModal(product)}
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    >
                                    刪除
                                    </button> 
                                </div> 
                                </td> 
                            </tr>
                            ))} 
                        </tbody> 
                        </table> 
                    </div> 
                </div> 

                <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
            </div>
           
            <ProductModal isOpen={isProductModalOpen} setIsOpen={setIsProductModalOpen} modalMode={modalMode} tempProduct={tempProduct} getProducts={getProducts} />
            

            <DelProductModal getProducts={getProducts} isOpen={isDelProductModalOpen} setIsOpen={setIsDelProductModalOpen} tempProduct={tempProduct}/>

            <Toast />
        </>
    )
}

export default ProductPage