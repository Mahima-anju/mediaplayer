import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import {addCategory} from '../services/allApis'
import CategoryList from './CategoryList'


function Categories() {
  const [show, setShow] = useState(false);
  const [Category,setCategory]=useState("")
  const [addstatus,setaddStatus]=useState({})
  const getData=(val)=>{
    if(val){
      setCategory(val)
    }
 }
 const handleSubmit=async()=>{
  if(!Category){
    toast.info("Enter Valid Data!!")
  }
  else{
    console.log(Category)
    const data={name:Category,videos:[]}
    const res=await addCategory(data)
    if(res.status>=200 && res.status<300){
      toast.success("Category Added!!")
      setCategory("")
      setaddStatus(res.data)
      handleClose()
    }
    else{
      toast.error("Category Adding Failed!!!")
    }
    console.log(Category);
  }
 }

  const handleClose = () => {
    setShow(false)
    setCategory("")
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <div className='d-grid'>

        <Button variant='info' onClick={handleShow}>Add Category</Button>
      </div>

      <Modal show={show} onHide={handleClose}
      backdrop="static"
      keyboard={false}
      
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Control onChange={(e)=>{getData(e.target.value)}}type="text" placeholder="Enter Category Name" />
          </Form.Group>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <CategoryList addstatus={addstatus}/>
    </>
  )
}

export default Categories