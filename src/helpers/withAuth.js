import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent, allowedRoles) => {
  const WithAuth = (props) => {
    const router = useRouter();
    const { status, user } = useSelector((state) => state.auth);

    useEffect(() => {
      if (status === 'authenticated' && user.roles) {
        const userRoles = user.roles.map((role) => role.name);
        const hasAccess = allowedRoles.some((role) => userRoles.includes(role));
        if (!hasAccess) {
          router.push('/no-access'); // Redirigir a una página de acceso denegado
        }
      } else if (status === 'not-authenticated') {
        router.push('/login'); // Redirigir a la página de login si no está autenticado
      }
    }, [status, user, router]);

    if (status === 'checking') {
      return <div>Loading...</div>; // Mostrar un loading mientras se verifica la autenticación
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuth;
};

export default withAuth;
