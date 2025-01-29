import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CardTile from "../../components/cardTile";

function CartListPage(){
    const { cartItem } = useContext(ShoppingCartContext);
    const navigate = useNavigate();
    
    return <div className="max-w-5xl mx-auto max-md:max-w-xl py-4">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">My Cart page</h1>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="md:col-span-2 space-y-4 ">
                {
                    cartItem.length ? 
                    cartItem.map((singleCartItem) => <CardTile singleCartItem={singleCartItem} />)
                    : <h1>No Items Available</h1>
                }
            </div>
            <div className="bg-gray-100 rounded-sm p-4 h-max">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-400 pb-2">
                    Order Summary
                </h3>
                <ul className="text-gray-900 mt-4 space-y-2">
                    <p className="flex flex-wrap gap-4 text-lg font-semibold">
                        Total:
                        <span>
                            ${cartItem.reduce((acc,curr)=>acc+curr.totalPrice, 0).toFixed(2)}
                        </span>
                    </p>
                </ul>
                <div className="mt-5 flex gap-3">
                    <button className="text-sm px-4 py-3 bg-black text-white font-semibold rounded-sm cursor-pointer">
                        Checkout
                    </button>
                    <button onClick={() =>navigate('/')} className="text-sm px-4 cursor-pointer bg-black text-white font-semibold rounded-sm">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default CartListPage;