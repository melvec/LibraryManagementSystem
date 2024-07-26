import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm";
import CustomInput from "./CustomInput";
import { loginUser } from "../axios/userAxios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginAction, getUserAction } from "../redux/userActions";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const initialFormData = {
  email: '',
  password: ''
}
const LoginForm = () => {
  const { formData, handleOnChange } = useForm(initialFormData)
  const { email, password }  = formData

  const dispatch = useDispatch()

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    
    // call axios to hit login endpoint
    const result = await loginUser(formData)

    if(result.status === "error"){
      return toast.error(result.message)
    }

    // If Success

    // Store accessJWT in session  Storage
    // Store refreshJWT in local storage
    sessionStorage.setItem("accessJWT", result.data.accessJWT)
    localStorage.setItem("refreshJWT", result.data.refreshJWT)

    // Now get the user info
    // dispatch an action to get/ update user
    dispatch(getUserAction())
  }

  // Logic to redirect user once logged in
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()

  const { state } = useLocation()
  const fromLocation = state?.from ? state.from : '/admin'
  
  useEffect(()=>{
    // if logged in, redirect to required route
    // if(user?._id) { navigate('/admin')}
    if(user?._id) { navigate(fromLocation)}

    // if not logged in, try auto login
    if(!user?._id) { dispatch(autoLoginAction())}
  }, [user?._id, navigate, dispatch, fromLocation])
  
  return ( 
    <Form onSubmit={(e) => handleOnSubmit(e)}>
      <CustomInput 
        label = "Email"
        handleOnChange={handleOnChange}
        inputAttributes= {{
          type: 'email',
          name: 'email',
          value: email,
          placeholder: 'Enter your Email',
          required: true
        }}
      />

      <CustomInput 
        label = "Password"
        handleOnChange={handleOnChange}
        inputAttributes= {{
          type: 'password',
          name: 'password',
          value: password,
          placeholder: 'Enter a Password',
          required: true
        }}
      />

      <Button 
        variant="primary" 
        type="submit"
        >
          Login
        </Button>
    </Form>
   );
}
 
export default LoginForm;