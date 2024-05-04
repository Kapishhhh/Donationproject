import { useEffect, useState, useRef} from "react";
import logo from "../../image/logo.jpg"
import { FaSearch } from "react-icons/fa";
import axiosUrl from "../../url/Axiosurl";
// import { Link } from 'react-router-dom';





function Topbar() {


   const [search,setSearch] = useState('');
   const [showSearchContainer,setShowSearchContainer] = useState(false)
   const [api, setApi] = useState([]);
   const containerRef = useRef(null);

   const changeValue = (e) => {
      setSearch(e.target.value);
   }

   const handleInputClick = () => {
      setShowSearchContainer(true);
    };

    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSearchContainer(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

   useEffect(()=>{
     if(search !== ""){
      axiosUrl.get(`/upload?name=${search}`).then((response)=>{
         console.log(response.data.data,"search div");

         setApi(response.data.data)

      }).catch((err)=>{
         console.log(err);
      })
     }
   },[search])

   const handleSubmit = (e) => {
      e.preventDefault();
      if (search.trim() === '') {
         // Reload the page or handle the empty search case
         window.location.reload();
         // Perform search action here
     } else {
      // e.preventDefault();
       window.location.href = `/Mainpage/search?name=${search}`;
     }
      // console.log(search,'search value')
      // setSearch('');
     
    
   }

   // console.log(search, 'search value');
  

   return(
    <>
       <div className="rounded-b-2xl bg-green-400 h-[10vh] flex sm:flex justify-between shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)]">
           
           <div className="w-[100px]">
           <img src={logo} className="  w-[100%]"  alt="" />
           </div>

           <div className="  mt-5 text-[10px] sm:text-[120%] md:text-[150%]">
               <h1 className="">DONATE ANYTHING YOU WANT</h1>
            
           </div>
            <form onSubmit={handleSubmit}>
           <div className=" md:w-[30%] flex">  
              <div className="">
                <input type="text" value={search} onChange={changeValue} onClick={handleInputClick} className="text-xl mt-2 h-[6vh] rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]" placeholder="Search Items Here"/> 
                {showSearchContainer && (
                  <div ref={containerRef} className="container bg-white border border-gray-800 h-[60vh] shadow-md p-4 rounded-md animate-fadeIn">
                  { 
                     api.slice(0, 10).map((search, index)=>{
                        return(
                           <div key={index} >
                              <h1 className="px-2 py-2 text-2xl font-extralight  hover:bg-gray-200 rounded-2xl">{search.name}</h1>
                           </div>
                        )
                     })
                  } 
                </div>
                )}
                {/* <div className="h-[40vh] w-[100%] bg-gray-200 z-1">
                    <h1>This is suggestion div</h1>
                </div> */}
              </div>  
              {/* <Link to={`/Mainpage/search?name=${search}`}>
                <button type = "submit" className=" bg-blue-400  h-[6vh] mt-2 rounded-2xl mx-1 px-4 py-4 ">
                  <FaSearch />
                 </button>
               </Link> */}

                    {/* <Link to={`/Mainpage/search?name=${search}`}> */}
                        <button type="submit" className="bg-blue-400 h-[6vh] mt-2 rounded-2xl mx-1 px-4 py-4">
                            <FaSearch />
                        </button>
                    {/* </Link> */}
           </div> 
           </form>

       </div>
       


    </>
   )
}

export default Topbar;