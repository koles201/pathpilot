export type FormField = {
  name: "userName" | "email" | "password" | "passwordConfirmation"
  label: string
  type?: "text" | "email" | "password"
}

export const useSignupFields = () => {
  const fields: FormField[] = [
    { name: "userName", label: "Username", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    {
      name: "passwordConfirmation",
      label: "Confirm password",
      type: "password",
    },
  ]
  return fields
}
