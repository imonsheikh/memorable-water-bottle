import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart } from "../../utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {

    const [bottles,setBottles] = useState([])
    const [cart,setCart] = useState([])

    useEffect(() => {
       fetch('bottles.json') 
       .then(res => res.json())
       .then(data => setBottles(data))
    },[])

    //load cart from localStorage
    useEffect(() => {
        console.log('called the useEffect', bottles.length);
        
    
       if(bottles.length>0){
        const storedCart = getStoredCart()
        console.log(storedCart,bottles);

        const saveCArt  = []
        for(const id of storedCart){
            console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id)
            if(bottle){
                 saveCArt.push(bottle)
            }
            
        }
        console.log("save cart",saveCArt);
        setCart(saveCArt)
        
       }
       
    },[bottles])

    const handleAddToCart = bottle => {
         console.log('bottle going to be added');
        //  console.log(bottle);
         const newCart = [...cart, bottle]
         setCart(newCart)
         addToLS(bottle.id)
                  
    }

    return (
        <div>
            <h2>Bottles Available: {bottles.length}</h2>
            <h4>Cart(from parents): {cart.length}</h4>
            <Cart cart={cart}></Cart>

             <div className="bottle-container">
             {
                bottles.map(bottle => <Bottle 
                    key={bottle.id}
                    bottle={bottle}
                    handleAddToCart={handleAddToCart}
                    ></Bottle>)
            }
             </div>
        </div>
    );
};

export default Bottles;