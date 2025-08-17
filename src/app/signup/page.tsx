'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signup, saveUserRole } from '@/services/firebase';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'school' | 'college' | 'professional'>('school'); // strongly typed
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ make it async so you can use await
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const userCredential = await signup(email, password);
      await saveUserRole(userCredential.user.uid, role);

      console.log('Signup Success', { name, email, role, rememberMe });
      router.push('/dashboard');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSocialSignup = (provider: string) => {
    alert(`Sign up with ${provider} clicked!`);
    // TODO: integrate signInWithPopup(firebaseProvider)
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Sign Up for CareerPath AI</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">Role / Profession</label>
                <select
                  className="form-select"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'school' | 'college' | 'professional')}
                >
                  <option value="school">School Student (13–18)</option>
                  <option value="college">College Student (18–23)</option>
                  <option value="professional">Working Professional (24+)</option>
                </select>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>

              <button type="submit" className="btn btn-success w-100 mb-3">Sign Up</button>

              <div className="text-center mb-3">or sign up with</div>

              <div className="d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-danger w-50 me-2"
                  onClick={() => handleSocialSignup('Google')}
                >
                  Google
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary w-50 ms-2"
                  onClick={() => handleSocialSignup('Facebook')}
                >
                  Facebook
                </button>
              </div>

              <p className="text-center mt-3">
                Already have an account? <a href="/" className="text-decoration-none">Login</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
