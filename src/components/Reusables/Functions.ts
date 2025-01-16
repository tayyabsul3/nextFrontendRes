import { useAppDispatch } from "@/redux/hooks";
import { Authenticate, UpdateUserData } from "@/redux/slices/user";
import axios from "axios";
import { DispatchProp } from "react-redux";
import { toast } from "sonner";

export const getUserData = async (dispatch: any) => {
  const uid = getCookie("uid#");
  if (uid) {
    console.log(uid);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/getuser",
        {
          uid,
          company: "Dassoft",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Fetched User Data :", data);
      dispatch(
        UpdateUserData({
          user: data,
        })
      );
      dispatch(Authenticate({ user: data, auth: true }));
    } catch (error: any) {
      dispatch(Authenticate({ user: {}, auth: false }));
      console.log(error.response.data);
      toast.message("failed to get data");
    }
  } else {
    dispatch(Authenticate({ user: {}, auth: false }));
    // console.log(error.response.data.message);
    toast.message("Please Login for better experience");
  }
};

// Set cookie
export const setCookie = (name: any, value: any) => {
  document.cookie = `${name}=${value};path=/`; // Set cookie with no expiration (session cookie)
};

// Get cookie
export const getCookie = (name: any) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null; // If not found, return null
};

// Delete cookie
export const deleteCookie = (name: any) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`; // Expire the cookie
};
