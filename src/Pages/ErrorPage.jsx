import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <>
      <style>
        {`
          .glitch-text {
            /* This container holds the main text and its pseudo-elements */
            position: relative;
          }

          .glitch-text::before,
          .glitch-text::after {
            content: '404';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #111827; /* dark:bg-gray-900 */
            color: transparent; /* Hide the text of pseudo-elements, we only want their shadow */
            overflow: hidden;
          }

          .dark .glitch-text::before,
          .dark .glitch-text::after {
            background: #F9FAFB; /* dark:bg-gray-50 */
          }

          /* Red channel ghost */
          .glitch-text::before {
            text-shadow: -3px 0 #ef4444; /* red-500 */
            /* New holographic drift animation */
            animation: holographic-drift 6s infinite linear alternate;
          }

          /* Blue channel ghost */
          .glitch-text::after {
            text-shadow: 3px 0 #3b82f6; /* blue-500 */
             /* New holographic drift animation with different timing for a unique effect */
            animation: holographic-drift 8s infinite linear alternate-reverse;
          }

          /* New Keyframes for the holographic drift effect */
          @keyframes holographic-drift {
            0% {
              transform: translate(0, 0);
              opacity: 0.9;
            }
            25% {
              transform: translate(4px, -2px);
              opacity: 0.4;
            }
            50% {
              transform: translate(-3px, 3px);
              opacity: 0.8;
            }
            75% {
              transform: translate(2px, -4px);
              opacity: 0.5;
            }
            100% {
              transform: translate(0, 0);
              opacity: 0.9;
            }
          }
        `}
      </style>

      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center">
            <div className="p-3 text-sm font-medium text-indigo-500 rounded-full bg-indigo-50 dark:bg-gray-800">
                <span className="relative text-9xl font-black text-indigo-800 dark:text-gray-50 glitch-text">
                  404
                </span>
            </div>
            
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