function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 px-6 py-5 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Dashboard-X</span>. All
          rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">
            Intelligent Task & Risk Management
          </span>

          <span className="h-1 w-1 rounded-full bg-red-500" />

          <span className="text-xs text-gray-500">
            Built with MERN + FastAPI + AI
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
