import { Fragment, useContext } from "react";
import { ShoppingCartContext } from "../../context";

function CardTile({ singleCartItem }) {
  const { handleRemoveCart, handleAddCart} = useContext(ShoppingCartContext);

  return (
    <Fragment>
      <div className="grid grid-cols-3 items-start gap-4">
        <div className="col-span-2 flex items-start gap-4">
          <div className="w-28 h-28 max-sm:w-20 shrink-0 bg-gray-400 p-1 rounded-sm">
            <img
              className="w-full h-full object-contain"
              src={singleCartItem.thumbnail}
            />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {singleCartItem.title}
            </h3>
            <button
              onClick={() => handleRemoveCart(singleCartItem, true)}
              className="text-sm px-4 py-3 bg-black text-white font-semibold rounded-sm cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <h3 className="text-lg font-bold text-gray-900">
            ${singleCartItem.totalPrice.toFixed(2)}
          </h3>
          <p className="mt-2 mb-3 font-semibold text-[18px]">Quantity: {singleCartItem?.quantity}</p>
          <div className="mt-3 flex gap-1">
            <button
              onClick={() => handleRemoveCart(singleCartItem, false)}
              disabled={singleCartItem?.quantity === 1}
              className="disabled:opacity-65 w-[30px] rounded-sm border border-[#000] cursor-pointer"
            >
              -
            </button>
            <button onClick={() => handleAddCart(singleCartItem)} className="w-[30px] rounded-sm border border-[#000] cursor-pointer">
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-500" />
    </Fragment>
  );
}

export default CardTile;
