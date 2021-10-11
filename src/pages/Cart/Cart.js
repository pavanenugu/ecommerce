import React from 'react'
import { DeleteOutlined } from '@ant-design/icons'

const Cart = ({ cartItems, setCartItems }) => {
    const handleDeleteItem = (itemId) => {
        const index = cartItems.findIndex((item) => item.id === itemId);
        if (index !== -1) {
            const updatedItems = [...cartItems];
            updatedItems.splice(index, 1);
            setCartItems(updatedItems);
        }
    };

    const calculateTotalPrice = (items) => {
        const totalPrice = items.reduce((acc, item) => {

            if (item && typeof item.price === 'number') {
                return acc + item.price;
            }
            return acc;
        }, 0);

        return totalPrice;
    }
    return (
        <div>
            {
                cartItems.length > 0 ? cartItems.map((item) => {
                    return <div className='border-solid border-[1px] border rounded-md mb-3 p-4 flex items-center'>
                        <img
                            src={item.thumbnail}
                            className='max-w-20 h-auto'
                            alt={item.title}
                        />
                        <div className='flex justify-between w-full'>
                            <div className='ml-2'>{item.title}</div>
                            <div className='flex items-center'>
                                <div>{item.price}</div>
                                <div className='ml-2' ><DeleteOutlined onClick={() => handleDeleteItem(item.id)} /></div>
                            </div>
                        </div>
                    </div>

                }) : <div>Add items to your cart!</div>
            }
            <div className='flex w-full items-center justify-center text-[32px]'>Total : {calculateTotalPrice(cartItems)}</div>

        </div>
    )
}

export default Cart
