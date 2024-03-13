import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { deleteVideo,addHistory } from '../services/allApis';
import { toast } from 'react-toastify';

function Videocard({video,setDel,cat}) {
    const [show, setShow] = useState(false);
    const [his,setHis]=useState({
        caption:video.caption,url:video.url,datetime:''
    }

    )


    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const handleDelete=async(id)=>{
        const res=await deleteVideo(id)
        if (res.status>=200 && res.status<300) {
            del("success")
            toast.success('Video Deleted')
        } else {
            toast.error('Error while deleting')
            
        }
    }
    const handleClose = () => {
        console.log(his)
        addHistory(his)
        setShow(false)
    };
    const handleShow = () => {
        setHis({...his,datetime:new Date()})
        setShow(true)
    }
    const handleDrag=(e,id)=>{
        console.log ("Video ID:"+id)
        e.dataTransfer.setData("videoId",id)
    }
    return (
        <div className='col'>
            <Card style={cat?{width:"18rem"}:{width:'24rem'}}  className='mt-2' draggable onDragStart={(e)=>{handleDrag(e,video?.id)}}>
                <Card.Img variant="top" src={video.image} style={{height:'250px'}} onClick={handleShow} />
                <Card.Body style={{border:'2px solid black'}}>
                    <Card.Title className='d-flex justify-content-between'>{video.caption}
                    <Button onClick={()=>{handleDelete(video.id)}} className='bg-light'>
                    <i className="fa-solid fa-trash" style={{color:'black'}} ></i>
                    </Button>
                    </Card.Title>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{video.caption}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {/* <iframe width="100%" height="315" src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                {/* <iframe width="560" height="315" src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                <iframe width="100%" height="315" src={video.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen/>
                </Modal.Body>
                
            </Modal>
        </div>
    )
}

export default Videocard