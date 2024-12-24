import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <Helmet>
        <title>ErrorPage</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-red-600">Oops! Page Not Found</h1>
      <p className="text-lg mt-4">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
