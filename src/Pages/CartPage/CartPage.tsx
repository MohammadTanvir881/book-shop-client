// import { useAppSelector } from "@/Redux/feature/hook";
// import { useState } from "react";
// import { FaTrash, FaShoppingCart } from "react-icons/fa";
// import { toast } from "sonner";

// const CartPage = () => {
//   const cartItems = useAppSelector((state) => state.cart.items);
//   const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart' or 'checkout'
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     email: "",
//     paymentMethod: "cashOnDelivery",
//   });

//   // Calculate totals
//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );
//   const shippingFee = subtotal > 0 ? 50 : 0; // Example shipping fee
//   const total = subtotal + shippingFee;

//   const handleRemoveItem = (productId) => {
//     // Dispatch remove item action here
//     toast.success("Item removed from cart");
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     // Dispatch update quantity action here
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleCheckout = (e) => {
//     e.preventDefault();
//     // Validate form
//     if (
//       !formData.name ||
//       !formData.address ||
//       !formData.phone ||
//       !formData.email
//     ) {
//       toast.error("Please fill all required fields");
//       return;
//     }
//     // Process payment here
//     toast.success("Order placed successfully!");
//     // Reset cart and redirect
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
//         <FaShoppingCart /> Your Shopping Cart
//       </h1>

//       {checkoutStep === "cart" ? (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             {cartItems.length === 0 ? (
//               <div className="bg-white rounded-lg shadow p-6 text-center">
//                 <p className="text-lg">Your cart is empty</p>
//                 <button className="mt-4 btn bg-green-500 text-white hover:bg-green-600">
//                   Continue Shopping
//                 </button>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow overflow-hidden">
//                 <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
//                   <div className="col-span-6">Product</div>
//                   <div className="col-span-2 text-center">Price</div>
//                   <div className="col-span-2 text-center">Quantity</div>
//                   <div className="col-span-2 text-center">Total</div>
//                 </div>
//                 {cartItems.map((item) => (
//                   <div
//                     key={item.id}
//                     className="grid grid-cols-12 items-center p-4 border-b"
//                   >
//                     <div className="col-span-6 flex items-center gap-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div>
//                         <h3 className="font-medium">{item.name}</h3>
//                         <button
//                           onClick={() => handleRemoveItem(item.id)}
//                           className="text-red-500 flex items-center gap-1 text-sm mt-1"
//                         >
//                           <FaTrash size={12} /> Remove
//                         </button>
//                       </div>
//                     </div>
//                     <div className="col-span-2 text-center">${item.price}</div>
//                     <div className="col-span-2 text-center">
//                       <select
//                         value={item.quantity}
//                         onChange={(e) =>
//                           handleQuantityChange(item.id, parseInt(e.target.value))
//                         }
//                         className="border rounded p-1"
//                       >
//                         {[1, 2, 3, 4, 5].map((num) => (
//                           <option key={num} value={num}>
//                             {num}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="col-span-2 text-center font-medium">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-4">Order Summary</h2>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>${shippingFee.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-3 flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//               {cartItems.length > 0 && (
//                 <button
//                   onClick={() => setCheckoutStep("checkout")}
//                   className="w-full mt-6 btn bg-green-500 text-white hover:bg-green-600 py-2 rounded"
//                 >
//                   Proceed to Checkout
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Checkout Form */
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-6">Checkout Details</h2>
//               <form onSubmit={handleCheckout}>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block mb-1 font-medium">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       className="w-full border rounded p-2"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="w-full border rounded p-2"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       className="w-full border rounded p-2"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">
//                       Shipping Address <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className="w-full border rounded p-2"
//                       rows="3"
//                       required
//                     ></textarea>
//                   </div>
//                   <div>
//                     <label className="block mb-1 font-medium">
//                       Payment Method <span className="text-red-500">*</span>
//                     </label>
//                     <div className="space-y-2">
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name="paymentMethod"
//                           value="cashOnDelivery"
//                           checked={formData.paymentMethod === "cashOnDelivery"}
//                           onChange={handleInputChange}
//                           required
//                         />
//                         Cash on Delivery
//                       </label>
//                       <label className="flex items-center gap-2">
//                         <input
//                           type="radio"
//                           name="paymentMethod"
//                           value="creditCard"
//                           checked={formData.paymentMethod === "creditCard"}
//                           onChange={handleInputChange}
//                         />
//                         Credit Card
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-between">
//                   <button
//                     type="button"
//                     onClick={() => setCheckoutStep("cart")}
//                     className="btn bg-gray-300 hover:bg-gray-400"
//                   >
//                     Back to Cart
//                   </button>
//                   <button
//                     type="submit"
//                     className="btn bg-green-500 text-white hover:bg-green-600"
//                   >
//                     Complete Order
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h2 className="text-xl font-bold mb-4">Your Order</h2>
//               <div className="space-y-3">
//                 {cartItems.map((item) => (
//                   <div key={item.id} className="flex justify-between">
//                     <span>
//                       {item.name} × {item.quantity}
//                     </span>
//                     <span>${(item.price * item.quantity).toFixed(2)}</span>
//                   </div>
//                 ))}
//                 <div className="border-t pt-3 flex justify-between">
//                   <span>Subtotal</span>
//                   <span>${subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>${shippingFee.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-3 flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span>${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import { useState } from "react";
import { FaTrash, FaShoppingCart, FaArrowLeft } from "react-icons/fa";

const StaticCartPage = () => {
  // Sample static cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "The Great Gatsby",
      price: 12.99,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 2,
      name: "To Kill a Mockingbird",
      price: 10.50,
      quantity: 2,
      image: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      id: 3,
      name: "1984",
      price: 8.75,
      quantity: 1,
      image: "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg"
    }
  ]);

  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart' or 'checkout'
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    paymentMethod: "cashOnDelivery",
  });

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shippingFee;

  const handleRemoveItem = (productId : any) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleQuantityChange = (productId: number, newQuantity: string) => {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: parseInt(newQuantity) } : item
      ));
    };

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckout = (e : any) => {
    e.preventDefault();
    alert("Thank you for your order! This is a static demo.");
    // Reset for demo purposes
    setCartItems([]);
    setCheckoutStep("cart");
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      paymentMethod: "cashOnDelivery",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FaShoppingCart /> Your Shopping Cart
      </h1>

      {checkoutStep === "cart" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-lg mb-4">Your cart is empty</p>
                <button 
                  className="btn bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 mx-auto"
                  onClick={() => {
                    // Reset to sample data if cart is empty
                    setCartItems([
                      {
                        id: 1,
                        name: "The Great Gatsby",
                        price: 12.99,
                        quantity: 1,
                        image: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
                      },
                      {
                        id: 2,
                        name: "To Kill a Mockingbird",
                        price: 10.50,
                        quantity: 2,
                        image: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg"
                      }
                    ]);
                  }}
                >
                  <FaArrowLeft /> Load Sample Books
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="grid grid-cols-12 bg-gray-100 p-4 font-semibold">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 items-center p-4 border-b"
                  >
                    <div className="col-span-6 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 flex items-center gap-1 text-sm mt-1"
                        >
                          <FaTrash size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
                    <div className="col-span-2 text-center">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2 text-center font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              {cartItems.length > 0 && (
                <button
                  onClick={() => setCheckoutStep("checkout")}
                  className="w-full btn bg-green-500 text-white hover:bg-green-600 py-2 rounded"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Checkout Form */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Checkout Details</h2>
              <form onSubmit={handleCheckout}>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">
                      Shipping Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      required
                      placeholder="123 Main St, City, Country"
                    ></textarea>
                  </div>
                  <div className="pt-2">
                    <label className="block mb-3 font-medium">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cashOnDelivery"
                          checked={formData.paymentMethod === "cashOnDelivery"}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-green-500"
                          required
                        />
                        <div>
                          <span className="font-medium">Cash on Delivery</span>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="creditCard"
                          checked={formData.paymentMethod === "creditCard"}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-green-500"
                        />
                        <div>
                          <span className="font-medium">Credit/Debit Card</span>
                          <p className="text-sm text-gray-500">Pay securely with your card</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep("cart")}
                    className="btn bg-gray-300 hover:bg-gray-400 flex items-center gap-2"
                  >
                    <FaArrowLeft /> Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="btn bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Your Order</h2>
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-medium mb-2">Delivery Information</h3>
                <p className="text-sm text-gray-600">
                  Orders are typically processed within 1-2 business days. Delivery times may vary based on your location.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaticCartPage;