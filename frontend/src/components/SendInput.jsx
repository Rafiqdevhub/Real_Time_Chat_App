import { useState } from "react";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const BASE_URL = "http://localhost:3000";
const SendInput = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler} className="px-4 my-3">
        <div className="w-full relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Send a message..."
            className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
          />
          <button
            type="submit"
            className="absolute flex inset-y-0 end-0 items-center pr-4"
          >
            <IoSend />
          </button>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SendInput;
