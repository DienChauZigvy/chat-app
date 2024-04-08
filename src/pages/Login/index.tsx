import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import Button from "../../components/Button";
import styles from "./Login.module.scss";

export interface LoginPayload {
  email: string;
  password: string;
}

export default function Login() {
  const validationSchema = yup.object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginPayload> = (data) => {
    console.log(data);
  };
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
