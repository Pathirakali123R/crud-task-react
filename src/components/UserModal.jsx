import { useState, useEffect } from "react";
import axios from "axios";
import { userFields } from "../config/userFields";

function UserModal({ show, setShow, fetchUsers, editUser }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setForm(editUser);
    } else {
      // Initialize all fields as empty string
      const emptyForm = {};
      userFields.forEach(field => {
        emptyForm[field.name] = "";
      });
      setForm(emptyForm);
    }
    setErrors({});
  }, [editUser]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    // Clear error while typing/selecting
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  // Basic validation function
  const validate = () => {
    const err = {};

    // Required fields validation
    userFields.forEach(field => {
      if (field.required && !form[field.name].trim()) {
        err[field.name] = `${field.label} is required`;
      }
    });

    // Phone number: only digits, length 10
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      err.phone = "Enter a valid phone number";
    }

    // Email: must contain @ and .
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      err.email = "Enter a valid email address";
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    // Stop submission if errors exist
    if (Object.keys(validationErrors).length > 0) return;

    try {
      if (editUser) {
        await axios.put(
          `https://crud-json-server.onrender.com/users/${editUser.id}`,
          form
        ); 
      } else {
        await axios.post("https://crud-json-server.onrender.com/users", form);
      }

      fetchUsers();
      setShow(false);
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h4 className="user-text">{editUser ? "Edit User" : "Add User"}</h4>

        <form onSubmit={handleSubmit}>
  <div className="row">
    {userFields.map(field => (
      <div key={field.name} className="col-md-6 mb-3 text-start">
<label className="form-label w-100 text-start">
          {field.label} {field.required && <span className="text-danger">*</span>}
        </label>

        {/* Use select for Gender/BloodGroup if needed */}
        {field.type === "select" ? (
          <select
            name={field.name}
            className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
value={form[field.name] || ""}
            onChange={handleChange}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            name={field.name}
            className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
value={form[field.name] || ""}
            onChange={handleChange}
          />
        )}

        {errors[field.name] && (
          <small className="text-danger">{errors[field.name]}</small>
        )}
      </div>
    ))}
  </div>

  <div className="d-flex mt-3">
    <button className="btn btn-outline-primary me-2">Submit</button>
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShow(false)}
    >
      Cancel
    </button>
  </div>
</form>

        </div>
      </div>
    </div>
  );
}

export default UserModal;
