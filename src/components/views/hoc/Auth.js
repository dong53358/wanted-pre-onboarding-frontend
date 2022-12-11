import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(SpecificComponent) {
  function AuthenticationCheck() {
    const navigate = useNavigate();
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/");
      } else {
        navigate("/todo");
      }
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
