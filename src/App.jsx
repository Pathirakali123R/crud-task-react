import { useState, useEffect } from "react";
import axios from "axios";
import UserModal from "./components/UserModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



function App() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("https://crud-json-server.onrender.com/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure want to delete this user?")) return;
    await axios.delete(`https://crud-json-server.onrender.com/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setShow(true);
  };

  return (
    <div className="pt-3 crud-task">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold user-text">User Management</h4>

        <button
          className="btn btn-primary px-4 shadow-sm"
          onClick={() => {
            setEditUser(null);
            setShow(true);
          }}
        >
          + Add User
        </button>
      </div>

      {/* Table Card */}
      <div className="card shadow border-0">
        <div className="card-body p-0">

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">

              <thead className="bg-primary text-white">
                <tr>
                      <th>ID</th>

                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  {/* <th style={{ maxWidth: "220px" }}>Address</th> */}
                  <th>Gender</th>
                  <th>Blood Group</th>
                  <th width="180">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No Users Found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>

                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>

                      {/* Address truncate */}
                      {/* <td style={{ maxWidth: "220px" }}>
                        <div className="text-truncate">
                          {user.address}
                        </div>
                      </td> */}

                      {/* Gender Badge */}
                      <td>
                        <span className="badge bg-primary">
                          {user.gender}
                        </span>
                      </td>
                                            <td>{user.bloodgroup}</td>


                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm me-2"   title="Edit User"

                          onClick={() => handleEdit(user)}
                        >
  <i className="fas fa-edit"></i>
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"   title="Delete User"

                          onClick={() => handleDelete(user.id)}
                        >
  <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <UserModal
        show={show}
        setShow={setShow}
        fetchUsers={fetchUsers}
        editUser={editUser}
      />

    </div>
  );
}

export default App;
