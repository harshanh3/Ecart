import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'


const Pnf = () => {
  return (
<>
<Header/>
<div style={{paddingTop:'100px',height:'80vh'}} className='flex justify-center items-center flex-col'> 
 <img width={'600px'} src="https://static-00.iconduck.com/assets.00/404-page-not-found-illustration-2048x998-yjzeuy4v.png
" alt="" />
<h1 className='font-bold text-4xl'>Page not found </h1>
<p className='font-semibold mb-2'>click the home to redirect to home page</p>
<Link  to={'/'} className='bg-green-500 text-white p-2 rounded '>Home</Link>

</div>

</>
  )
}

export default Pnf