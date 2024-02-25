import React, { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");

  const createData = async () => {
    if (name === "" || age === "") return;

    try {
      const response = await fetch("http://localhost:2222/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:2222/${id}`, {
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

  function updateUser() {
    let item = { newName, newAge, userId };
    console.warn("item", item);
    fetch(`http://localhost:2222/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        setData(resp);
      });
    });
  }

  const addData = async () => {
    await createData();
    setName("");
    setAge("");
  };
  const sendId = async (id) => {
    await deleteData(id);
  };

  function selectUser(id) {
    let item = data[id];
    setNewName(item.datas.name);
    setNewAge(item.datas.age);
    setUserId(item.id);
  }

  return (
    <div className="flex gap-[10px]">
      <div
        id="Body"
        className="w-[1440px] bg-gray-200 flex flex-col gap-[100px]"
      >
        <div className="flex justify-center gap-[120px]">
          <input
            value={name}
            type="text"
            onChange={(event) => setName(event.target.value)}
            placeholder="name"
          />
          <div>
            <input
              value={age}
              type="number"
              onChange={(event) => setAge(event.target.value)}
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
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <br />
        <br />
        <input
          type="number"
          value={newAge}
          onChange={(e) => {
            setNewAge(e.target.value);
          }}
        />
        <br />
        <br />
        <button onClick={updateUser}>Update User</button>
      </div>
    </div>
  );
}
