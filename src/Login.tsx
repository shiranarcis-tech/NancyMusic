
import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden p-4 sm:p-6 lg:p-8">
            <div className="layout-container flex h-full grow flex-col w-full max-w-2xl">
                <div className="flex flex-col items-center justify-center py-5">
                    <div className="layout-content-container flex flex-col w-full">
                        <div className="flex flex-col items-center text-center p-4">
                            <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark">
                                Join Home Flavors
                            </p>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                הצטרפו לטעמי הבית
                            </p>
                        </div>
                        <form className="w-full mt-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col flex-1">
                                    <p className="text-base font-medium leading-normal pb-2">First Name</p>
                                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                                        <input
                                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light bg-white dark:bg-gray-800 dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal border border-gray-200 dark:border-gray-700"
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                </label>
                                <label className="flex flex-col flex-1">
                                    <p className="text-base font-medium leading-normal pb-2">Last Name</p>
                                    <div className="flex w-full flex-1 items-stretch rounded-lg">
                                        <input
                                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light bg-white dark:bg-gray-800 dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal border border-gray-200 dark:border-gray-700"
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                </label>
                            </div>
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-base font-medium leading-normal pb-2">Username</p>
                                <div className="flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light bg-white dark:bg-gray-800 dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal border border-gray-200 dark:border-gray-700"
                                        placeholder="Enter your username"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-base font-medium leading-normal pb-2">Email</p>
                                <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light bg-white dark:bg-gray-800 dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal border border-gray-200 dark:border-gray-700"
                                        placeholder="Enter your email"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-success">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                </div>
                            </label>
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-base font-medium leading-normal pb-2">Password</p>
                                <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light bg-white dark:bg-gray-800 dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal border border-gray-200 dark:border-gray-700"
                                        placeholder="Enter your password"
                                        type="password"
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined">visibility</span>
                                    </button>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                                    <div
                                        className="bg-success h-1.5 rounded-full"
                                        style={{ width: '75%' }}
                                    ></div>
                                </div>
                            </label>
                            <label className="flex flex-col min-w-40 flex-1">
                                <p className="text-base font-medium leading-normal pb-2">Confirm Password</p>
                                <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light bg-white dark:bg-gray-800 dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal border border-gray-200 dark:border-gray-700"
                                        placeholder="Confirm your password"
                                        type="password"
                                    />
                                    <button
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400"
                                        type="button"
                                    >
                                        <span className="material-symbols-outlined">visibility_off</span>
                                    </button>
                                </div>
                                <p className="text-error text-sm mt-1">Passwords do not match.</p>
                            </label>
                            <div className="pt-4">
                                <button
                                    className="w-full flex items-center justify-center rounded-lg bg-primary h-14 px-6 text-base font-bold text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                                    type="submit"
                                >
                                    Sign Up / הרשמה
                                </button>
                            </div>
                        </form>
                        <div
                            className="hidden mt-6 p-4 rounded-lg bg-success/20 text-success text-center"
                            id="success-message"
                        >
                            <p className="font-semibold">Registration successful!</p>
                            <p>Please check your email to verify your account.</p>
                        </div>
                        <div className="mt-8 text-center">
                            <p className="text-base text-gray-600 dark:text-gray-300">
                                Already have an account?{' '}
                                <Link className="font-medium text-primary hover:underline" to="/login">
                                    Log in
                                </Link>{' '}
                                / יש לכם כבר חשבון?{' '}
                                <Link className="font-medium text-primary hover:underline" to="/login">
                                    התחברו
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
