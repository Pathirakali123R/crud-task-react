export const userFields = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  { name: "phone", label: "Phone Number", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { 
    name: "gender", 
    label: "Gender", 
    type: "select", 
    options: ["Male", "Female", "Other"], 
    required: true 
  },
  { 
    name: "bloodgroup", 
    label: "Blood Group", 
    type: "select", 
    options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] 
  }
];

