"use client";
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AuthGuard = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const user = useAppSelector((state) => state.useReducer.user); 
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!user) {
          router.push('/Sign-in');
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
};

export default AuthGuard;
