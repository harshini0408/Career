'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

type Role = 'school' | 'college' | 'professional';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // TODO: fetch user role from Firestore later
        setUserRole('school'); // temporary hardcoded
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) return null; // redirecting

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link href="/" className="navbar-brand">CareerPath AI</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {userRole === 'school' && (
                <>
                  <li className="nav-item">
                    <Link href="/games" className={`nav-link ${pathname === '/games' ? 'active' : ''}`}>Games</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/mentorship" className={`nav-link ${pathname === '/mentorship' ? 'active' : ''}`}>Mentors</Link>
                  </li>
                </>
              )}
              {userRole === 'college' && (
                <>
                  <li className="nav-item">
                    <Link href="/internships" className={`nav-link ${pathname === '/internships' ? 'active' : ''}`}>Internships</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/courses" className={`nav-link ${pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
                  </li>
                </>
              )}
              {userRole === 'professional' && (
                <>
                  <li className="nav-item">
                    <Link href="/courses" className={`nav-link ${pathname === '/courses' ? 'active' : ''}`}>Courses</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/mentorship" className={`nav-link ${pathname === '/mentorship' ? 'active' : ''}`}>Mentors</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link href="/profile" className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link text-danger p-0"
                  onClick={async () => {
                    await signOut(auth);
                    router.push('/login');
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 container mt-4">{children}</main>

      {/* Footer */}
      <footer className="bg-light text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} CareerPath AI. All Rights Reserved.
      </footer>
    </div>
  );
}
