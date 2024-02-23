import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState();
  const [age, setAge] = useState();
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
      console.error("Errorr:", error);
    }
  };
  console.log(data);
  const addData = async () => {
    await createData();
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <>
      <div>
        <p>Heloo</p>
        <input
          onChange={(event) => setName(event.target.value)}
          placeholder="name"
        ></input>
        <input
          onChange={(event) => setAge(event.target.value)}
          placeholder="age"
        ></input>
        <button onClick={() => addData()}>submit</button>
      </div>
      {data?.map((el, index) => (
        <div key={index} className="">
          <div className="">{el.name}</div>
          <div>{el.age}</div>
        </div>
      ))}
    </>
  );
}
