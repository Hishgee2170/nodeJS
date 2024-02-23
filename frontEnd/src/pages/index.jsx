import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState("");

  const [data, setData] = useState([]);

  const createData = async () => {
    if (name === "" || age === "") return;

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, id }),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteData = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index }),
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // const updateData = async (index) => {
  //   try {
  //     const response = await fetch("http://localhost:3000/", {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ name, age, index }),
  //     });
  //     const newData = await response.json();
  //     setData(newData);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const addData = async () => {
    await createData();
    setName("");
    setAge("");
    setId("");
  };

  useEffect(() => {
    createData();
  }, []);

  return (
    <div className="w-[1440px] bg-gray-200 flex flex-col gap-[100px]">
      <div className="flex justify-center gap-[120px]">
        <input
          value={name}
          type="text"
          onChange={(event) => setName(event.target.value)}
          placeholder="name"
        />
        {/* <input
          value={id}
          type="text"
          onChange={(event) => setId(event.target.value)}
          placeholder="ID"
        /> */}
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
          <div className="flex ml-[50px] gap-[100px] bg-gray-600">
            <div className="text-gray-50">N</div>
            <div className="w-[200px] text-gray-50">Username</div>
            <div className="w-[200px] text-gray-50">Age</div>
          </div>
          {data?.map((el, index) => (
            <div
              key={index}
              className="flex gap-[100px] ml-[50px] mt-[20px] bg-gray-300 "
            >
              <div>{index + 1}</div>
              <div className="w-[300px]">
                <div>{el.name}</div>
              </div>
              <div className="w-[300px]">
                <div>{el.age}</div>
              </div>
              <div className="flex ">
                <div
                  onClick={() => deleteData()}
                  className="w-[100px] h-[30px] bg-red-300"
                >
                  Delete
                </div>
                <div
                  onClick={() => {
                    updateData(index);
                  }}
                  className="w-[100px] h-[30px] bg-yellow-300"
                >
                  Update
                </div>
              </div>
            </div>
          ))}
          {/* <div>
            <input
              placeholder="UPDATE NAME"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              placeholder="UPDATE AGE"
              type="number"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
