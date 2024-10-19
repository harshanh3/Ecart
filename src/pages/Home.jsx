import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const{allProducts,loading,error}= useSelector(state=>state.productReducer)
  // console.log(allProducts,loading,error);
  
  const [CurrentPage,setCurrentPage] = useState(1)
  const productPerpage = 8
  const totalPage = Math.ceil(allProducts?.length/productPerpage)
   const CurrentPageLastProductIndex = CurrentPage * productPerpage
   const CurrentPageFirstProductIndex = CurrentPageLastProductIndex - productPerpage 
   const visibleCards = allProducts?.slice(CurrentPageFirstProductIndex,CurrentPageLastProductIndex)

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[])



const navigateToNextPage =()=>{
  if(CurrentPage!= totalPage){
    setCurrentPage(CurrentPage+1)
  }
}

const navigateToPervPage =()=>{
  if(CurrentPage!= 1){
    setCurrentPage(CurrentPage-1)
  }
}


  return (
    <>
    <Header insideHome={true}/>
    <div style={{paddingTop:'100px'}} className='container px-4 mx-auto'>

    { 
    loading ?
    <div className='flex justify-center items-center my-5 text-lg'> 
    <img width={'100px'} src="https://media.tenor.com/tga0EoNOH-8AAAAM/loading-load.gif" alt="" />
    </div>
      :
     <>
     <div className='grid grid-cols-4 gap-4'>
      { 
        allProducts?.length>0?
        visibleCards?.map(product=>(

      <div key={product?.id} className='rounded border p-2 shadow'>
        <img width={'100%'} height={'200px'} src={product?.thumbnail} alt="" />
        <div className='text-center'>
          <h3 className='text-xl font-bold'>{product?.title}</h3>
          <Link to={`${product?.id}/view`} className="bg-yellow-500 rounded p-1 mt-3 text-white inline-block" >View more...</Link>
        </div>
      </div>
      ))
      :
      <div className='flex font-bold justify-center items-center text-red-500 my-5 text-lg'>
        Product Not Found!!!
      </div>
    }
     </div>
     <div className="text-center text-2xl my-5 mt-20 ">
      <span onClick={navigateToPervPage}  className='cursor-pointer'><i className="fa-solid fa-backward me-5 "></i></span>
      <span >{CurrentPage} of {totalPage}</span>
      <span onClick={navigateToNextPage} className='cursor-pointer'><i className="fa-solid fa-forward me-5  ms-3"></i></span>

     </div>

     </>}
    </div>
    </>
     )
}

export default Home