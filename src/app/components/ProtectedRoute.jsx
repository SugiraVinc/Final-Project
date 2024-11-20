'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function ProtectedRoute({ children, adminOnly = false }) {
  const router = useRouter();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo?.token) {
      router.push('/login');
      return;
    }

    // Optional: Check if route is admin-only
    // if (adminOnly && userInfo.role !== 'admin') {
    //   router.push('/unauthorized');
    //   return;
    // }
  }, [userInfo, router, adminOnly]);

  // Only render children if authenticated
  return userInfo?.token ? <>{children}</> : null;
}

export default ProtectedRoute;
