"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useSelector } from "react-redux";

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const user = useSelector((state) => state.useReducer.user); // Ajusta el selector según tu slice

    useEffect(() => {
      if (!user) {
        router.push("/Sign-in");
      }
    }, [user, router]);

    // Si el usuario no está autenticado, no renderiza el componente envuelto.
    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;
