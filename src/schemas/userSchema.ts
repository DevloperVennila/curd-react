export type FieldType = "text" | "email" | "number" | "date";

export interface UserField {
  name: string;
  label: string;
  type: FieldType;
  validation?: any;
  showInForm?: boolean;
  showInTable?: boolean;
}

export const userFields: UserField[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    validation: {
      required: "First name is required",
      maxLength: { value: 100, message: "Max 10 characters" }
    },
    showInForm: true,
    showInTable: true
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    validation: {
      required: "Last name is required"
    },
    showInForm: true,
    showInTable: true
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    validation: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email"
      }
    },
    showInForm: true,
    showInTable: true
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "number",
    validation: {
      required: "Phone is required",
      pattern: {
        value: /^\d{10}$/,
        message: "Phone must be 10 digits"
      }
    },
    showInForm: false,
    showInTable: false
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    validation: {
      required: "DOB is required"
    },
    showInForm: false,  
    showInTable: false
  },
  {
    name: "Address",
    label: "Address",
    type: "text",
    validation: {
      required: "Address is required"
    },
    showInForm: false,
    showInTable: false
  }
];
