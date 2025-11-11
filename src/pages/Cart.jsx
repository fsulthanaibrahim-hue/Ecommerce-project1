// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, increaseQty, decreaseQty } from "../redux/CartSlice";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Cart = () => {
//   const cart = useSelector(state => state.cart.items);
//   // const user = useSelector((state) => state.user.currentUser);  
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 

//   const userFromRedux = useSelector((state) => state.user?.currentUser);
//   const user = userFromRedux || JSON.parse(localStorage.getItem("loggedInUser"));

//   useEffect(() => {
//     // const userStr = localStorage.getItem("loggedInUser");
//     if(!user) {
//       toast.error("Please login first to view your cart!");
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   if (!user) return null;

//   // if (cart.length > 0) {
//   //   const user = JSON.parse(localStorage.getItem("loggedInUser"));
//   //   if (!user) { toast.error("Please login first to view your cart!"); navigate("/login"); }
//   // }

//   const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

//   const handleCheckout = () => {
//     if(cart.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }
//     cart.forEach(item => dispatch(removeFromCart(item.id)));
//     toast.success("Order placed successfull! Thank you for shopping.");

//     setTimeout(() => navigate("/orders"), 1500);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

//       {cart.length === 0 ? (
//        <div className="text-center mt-10 text-gray-600"> 
//         <p className="text-lg">No items in your cart.</p>
//         <button 
//           onClick={() => navigate("/products")}
//           className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
//         >
//           Browse products
//         </button>  
//       </div>  
//       ) : (
//         <div className="space-y-6">
//           {cart.map(item => (
//             <div
//                key={item.id} 
//                className="flex justify-between items-center border-b pb-3"
//             >
//               <div className="flex items-center gap-4">
//                 <img 
//                   src={item.image}
//                   alt={item.name} 
//                   className="w-20 h-20 object-cover rounded" 
//                 />
//                 <div>
//                   <h2 className="font-semibold">{item.name}</h2>
//                   <p className="text-gray-600">₹{item.price}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-4">
//                 <button 
//                    onClick={() => dispatch(decreaseQty(item.id))} 
//                    className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
//                 >
//                   -
//                 </button>
//                 <span>{item.quantity || 1}</span>
//                 <button 
//                    onClick={() => dispatch(increaseQty(item.id))} 
//                    className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
//                 >
//                   +
//                 </button>
//                 <button 
//                    onClick={() => dispatch(removeFromCart(item.id))} 
//                    className="text-red-600 cursor-pointer"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <h2 className="text-right text-2xl font-bold mt-6">
//             Total: ₹{total.toFixed(2)}
//           </h2>

//           <div className="text-right mt-6">
//             <button 
//               onClick={handleCheckout}
//               className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
//             >
//               Checkout
//             </button>  
//         </div>
//       </div>  
//       )}
//      </div> 
//   );
// };

// export default Cart;


    
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const cart = useSelector(state => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userFromRedux = useSelector(state => state.user?.currentUser);
  const user = userFromRedux || JSON.parse(localStorage.getItem("loggedInUser"));


  useEffect(() => {
    if (!user) {
      toast.error("Please login first to view your cart!");
      navigate("/login");
    }
  }, [user, navigate]);

  // Prevent blank render if user not logged in
  if (!user) return <p className="text-center mt-10">Redirecting to login...</p>;

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    cart.forEach(item => dispatch(removeFromCart(item.id)));
    toast.success("Order placed successfully! Thank you for shopping.");

    setTimeout(() => navigate("/orders"), 1500);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-lg">No items in your cart.</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Browse products
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(decreaseQty(item.id))}
                  className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQty(item.id))}
                  className="cursor-pointer px-2 py-1 border rounded hover:bg-gray-100"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-600 cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2 className="text-right text-2xl font-bold mt-6">
            Total: ₹{total.toFixed(2)}
          </h2>

          <div className="text-right mt-6">
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
