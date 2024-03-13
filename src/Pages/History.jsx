import React, { useEffect, useState } from 'react'
import { allHistory, deleteHistory } from '../services/allApis'
import {Link} from 'react-router-dom'


function History() {

  const [history,setHistory] =useState([])
  const [deleteStatus,setDeletestatus]=useState('')
  useEffect (()=>{
    getData()
  },[deleteStatus] )

  const getData=async()=>{
    const res=await allHistory()
    console.log (res.data)
    setHistory (res.data)
  }
  const handleDelete=async(id)=>{
    const res=await deleteHistory(id)
    if (res.status>=200 && res.status <300) {
      console.log("del");
      setDeletestatus (res.data)
    } else {
      console.log("failed");
    }
  }
  return (
    <>
    <div className='p-5'>
      <Link to={'/dash'} className='btn btn-info float-end mb-5'>Dashboard</Link>
      <h4>WATCH HISTORY</h4>

      <table className="table table-bordered">
        <tr>
          <th>Caption</th>
          <th>Video URL</th>
          <th>Date and Time</th>
        </tr>
        {
          history?
          history.map(item=>(
    <tr>
      <td>{item.caption}</td>
      <td>{item.url}</td>
      <td>{item.datetime}</td>
      <td>
        <i className="fa-solid fa-trash text-light" onClick={()=>{handleDelete(item.id)}}></i>
      </td>
    </tr>

            ))
            :
            <p className='text-danger'>NO HISTORY FOUND!!</p>
        }
      </table>

    </div>
    </>
  )
}

export default History