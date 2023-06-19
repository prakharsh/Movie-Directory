import React, { useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
    
const ProtectedRoute = ({ children }) => {
   const {user}=useContext(AuthContext)
    if (user!=null){
      return children ;
    }
    else{
          return <Navigate to="/login" exact/>;
    }
};

export default ProtectedRoute;