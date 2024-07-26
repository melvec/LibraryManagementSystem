/* eslint-disable react/prop-types */
import { Button, Form, Stack } from "react-bootstrap";
import CustomInput from "./CustomInput";
import useForm from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { createBookAction, updateBookAction } from "../redux/bookActions";

const BOOK_FORM_FIELDS = [
  {
    label: "Image Url",
    name: "thumbnail",
    type: "text",
  },
  {
    label: "Title",
    name: "title",
    type: "text",
  },
  {
    label: "ISBN",
    name: "isbn",
    type: "number",
  },
  {
    label: "Author",
    name: "author",
    type: "text",
  },
  {
    label: "Publish Year",
    name: "publish_year",
    type: "month",
  },
  {
    label: "Description",
    name: "description",
    type: "textarea",
  },
]

const CreateOrEditBookForm = (props) => {
  const { setShowModal, initialFormData } = props

  const isNewRecord = !initialFormData.isbn

  const dispatch = useDispatch()

  const { formData, handleOnChange } = useForm(initialFormData)

  const handleOnSubmit = (e) => {
    e.preventDefault()

    //dispatch action to create a book
    isNewRecord 
      ? dispatch(createBookAction(formData)) 
      : dispatch(updateBookAction(formData))

    setShowModal(false)
  }


  return ( 
    <Form onSubmit={handleOnSubmit} className="d-flex flex-column justify-content-between h-100">
      {BOOK_FORM_FIELDS.map((field, index) => {

        const typeName = field.type === "textarea" ? "as" : "type"

        return(
          <CustomInput
            key={index}
            label={field.label}
            handleOnChange={handleOnChange}
            inputAttributes={{
              [typeName]: field.type,
              name: field.name,
              value: formData[field.name]
            }}
          />
        )
      })}

      <Stack direction="horizontal" gap={1} className="p-2 mt-auto">
          <Button
            variant="outline-success" 
            className="w-100"
            type="submit"
          >
            {isNewRecord ? "Create" : "Update"}
          </Button>

          <Button
            variant="outline-danger" 
            className="w-100"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
      </Stack>
    </Form>
   );
}
 
export default CreateOrEditBookForm;