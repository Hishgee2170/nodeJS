import React, { useEffect, useState } from "react";

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
  };

  return [darkMode, toggleDarkMode];
};

const Home = () => {
  const API_DATABASE = "http://localhost:2222/";
  const [information, setInformation] = useState({
    name: "",
    age: "",
  });
  const [updateInformation, setUpdateInformation] = useState({
    name: "",
    age: "",
    userID: "",
  });
  const [data, setData] = useState([]);
  const [darkMode, toggleDarkMode] = useDarkMode();

  const getData = async () => {
    try {
      const response = await fetch(`${API_DATABASE}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const createData = async () => {
    if (information.name === "" || information.age === "") return;
    try {
      const response = await fetch(`${API_DATABASE}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`${API_DATABASE}${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateUser = async () => {
    setUpdateInformation({ name: "", age: "" });
    try {
      const response = await fetch(`${API_DATABASE}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateInformation),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addData = async () => {
    await createData();
    setInformation({ ...information, name: "", age: "" });
  };

  const sendId = async (id) => {
    await deleteData(id);
  };

  function selectUser(id) {
    data.map((el) => {
      if (el.id == id) {
        setUpdateInformation({
          name: `${el.datas.name}`,
          age: `${el.datas.age}`,
          userID: `${el.id}`,
        });
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className={`flex flex-col gap-8 p-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } rounded-lg `}
    >
      <div className="ml-4">
        <h1 className="text-3xl">USER LIST</h1>
        <button onClick={toggleDarkMode} className="text-sm mt-2 hover:gra">
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-sun"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-moon-star"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              <path d="M19 3v4"></path>
              <path d="M21 5h-4"></path>
            </svg>
          )}
        </button>
      </div>
      <div className="ml-4 flex flex-col md:flex-row md:gap-8">
        <h2 className="text-xl">ADD USER</h2>
        <div className="flex gap-4 items-center">
          <input
            className="input-field"
            value={information.name}
            type="text"
            onChange={(event) =>
              setInformation({ ...information, name: event.target.value })
            }
            placeholder="Name"
          />
          <input
            className="input-field"
            value={information.age}
            type="number"
            onChange={(event) =>
              setInformation({
                ...information,
                age: parseInt(event.target.value) || 0,
              })
            }
            placeholder="Age"
          />
          <button
            className="btn bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={addData}
          >
            ADD USER
          </button>
        </div>
      </div>
      <div className="flex gap-8 ml-4">
        <p>#</p>
        <p>USER NAME</p>
        <p>USER AGE</p>
        <p>USER INFORMATION EDIT</p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:gap-8">
        <div className=" ml-4 flex flex-col gap-4">
          {data?.map((el, index) => (
            <div key={index} className="flex gap-4  rounded-lg p-4">
              <div>{index + 1}</div>
              <div className="w-48">{el.datas.name}</div>
              <div className="w-24">{el.datas.age}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => sendId(el.id)}
                  className="action-btn bg-red-500 hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Delete
                </button>
                <button
                  onClick={() => selectUser(el.id)}
                  className="action-btn bg-yellow-500 hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
        {data.length !== 0 ? (
          <div className="flex flex-col justify-center items-center ml-4 p-4 rounded-lg">
            <h1>Update Information</h1>
            <input
              type="text"
              value={updateInformation.name}
              onChange={(e) =>
                setUpdateInformation({
                  ...updateInformation,
                  name: e.target.value,
                })
              }
              className="input-field mb-2"
              placeholder="New Name"
            />
            <br />
            <input
              type="number"
              value={updateInformation.age}
              onChange={(e) =>
                setUpdateInformation({
                  ...updateInformation,
                  age: parseInt(e.target.value) || 0,
                })
              }
              className="input-field mb-2"
              placeholder="New Age"
            />
            <button
              className="btn bg-green-500 hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={updateUser}
            >
              Update User
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
