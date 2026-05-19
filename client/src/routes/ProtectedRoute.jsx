import { Navigate } from "react-router-dom";
import useStore from "@/store/useStore";

const ProtectedRoute = ({ children }) => {
  const { isLogin, isAuthChecked } = useStore();

  if (!isAuthChecked) {
    return null;
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;