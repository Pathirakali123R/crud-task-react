// import { userFields } from "../config/userFields";

// function UserList({ users, onEdit, onDelete }) {
//   return (
//     <div className="table-responsive mt-4">
//       <table className="table table-striped table-hover align-middle shadow-sm rounded">
//         <thead className="table-dark">
//           <tr>
//             {userFields.map(field => (
//               <th key={field.name}>{field.label}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan={userFields.length + 1} className="text-center text-muted">
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             users.map(user => (
//               <tr key={user.id}>
//                 {userFields.map(field => (
//                   <td key={field.name}>{user[field.name]}</td>
//                 ))}
//                 <td>
//                   <button
//                     className="btn btn-sm btn-warning me-2"
//                     onClick={() => onEdit(user)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-danger"
//                     onClick={() => onDelete(user.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>p
//   );
// }

// export default UserList;
