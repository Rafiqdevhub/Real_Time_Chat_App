import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

// const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL = "http://localhost:3000";
const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user`);
        // store
        console.log("other users -> ", res);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;
