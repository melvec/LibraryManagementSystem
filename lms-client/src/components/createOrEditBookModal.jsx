/* eslint-disable react/prop-types */
import { Offcanvas } from "react-bootstrap";
import CreateOrEditBookForm from "./createOrEditBookForm";

const CreateOrEditBookModal = (props) => {
  const { showModal, setShowModal, initialFormData } = props
  const isNewRecord = !initialFormData.isbn

  return ( 
    <Offcanvas
      show={showModal}
      onHide={() => setShowModal(false)}
      placement="end"
      backdrop="static"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{isNewRecord ? "Create Book" : "Update Book" }</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        {/* Form to create or edit a book */}
        <CreateOrEditBookForm setShowModal={setShowModal} initialFormData={initialFormData} />
      </Offcanvas.Body>
    </Offcanvas>
   );
}
 
export default CreateOrEditBookModal;