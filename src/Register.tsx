














import React from 'react';

export default function Register() {
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
                    <form className="space-y-4">
                        <div>
                            <label className="sr-only" htmlFor="email">Email</label>
                            <input
                                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                id="email"
                                placeholder="דוא״ל"
                                type="email"
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="password">Password</label>
                            <input
                                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                id="password"
                                placeholder="סיסמה"
                                type="password"
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="confirm-password">Confirm Password</label>
                            <input
                                className="form-input w-full rounded-lg h-14 p-4 text-base bg-background-light/80 dark:bg-background-dark/80 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-primary focus:border-primary"
                                id="confirm-password"
                                placeholder="אימות סיסמה"
                                type="password"
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
                        <a
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                            href="#"
                        >
                            כבר יש לך חשבון? התחברות
                        </a>
                    </div>
                </div>
            </div>
            <div className="h-8 bg-background-light dark:bg-background-dark"></div>
        </div>
    );
}
