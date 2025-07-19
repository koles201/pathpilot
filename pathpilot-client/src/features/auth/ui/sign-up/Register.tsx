"use client"

import * as React from "react"
import { Controller, useForm } from "react-hook-form"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import Divider from "@mui/material/Divider"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import FormControl from "@mui/material/FormControl"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import MuiCard from "@mui/material/Card"
import { styled } from "@mui/material/styles"
import { FacebookIcon, GoogleIcon } from "./components/CustomIcons"
import { toast } from "react-toastify"
import { useRegisterMutation } from "@/src/features/auth/api/authApi"
import { RegisterRequest } from "@/src/features/auth/api/authApi.types"
import { FormHelperText } from "@mui/material"
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterSchema } from "@/src/features/auth/utils/RegisterSchema"
import { useRouter } from "next/navigation"
import { PATH } from "@/src/shared/config/routes"

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}))
const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}))

export default function Register() {
  const [register] = useRegisterMutation()

  const router = useRouter()

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  })

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await register(data).unwrap()
      toast.success("Successfully registered!🥳🥳🥳")
      router.push(PATH.AUTH.LOGIN)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else if (typeof error === "string") {
        toast.error(error)
      } else {
        toast.error("Unknown error occurred")
      }
    } finally {
      reset()
    }
  }

  return (
    <SignUpContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 1 }}
        >
          <FormControl error={!!errors.name}>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required." }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="name"
                  placeholder="Jon Snow"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  autoComplete="name"
                  color={errors.name ? "error" : "primary"}
                />
              )}
            />
          </FormControl>
          <FormControl error={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Please enter a valid email address.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address.",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  placeholder="your@email.com"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                  color={errors.email ? "error" : "primary"}
                />
              )}
            />
          </FormControl>
          <FormControl error={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password must be at least 6 characters long.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long.",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password"
                  placeholder="••••••"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  autoComplete="new-password"
                  color={errors.password ? "error" : "primary"}
                />
              )}
            />
          </FormControl>
          <FormControl error={!!errors.agreeToTerms} required component="fieldset" variant="standard" sx={{ mt: 1 }}>
            <Controller
              name="agreeToTerms"
              control={control}
              rules={{ required: "You must agree to the terms" }}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} color="primary" />}
                  label="I agree to the Terms & Conditions"
                />
              )}
            />
            {errors.agreeToTerms && <FormHelperText>{errors.agreeToTerms.message}</FormHelperText>}
          </FormControl>
          <Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>
            Register
          </Button>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button fullWidth variant="outlined" onClick={() => alert("Sign up with Google")} startIcon={<GoogleIcon />}>
            Register with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Register with Facebook
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link href={PATH.AUTH.LOGIN} variant="body2" sx={{ alignSelf: "center" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignUpContainer>
  )
}
