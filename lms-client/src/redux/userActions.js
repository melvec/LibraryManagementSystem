import { toast } from "react-toastify"
import { getAccessToKen, getUser, loginUser, logoutUser } from "../axios/userAxios"
import { setUser } from "./userSlice"

export const getUserAction = () => async(dispatch) => {
  // call axios to get user
  const result = await getUser()

  if(result?.error) {
    return toast.error(result.message)
  }

  dispatch(setUser(result.data))
}

// Autologin
export const autoLoginAction = () => async(dispatch) => {
  // check if the access token exists
  const accessJWT = sessionStorage.getItem("accessJWT")
  const refreshJWT = localStorage.getItem("refreshJWT")
  // if no access token, get new access token based on refresh token
  if(!accessJWT && refreshJWT){
    // call axios to get new access token
    const result = await getAccessToKen()

    if(result.status === "success"){
      // store new access token
      sessionStorage.setItem("accessJWT", result.data)
      dispatch(getUserAction())
      return
    }
  }

  // if access token is present, get user
  dispatch(getUserAction())
}

// Logout user
export const logoutUserAction = () => async(dispatch) => {
  // call api to logout from api as well
  const result = await logoutUser()

  if(result.status === "error"){
    return toast.error(result.message)
  }

  // remove tokens from browser storage
  sessionStorage.removeItem("accessJWT")
  localStorage.removeItem("refreshJWT")
  // clear user state
  dispatch(setUser({}))
}