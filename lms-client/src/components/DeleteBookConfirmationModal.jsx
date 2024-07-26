import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteBookAction } from "../redux/bookActions";

const DeleteBookConfirmationModal = (props) => {
  const { formData } = props;
  const [show, setShow] = useState();
  const dispatch = useDispatch();

  const handleYes = () => {
    dispatch(deleteBookAction(formData));
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button variant="outline-light" onClick={handleShow}>
        <BsTrash variant="outline-light" color="red" />
      </Button>

      {/* <BsTrash variant="outline-light" onClick={() => handleShow} color="red" /> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete the Book?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleYes}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteBookConfirmationModal;
