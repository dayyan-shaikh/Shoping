import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShoppingCartContext } from "../../context";

function ProductDetailsPage() {
  const { id } = useParams();
  const {
    productDetails,
    setProductDetails,
    loading,
    setLoading,
    handleAddCart,
  } = useContext(ShoppingCartContext);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      const apires = await fetch(`https://dummyjson.com/products/${id}`);
      const res = await apires.json();
      if (res) {
        setProductDetails(res);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);
  console.log(productDetails);
  if (loading) return <h1>Product Details Loading! Please wait </h1>;

  return (
    <div>
      <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
        <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-12 shadow-sm p-6">
          <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div className="px-4 py-10 rounded-xl shadow-lg relative">
              <img
                className="w-3/5 rounded object-cover"
                src={productDetails?.thumbnail}
                alt={productDetails?.title}
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
              {productDetails?.images?.length
                ? productDetails.images.map((imageItem) => {
                    return (
                      <div className="rounded-xl p-4 shadow-md" key={imageItem}>
                        <img
                          className="w-24 cursor-pointer"
                          src={imageItem}
                          alt="Product Secondary image"
                        />
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#333333]">
              {productDetails?.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-sm font-bold">${productDetails?.price}</p>
            </div>
            <div>
              <button
                onClick={() => handleAddCart(productDetails)}
                className="min-w-[200px] mt-4 px-4 py-3 border border-[#333] bg-transparent text-sm font-semibold rounded cursor-pointer"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
