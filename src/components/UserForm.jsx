import { useState } from "react";
import axios from "axios";
import { userFields } from "./fields";

function UserForm({ fetchUsers }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/users", form);
    fetchUsers();
    setForm({});
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">

      {userFields.map((field) => (
        <div className="mb-3" key={field.name}>
          <label className="form-label">
            {field.label}
          </label>

          <input
            type={field.type}
            name={field.name}
            className="form-control"
            value={form[field.name] || ""}
            required={field.required}
            onChange={handleChange}
          />
        </div>
      ))}

      <button className="btn btn-primary">
        Save User
      </button>

    </form>
  );
}

export default UserForm;
