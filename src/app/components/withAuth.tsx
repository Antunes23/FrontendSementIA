'use client';
import { useEffect, useState, type ComponentType } from 'react';

import { useRouter, usePathname } from 'next/navigation';
import Swal from 'sweetalert2';

export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      if (localStorage.getItem('logged') === 'true') {
        setIsLoggedIn(true);
      } else {
        
        if (pathname !== '/') {
          Swal.fire('Atenção', 'Você precisa estar logado!', 'warning')
            .then(() => router.push('/'));
        }
      }
    }, [router, pathname]); 

    if (!isLoggedIn) {
        return null;
    }

    return <Component {...props} />;
  };
}