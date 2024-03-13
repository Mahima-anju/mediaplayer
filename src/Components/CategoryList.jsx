import React, { useEffect ,useState} from 'react'
import {deleteCategory, getCategory, getSpecificVideo, updateCategory} from '../services/allApis'
import { toast } from 'react-toastify'
import Videocard from './Videocard'


function CategoryList({addstatus}) {

  const[cat,setCat]=useState([])
  const [deleteStatus,setDelete]=useState("")
    useEffect( ()=>{
        getData()
    },[addstatus,deleteStatus])
    const getData=async()=>{
        const res=await getCategory()
        console.log(res)
        setCat(res.data)
    }
    const handleDelete=async(id)=>{
      const res=await deleteCategory(id)
      console.log(res)
      if(res.status>=200 &&res.status<300){
        toast .success (`${data.caption} added to ${category.name}`)
        getData()
      }
      else{
        toast.error ("Category Deletion Failed!!")
      }

    }
    const handleDrop=async(e,id)=>{
      console.log("category id:",id)
      const vid=e.dataTransfer.getData("videoId")
      console.log("dropped video id:"+vid)
      const category=cat.find(item=>item.id==id)
      console.log(category)
      let {data}=await getSpecificVideo(vid)
      //console.log(video.data)
      category.videos.push(data)
     
     
      console.log(category)
      const res=await updateCategory(category,id)
      if(res.status>=200 && res.status<300){
        toast.success(`${data.caption} add to ${category.name}`)
      }
      else{
        toast.error("video Adding to category failed")
      }
      
    
    }
    const handleDragOver=(e)=>{
      e.preventDefault()
    }

    
  return (
    <>
    <div className='mt-3 border shadow p-2'>
      {
        cat.length>0?
        cat.map(item=>(
          <div>
          <div className='bg-primary rounded shadow my-3 p-4' onDragOver={e=>{handleDragOver(e)}} onDrop={e=>{handleDrop(e,item.id)}}>
            <span>{item.name}</span>
            <i className="fa-solid fa-trash float-end"onClick={()=>{handleDelete(item.id)}} style={{color:"#ff000"}}></i>
          </div>
          <div className='mt-3'>
            {
              item?.videos.map(v=>(
                <Videocard video={v} cat={true}/>
              )

              )
            }

          </div>
          </div>
        ))
        :
        <h1>No catagories </h1>
      }
        

    </div>
    </>
  )
}

export default CategoryList