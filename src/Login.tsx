import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError('אימייל או סיסמה שגויים');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark">
      <div className="relative flex-grow flex flex-col items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: 'url("/nancy.png")', opacity: 0.15 }}
        />
        <div className="relative w-full max-w-sm z-10">
          <div className="text-center mb-8">
            <img src="/nancy.png" alt="NancyMusic" className="mx-auto h-40 w-40 rounded-full object-cover mb-4 shadow-xl border-4 border-white dark:border-gray-800" />
            <h1 className="text-3xl font-bold text-black dark:text-white">NancyMusic</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">התחברות לחשבון</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="sr-only" htmlFor="email">אימייל</label>
              <input
                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                id="email"
                placeholder="דוא״ל"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">סיסמה</label>
              <input
                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                id="password"
                placeholder="סיסמה"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              className="w-full h-14 px-5 rounded-lg bg-primary text-white text-base font-bold flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? 'מתחבר...' : 'התחברות'}
            </button>
          </form>
          <div className="text-center mt-6">
            <Link
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              to="/register"
            >
              אין לך חשבון? הרשמה
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
