import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Taskmenger.css";
export const TaskMenger = () => {
  let URL =
    "https://react-project-204fd-default-rtdb.asia-southeast1.firebasedatabase.app/task";

  let todo = useRef("q");
  let user = useRef("w");
  let deadline = useRef("");

  let [data, setData] = useState({});
  let [flag, setFlag] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(deadline);

    let obj = {
      todo: todo.current.value,
      user: user.current.value,
      deadline: deadline.current.checked,
    };

    axios.post(`${URL}.json`, obj).then(() => {
      todo.current.value = "";
      user.current.value = "";
      deadline.current.checked = false;

      alert("data saved in Database");
      todo.current.focus();
      setFlag(!flag);
    });
  }

  function handleDelete(id) {
    axios.delete(`${URL}/${id}.json`).then((res) => {
      setFlag(!flag);
    });
  }

  function handleUpdate(id) {
    let todo = prompt("provided updated todo ");
    let user = prompt("provide updated user");

    let obj = {
      todo,
      user,
    };

    axios.patch(`${URL}/${id}.json`, obj).then((res) => {
      setFlag(!flag);
    });
  }

  useEffect(() => {
    todo.current.focus();

    axios.get(`${URL}.json`).then((res) => {
      setData(res.data);
    });
  }, [flag]);

  return (
    <>
      <h2>Learning useRef</h2>

      <form onSubmit={handleSubmit}>
        <input ref={todo} placeholder="what's the todo" />
        <input ref={user} placeholder="Who's creating it" />
        <label>Edit Access</label>
        <input ref={deadline} type="checkbox" />
        <input type="submit" />
      </form>

      <div>
        {Object.entries(data).map(([id, value], i, arr) => {
          return (
            <div key={i} className="todo-container">
              <p>
                <b>Todo : </b>
                {value.todo}
              </p>
              <p>
                <b>User : </b> {value.user}{" "}
              </p>
              {value.deadline ? (
                <div>
                  <button onClick={() => handleUpdate(id)}>Update</button>
                  <button onClick={() => handleDelete(id)}>Delete</button>
                </div>
              ) : (
                <>
                  <h3>Read only</h3>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
