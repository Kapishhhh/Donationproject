import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";
import { useDispatch,useSelector } from 'react-redux';
import {fetchUpload} from "../../slices/uploadSlice"
import { Star } from "../../slices/addSlice";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { TbDots } from "react-icons/tb";
import { CiSquareRemove } from "react-icons/ci";
import { formatDistanceToNow, format  } from 'date-fns';
import { enUS } from 'date-fns/locale'

import { Pagination } from 'antd';



function Content() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([]);
  const [clickedIndex, setClickedIndex] = useState(-1); 
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
  };
  console.log(current,'page');


  const dispatch = useDispatch();
  // const storeData = useSelector((state)=> state.users);
  // console.log(storeData,'data')
  useEffect(() => {
    // Dispatch an action to fetch the data when the component mounts
    dispatch(fetchUpload());
  }, []);



  // console.log(state);
  useEffect(() => {
    getContent();
  }, [current])

  
    const getContent = async () => {
      
      axiosUrl.get(`/upload?page=${current}`)
        .then((response) => {
          // console.log(response.data.data,'response data')
          setContent(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  const onSubmit = (data, index) => {
    dispatch(Star([data]));
    setClickedIndex(index); // Update the clicked index
  }
  // console.log(content,'content data')

  const renderTime = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const daysDifference = Math.floor((now - postDate) / (1000 * 60 * 60 * 24)); // Calculate days difference
  
    let timeAgo;
    if (daysDifference < 10) {
      // Less than 10 days old, show "X days ago"
      timeAgo = formatDistanceToNow(postDate, { addSuffix: true, locale: enUS });
    } else {
      // More than or equal to 10 days old, show date (month and day)
      timeAgo = format(postDate, 'MMMM dd', { locale: enUS });
    }
  
    return timeAgo.replace('about ', ''); // Remove "about" text if present
  };

  // console.log(timeAgo,'time check')


  return (
    <>
      {loading ? (
        <div className="flex text-4xl justify-center mt-[250px]">Loading content...</div>
      ) : (
        <div className="">
          {content.map((data, index) => (
            <div key={index} className="md:w-[90%] h-[70vh] px-5  ml-5 mr-5 py-5 mt-4 rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
              <div className="flex justify-between">
                <div className="flex">
                   <div className="w-[10%] md:w-[20%]">
                     <img src={data.userId.image} width="100" className=" rounded-[50%]" />
                   </div>
                   <div className="ml-5 font-extrabold  text-3xl">{data.userId.username}</div>
                   <div className="text-xl ml-10 flex"> 
                    <CiTimer />
                    <h1 className="ml-1">{renderTime(data.createdAt)}</h1>
                   </div>
                  </div> 
                 <div className="flex text-2xl">
                   <TbDots className="mr-2"/>
                   <CiSquareRemove />
                 </div>
            </div>
              <div className="my-2 text-xl font-light">Name: {data.name}</div>
              <div className="my-2 text-xl font-light">Address: {data.address}</div>
              <div className="my-2 text-xl font-normal">End Date: {data.endDate}</div>
              <div className="">
                <img src={data.image} width="100" className="w-[90%]" alt="image" />
              </div>
              <div className="mt-5 flex justify-between">
                <div>
                  <Link to={"donate/" + data._id}>
                    <button className="bg-green-500 h-[45px] text-2xl w-[120%] rounded hover:bg-red-600">
                      Donate Now
                    </button>
                  </Link>
                </div>
                <div>
                  <button onClick={() => onSubmit(data, index)}>
                    <CiStar className="text-4xl" style={{ fill: clickedIndex === index ? 'black' : 'blue', backgroundColor: clickedIndex === index ? 'yellow' : 'transparent' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
            <div className="my-20 flex justify-center">
        <Pagination current={current} onChange={onChange} total={50} />
          </div>
        </div>
        
      )}
      
    </>
  )
}

export default Content

