import React, { useEffect, useState } from "react";

export default function Home() {
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

    console.log("update select user", updateInformation);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex gap-[10px]">
      <div
        id="Body"
        className="w-[1440px] bg-gray-200 flex flex-col gap-[100px]"
      >
        <div className="flex justify-center gap-[120px]">
          <input
            value={information.name || ""}
            type="text"
            onChange={(event) =>
              setInformation({ ...information, name: event.target.value })
            }
            placeholder="name"
          />
          <div>
            <input
              value={information.age || ""}
              type="number"
              onChange={(event) =>
                setInformation({
                  ...information,
                  age: parseInt(event.target.value) || "",
                })
              }
              placeholder="age"
            />
            <button className="bg-green-200" onClick={addData}>
              submit
            </button>
          </div>
        </div>
        <div className="w-[60%]">
          <div className=" flex flex-col">
            <div className="mb-[50px] ml-[50px]">Users</div>
            <div className="flex ml-[50px] bg-gray-600">
              <div className="text-gray-50 w-[5%] ">N</div>
              <div className="flex justify-center text-gray-50 w-[18%]">
                Picture
              </div>
              <div className=" flex justify-center w-[20%] text-gray-50 ">
                Username
              </div>
              <div className="flex justify-center w-[20%] text-gray-50">
                Age
              </div>
              <div className="flex justify-center text-gray-50 w-[20%]">
                Edit
              </div>
            </div>
            {data?.map((el, index) => (
              <div
                key={index}
                className="flex gap-[100px] ml-[50px] mt-[20px] bg-gray-300 "
              >
                <div>{index + 1}</div>
                <img className="w-[30px] " src={el.picture} alt="" />
                <div className="w-[300px]">
                  <div>{el.datas.name}</div>
                </div>
                <div className="w-[300px]">
                  <div>{el.datas.age}</div>
                </div>
                <div className="flex ">
                  <div
                    onClick={() => sendId(el.id)}
                    className="w-[100px] h-[30px] bg-red-300"
                  >
                    Delete
                  </div>
                  <div
                    onClick={() => selectUser(el.id)}
                    className="w-[100px] h-[30px] bg-yellow-300"
                  >
                    Update
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={updateInformation.name}
          onChange={(e) => {
            setUpdateInformation({
              ...updateInformation,
              name: `${e.target.value}`,
            });
          }}
        />
        <br />
        <br />
        <input
          type="number"
          value={updateInformation.age}
          onChange={(e) => {
            setUpdateInformation({
              ...updateInformation,
              age: parseInt(`${e.target.value}`),
            });
          }}
        />
        <br />
        <br />
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );
}
