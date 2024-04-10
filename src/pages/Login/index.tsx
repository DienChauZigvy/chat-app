import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../components/Button";
import styles from "./Login.module.scss";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api";
import { AxiosError } from "axios";
import { useProfile } from "../../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  username: string;
  email: string;
}

export default function Login() {
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { mutateAsync, isSuccess: isLoginSuccess } = useMutation({
    mutationFn: (body: LoginPayload) => {
      return authApi.login(body);
    },
    mutationKey: ["login"],
  });

  const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
    try {
      const response = await mutateAsync(data, {
        onSuccess: () => {
          // toast?.success(`${data.email} login sucess`);
          console.log(`${data.email} login sucess`);
          reset();
        },
      });

      if (response) {
        localStorage.setItem("access_token", response.accessToken);
        localStorage.setItem("refresh_token", response.refreshToken);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        let message = error.response?.data.message || "Server Unavailable";
        let code = error.response?.status || 503;
        // toast?.error(`${code}: ${message}`);
        console.log(`${code}: ${message}`);
      } else if (error instanceof Error) {
        let message = error.message;
        console.log(`${message}`);
        // toast?.error(`${message}`);
      }
    }
  };

  const { data: profile, isSuccess: isProfileSuccess } = useProfile({
    enabled: isLoginSuccess,
  });

  useEffect(() => {
    if (isLoginSuccess && isProfileSuccess) {
      navigate("/");
    }

    localStorage.setItem("profile", JSON.stringify(profile));
  }, [isLoginSuccess, isProfileSuccess]);
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.login}>
          <div className={styles.loginHeader}>
            <div className={styles.title}>Log In</div>
          </div>
          <div className={styles.loginContent}>
            <div className={styles.titleHeader}>Welcome to Chat</div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.formInput}
            >
              <div className={styles.inputContainer}>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Email..."
                  className={styles.input}
                  {...register("email")}
                />
              </div>

              <span className={styles.errorMessage}>
                {errors.email?.message}
              </span>
              <div className={styles.inputContainer}>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  placeholder="Password..."
                  className={styles.input}
                  {...register("password")}
                />
              </div>
              <span className={styles.errorMessage}>
                {errors.password?.message}
              </span>

              <p className={styles.confirmText}>
                Don't have account? <span>Sign up</span>
              </p>

              <Button title="Continue" className="btnContinue" />
            </form>
          </div>
        </div>
      </div>
      ,
    </div>
  );
}
