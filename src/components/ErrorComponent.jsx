import React from "react";
import { Link, useRouteError } from "react-router-dom";

function ErrorComponent() {
  const error = useRouteError();
  console.log(error);
  const {
    statusText,
    status,
    error: { message },
  } = error;
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="m-2 p-2 text-gray-200 text-2xl font-bold">
          {status} {statusText}
        </h1>
        <p className="text-gray-400">{message}</p>

        <Link to="/" className="m-4">
          <button className="px-6 py-2 bg-green-600  rounded-lg font-semibold text-gray-200">
            Back to Home
          </button>
        </Link>
      </div>
    </>
  );
}

export default ErrorComponent;
