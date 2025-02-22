import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
function App() {
  const { cartItems, isLoading } = useSelector((store)=> store.cart);
  const { isOpen } = useSelector((store)=> store.modal);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(()=>{
    dispatch(getCartItems())
  }, [])


  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
 
  return (
    <main>
      {isOpen && <Modal></Modal>}
      
      <Navbar></Navbar>
      <CartContainer></CartContainer>
    </main>
  )
}
export default App;
