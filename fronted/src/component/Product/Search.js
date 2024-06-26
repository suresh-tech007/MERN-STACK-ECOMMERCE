import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';


const Search = () => {
    
    const navigate = useNavigate()

  
    const [keyword,setKeyword] = useState("");
    const searchSumbithandler = (e)=>{ 
      e.stopPropagation();
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
          } else {
            navigate("/products");
          }
    }
  return (
    <Fragment>
       <MetaData title="Search a product  --ECOMMERCE " />
       <div
       className='  w-[100vw] md:h-[80%] h-[25vh] backdrop-blur-sm  '
       >


      
       
      
        <form action=""   className='w-[100vw] backdrop-blur-sm    flex justify-center  z-50   items-start  mt-[10vmax]   fixed top-0 left-0 '   onSubmit={searchSumbithandler}>
        
       <input type="text" className='shadow-lg shadow-[rgba(0,0,0,0.274)]  bg-white border-none text-[rgba(0,0,0,0.637)]  py-[1vmax] px-[2vmax] w-[70%] md:w-[50%] outline-none rounded-none font-light md:text-[1.1vmax] text-[2vmax]  box-border md:h-[10vh] h-[6vh] font-cursive '
       placeholder='Search a Product'
       onChange={(e)=>setKeyword(e.target.value)}
       />
  <input type='submit' className=' md:h-[10vh] h-[6vh] rounded-none shadow-lg shadow-[rgba(0,0,0,0.274)] bg-[tomato] px-4 border-none p-[1vmax] w-[20%] font-extralight  md:w-[10%] text-[2vmax] md:text-[1.1vmax] font-Roboto text-white   cursor-pointer transition-all duration-500 hover:bg-[rgb(55,97,214)] ' value="search" />
        </form>
        </div>

    </Fragment>
  )
}

export default Search