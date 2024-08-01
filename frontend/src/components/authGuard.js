import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthGuard = (WrappedComponent) => {
  const AuthGuardComponent = (props) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.useReducer.user);
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!user) {
          router.push("/Sign-in");
        }
        setCheckingAuth(false);
      }, 1000);
      return () => clearTimeout(timer);
    }, [user, router]);

    if (checkingAuth) {
      return <p>Verificando autenticación...</p>;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthGuardComponent.displayName = `AuthGuard(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthGuardComponent;
};

export default AuthGuard;
