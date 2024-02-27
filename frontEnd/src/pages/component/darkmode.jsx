const darkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`flex flex-col gap-8 p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } rounded-lg `}
    >
      <div className="ml-4">
        <h1 className="text-3xl">USER LIST</h1>
        <button onClick={toggleDarkMode} className="text-sm mt-2">
          {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
      <Home />
    </div>
  );
};

export default darkMode;
