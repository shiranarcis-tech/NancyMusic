

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [birthdayError, setBirthdayError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const validateAge = (dateString: string) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age <= 7) {
            setBirthdayError('Age must be greater than 7');
        } else {
            setBirthdayError('');
        }
    };

    const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setBirthday(val);
        validateAge(val);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (birthdayError) return;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                birthday,
                email
            });

            console.log('User registered:', user.uid);
            alert('Registration successful!');

        } catch (error: any) {
            console.error("Error registering user:", error);
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark">
            <div className="relative flex-grow flex flex-col items-center justify-center p-4">
                <div
                    className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10 dark:opacity-20"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0BjYdM-kMJ6K-birawsnqNMxpWN7lneL5qN-bnmrgIiSposuvJDiTk_0S3CHoj4SsMPHIVZjx0xCaVyTRFe2DdZYy_1uiBF9yTtebSiKtabAFD7JXQpmm8QI-1vE9PV9rE1k9mNJz2i3DfhOJOyRROUpOoWOJPGGzg0nZm-15a5kPv0MqExHvgJUU_wTQIFL1EQDn80g9eqO17uGK5cmZB1iNJOZcl7Yg53Uo--xHLcTHI5zWaeaA_Y5nWgQ8LJUb_W5yNfVQHSg")' }}
                ></div>
                <div className="relative w-full max-w-sm z-10">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-black dark:text-white">הצטרפות לNancyMusic</h1>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="sr-only" htmlFor="first-name">First Name</label>
                                <input
                                    className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                    id="first-name"
                                    placeholder="שם פרטי"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="sr-only" htmlFor="last-name">Last Name</label>
                                <input
                                    className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                    id="last-name"
                                    placeholder="שם משפחה"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="birthday">Birthday</label>
                            <input
                                className={`form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border focus:ring-primary focus:border-primary ${birthdayError ? 'border-red-500 text-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                id="birthday"
                                placeholder="תאריך לידה"
                                type="date"
                                value={birthday}
                                onChange={handleBirthdayChange}
                            />
                            {birthdayError && <p className="text-red-500 text-sm mt-1">{birthdayError}</p>}
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                id="email"
                                placeholder="דוא״ל"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input
                                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                id="password"
                                placeholder="סיסמה"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
                            <input
                                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                id="confirm-password"
                                placeholder="אימות סיסמה"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            className="w-full h-14 px-5 rounded-lg bg-primary text-white text-base font-bold flex items-center justify-center hover:bg-primary/90 transition-colors"
                            type="submit"
                        >
                            הרשמה
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <Link
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                            to="/login"
                        >
                            כבר יש לך חשבון? התחברות
                        </Link>
                    </div>
                </div>
            </div>
            <div className="h-8 bg-background-light dark:bg-background-dark"></div>
        </div>
    );
}
