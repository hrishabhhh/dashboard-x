function Error({ message = "Error occured !" }) {
  return (
    <>
      <div className="mx-auto mt-10 max-w-xl rounded-lg border border-red-200 bg-red-50 p-5">
        <h2 className="mb-2 text-lg font-semibold text-red-600">Error</h2>
        <p className="text-red-500">{message}</p>
      </div>
    </>
  );
}

export default Error;
