"use client"

import * as React from "react"
import { useState } from "react"
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import ForgotPassword from "./components/ForgotPassword"
import { FacebookIcon, GoogleIcon } from "./components/CustomIcons"
import { LoginRequest } from "@/src/features/auth/api/authApi.types"
import { toast } from "react-toastify"
import { LoginSchema } from "@/src/features/auth/utils/LoginSchema"
import { useLoginMutation } from "@/src/features/auth/api/authApi"
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
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}))
const SignInContainer = styled(Stack)(({ theme }) => ({
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

export default function Login() {
  const [open, setOpen] = useState(false)
  const [login] = useLoginMutation()
  const router = useRouter()

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data).unwrap()
      router.push(PATH.ROOT)
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message)
      else if (typeof error === "string") toast.error(error)
      else toast.error("Server error occurred")
    } finally {
      reset()
    }
  }

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <CssBaseline enableColorScheme />
      <Card variant="outlined">
        <Typography component="h1" variant="h4" sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 1 }}
        >
          <FormControl error={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  type="email"
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </FormControl>
          <FormControl error={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password"
                  type="password"
                  fullWidth
                  autoComplete="current-password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </FormControl>
          <FormControl>
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} color="primary" />}
                  label="Remember me"
                />
              )}
            />
          </FormControl>
          <ForgotPassword open={open} handleClose={handleClose} />
          <Button type="submit" fullWidth variant="contained">
            Login
          </Button>
          <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: "center" }}>
            Forgot your password?
          </Link>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button fullWidth variant="outlined" onClick={() => alert("Sign in with Google")} startIcon={<GoogleIcon />}>
            Login with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Login with Facebook
          </Button>

          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link href={PATH.AUTH.REGISTRATION} variant="body2" sx={{ alignSelf: "center" }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  )
}
