import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlistItem } from '../redux/slices/wishlistSlice'
import { addToCart } from '../redux/slices/cartSlice'


const Wishlist = () => {
  const userCart = useSelector(state=>state.CartReducer)
const dispatch = useDispatch()
const userWishlist = useSelector(state=>state.wishlistReducer)

const  handleCart = (product) => {
  dispatch(addToCart(product))
  const exisitingProduct = userCart?.find(item=>item.id==product.id)
  dispatch(removeWishlistItem(product.id))
  if(exisitingProduct){
    alert("product quantity is increment")
  }
}

  return (
    <>
      <Header />
      <div style={{ paddingTop: '80px' }} className='conntainer px-4 mx-auto pb-10'>
        {
          userWishlist?.length > 0 ?
            <>
              <h1 className="text-red-600 font-bold text-5xl pb-5 mx-24 my-10">My Wishlist</h1>
              <div className="grid grid-cols-4 gap-4 mx-16">
                {
                  userWishlist?.map(product => (
                    <div key={product?.id} className="rounded shadow-md p-4">
                      <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
                      <div className='text-center'>
                        <h2 className="text-xl font-bold">{product?.title}</h2>
                        <div className="flex justify-evenly mt-3">
                          <button onClick={()=>dispatch(removeWishlistItem(product?.id))} className="text-xl"><i className="fa-solid fa-heart-circle-xmark text-red-600"></i></button>
                          <button onClick={()=>handleCart(product)} className="text-xl"><i className="fa-solid fa-cart-plus text-green-600"></i></button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </>
            :
            <div className="flex flex-col justify-center items-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--wishlist-bucket-shopping-state-pack-design-development-illustrations-1800917.png?f=webp" alt="No Image" />
              <h1 className="text-blue-600 font-bold text-3xl my-5">Your Wishlist Is Empty!!!</h1>
            </div>
        }
      </div>
    </>
  )
}

export default Wishlist