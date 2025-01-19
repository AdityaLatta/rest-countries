import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <section className="text-center flex flex-col justify-center items-center h-96 min-h-dvh bg-White dark:bg-Very-Dark-Blue-Background dark:text-White">
            <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
            <h1 className="text-6xl font-bold mb-4">404 Not Found</h1>
            <p className="text-xl mb-5">This page does not exist</p>
            <Link
                to="/"
                className="text-white bg-indigo-700 hover:bg-indigo-900 dark:bg-Dark-Blue-Elements rounded-md px-3 py-2 mt-4"
            >
                Go Back
            </Link>
        </section>
    );
};

export default NotFound;
