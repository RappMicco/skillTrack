import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../features/auth/authThunk";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
};
