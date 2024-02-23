import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [data, setData] = useState([]);

  const createData = async () => {
    try {
      const response = await fetch("http://localhost:3000/", {
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

  const addData = async () => {
    await createData();
    setName("");
    setAge("");
  };

  useEffect(() => {
    createData();
  }, []);

  return (
    <>
      <div className="flex justify-center gap-[120px]">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="name"
        />
        <div>
          <input
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="age"
          />
          <button className="bg-green-200" onClick={addData}>
            submit
          </button>
        </div>
      </div>
      <div className="w-[50%] border-[2px] rounded-[8px]">
        <div className=" flex justify-center flex-col">
          {data?.map((el, index) => (
            <div key={index} className="flex gap-[100px] ">
              <div>{el.name}</div>
              <div>{el.age}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
