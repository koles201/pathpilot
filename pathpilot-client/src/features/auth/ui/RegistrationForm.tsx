import { SignupSchema, SignupSchemaType } from "@/src/features/auth/utils/RegistrationSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import s from "./registration.module.scss"
import { FormField, useSignupFields } from "@/src/features/auth/utils/signupFormFields"

export const RegistrationForm = () => {
  const { handleSubmit, register, reset } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { email: "", password: "", agreeToTerms: false },
  })

  const handleFormSubmit = (data: SignupSchemaType) => {
    console.log("Submit data: " + data)
    reset()
  }
  const formFields: FormField[] = useSignupFields()

  return (
    <div className={s.formContainer}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {formFields.map((field, index) => (
          <div key={index} className={s.formGroup}>
            <label className={s.label}>{field.label}:</label>
            <input type={field.type} {...register(field.name)} className={s.input} />
          </div>
        ))}
        <div className={`${s.formGroup} ${s.checkboxContainer}`}>
          <input type="checkbox" {...register("agreeToTerms")} />
          <label className={s.label}>I agree to the Terms of Service and Privacy Policy</label>
        </div>
        <button type="submit" className={s.submitButton}>
          Register
        </button>
      </form>
    </div>
  )
}
