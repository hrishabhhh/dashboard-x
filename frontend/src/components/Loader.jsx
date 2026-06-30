function Loader({ message = "Loading" }) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 py-10">
      <p className="text-xl font-bold">{message}</p>
      <div className="flex gap-2">
        <div className="h-2 w-2 animate-smooth-bounce rounded-full bg-blue-500"></div>
        <div
          className="h-2 w-2 animate-smooth-bounce rounded-full bg-blue-500"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="h-2 w-2 animate-smooth-bounce rounded-full bg-blue-500"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
}
export default Loader;
