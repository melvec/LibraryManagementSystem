import { useState } from "react";
import { Button } from "react-bootstrap";
import CreateOrEditBookModal from "../components/createOrEditBookModal";
import BooksTable from "../components/BooksTable";
import DeleteBookConfirmationModal from "../components/DeleteBookConfirmationModal";

const emptyFormData = {
  thumbnail: "",
  title: "",
  author: "",
  publish_year: "",
  isbn: "",
  description: "",
};

const BooksPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialFormData, setInitialFormData] = useState(emptyFormData);

  // handle create book modal
  const openCreateBookModal = () => {
    setInitialFormData(emptyFormData);
    setShowModal(true);
  };

  return (
    <>
      {/* Button to Launch create book modal */}
      <Button
        className="mb-5 float-end"
        variant="success"
        onClick={openCreateBookModal}
      >
        Add Book
      </Button>

      {/* Table to display Books */}
      <BooksTable
        setShowModal={setShowModal}
        setInitialFormData={setInitialFormData}
      />
      {/* Create Books Modal */}
      <CreateOrEditBookModal
        showModal={showModal}
        setShowModal={setShowModal}
        initialFormData={initialFormData}
      />
    </>
  );
};

export default BooksPage;
