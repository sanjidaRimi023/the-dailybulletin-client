import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <>
      <style>
        {`
          .glitch-text::before,
          .glitch-text::after {
            content: '404';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #111827; /* dark:bg-gray-900 */
          }
          .dark .glitch-text::before,
          .dark .glitch-text::after {
            background: #F9FAFB; /* dark:bg-gray-50 */
          }
          .glitch-text::before {
            left: 2px;
            text-shadow: -2px 0 #ef4444; /* red-500 */
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
          }
          .glitch-text::after {
            left: -2px;
            text-shadow: -2px 0 #3b82f6, 2px 2px #ef4444; /* indigo-500, red-500 */
            clip: rect(86px, 450px, 140px, 0);
            animation: glitch-anim-2 3s infinite linear alternate-reverse;
          }
          @keyframes glitch-anim {
            0% { clip: rect(42px, 450px, 92px, 0); }
            20% { clip: rect(12px, 450px, 78px, 0); }
            40% { clip: rect(40px, 450px, 62px, 0); }
            60% { clip: rect(25px, 450px, 100px, 0); }
            80% { clip: rect(80px, 450px, 52px, 0); }
            100% { clip: rect(35px, 450px, 95px, 0); }
          }
          @keyframes glitch-anim-2 {
            0% { clip: rect(80px, 450px, 115px, 0); }
            20% { clip: rect(95px, 450px, 70px, 0); }
            40% { clip: rect(30px, 450px, 120px, 0); }
            60% { clip: rect(55px, 450px, 85px, 0); }
            80% { clip: rect(45px, 450px, 105px, 0); }
            100% { clip: rect(75px, 450px, 130px, 0); }
          }
        `}
      </style>

      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <p className="relative inline-block p-3 text-sm font-medium text-indigo-500 rounded-full bg-indigo-50 dark:bg-gray-800 glitch-text">
              <span className="relative text-9xl font-black text-indigo-800 dark:text-gray-50">404</span>
            </p>
            <h1 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Something's missing.
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              This page is lost in the digital ether. Let's get you back on track.
            </p>

            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <Link
                to="/"
                className="w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-indigo-500 rounded-lg shrink-0 sm:w-auto hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:bg-indigo-600"
              >
                Take me home
              </Link>
            </div>
            
          
          </div>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;