import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, Navigate,  } from 'react-router-dom'
import { useDispatch, useSelector, } from 'react-redux'
import { decQuantity,emptyCart,incQuantity, removeCartItem } from '../redux/slices/cartSlice'


const Cart = () => {
  const navigate = Navigate
  const dispatch = useDispatch()
  const userCart = useSelector(state => state.CartReducer)
  const [carttotal, setCartTotal] = useState(0)

  useEffect(() => {
    if (userCart?.length > 0) {
      setCartTotal(userCart?.map(item => item.totalPrice)?.reduce((a, b) => a + b))
    }
  }, [userCart])
const handledecrementQuantity = (product)=>{
  if(product.quantity>1){
    dispatch(decQuantity(product))
  }else{
    dispatch(removeCartItem(product.id))
  }
}

const handleCheckout = ()=>{
dispatch(emptyCart())
alert("order confirmed ... Thank you for purchasing with us !!")
navigate('/')
}

  return (
    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='container px-4 mx-auto'>
        {
          userCart?.length > 0 ?
            <>
              <h1 className='text-5xl text-blue-500 font-bold'>Cart Summary</h1>
              <div className='grid grid-cols-3 gap-4 mt-5'>
                <div className='col-span-2 border rounded shadow p-5'>
                  {/*  table*/}
                  <table className="table-auto w-full">
                    <thead>
                      <tr>
                        <td className="font-semibold">#</td>
                        <td className="font-semibold">Name</td>
                        <td className="font-semibold">Image</td>
                        <td className="font-semibold">Quantity</td>
                        <td className="font-semibold">Price</td>
                        <td className="font-semibold">...</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        userCart?.map((product, index) => (
                          <tr key={product.id}>

                            <td>{index + 1}</td>
                            <td>{product?.title}</td>
                            <td> <img width={'70px'} height={'70px'} src={product?.thumbnail} alt="" />
                            </td>
                            <td>
                              <div className='flex'>
                                <button onClick={()=>handledecrementQuantity(product)} className='font-bold'>-</button>
                                <input style={{ width: '40px' }} type="text" value={product?.quantity} className='border p-1 rounded ms-2 me-2' readOnly />
                                <button onClick={()=>dispatch(incQuantity(product))} className='font-bold'>+</button>

                              </div>
                            </td>
                            <td>$ {product?.totalPrice}</td>
                            <td> <button onClick={() => dispatch(removeCartItem(product?.id))} className='text-red-600 '> <i class="fa-solid fa-trash"></i></button></td>
                          </tr>))}
                    </tbody>
                  </table>
                  <div className='float-right mt-4'>
                    <button onClick={()=>dispatch(emptyCart)} className='bg-red-500 text-white p-2 rounded me-3'>EMPTY CART</button>
                    <Link className='bg-blue-500 text-white p-2 rounded me-3' to={'/'}>SHOP MORE</Link>
                  </div>
                </div>
                <div className='col-span-1 border rounded shadow p-5'>
                  {/*  check out*/}
                  <h1 className='text-2xl font-bold'>Total Amount : <span className='text-red-600'>${carttotal}</span></h1>
                  <hr />
                  <button onClick={handleCheckout} className='w-full bg-green-600 rounded p-5 text-white font-bold mt-5 text-xl'>Checkout</button>
                </div>
              </div>
            </>
            :
            <div className="flex flex-col justify-center items-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--wishlist-bucket-shopping-state-pack-design-development-illustrations-1800917.png?f=webp" alt="No Image" />
              <h1 className="text-blue-600 font-bold text-3xl my-5">Your Cart Is Empty!!!</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Cart