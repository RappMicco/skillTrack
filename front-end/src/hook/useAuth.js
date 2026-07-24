import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authThunk";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(getCurrentUser()).unwrap();
      } catch (error) {
        console.error(error);
        alert(error);
        navigate("/");
      }
    };

    getUser();
  }, [dispatch, navigate]);
};
