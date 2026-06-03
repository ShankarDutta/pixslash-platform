"use client";

import { authClient } from "@/lib/auth-client";
import { RegisterSchemaType } from "@/lib/type";
import { registerSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Spinner } from "../shadcnui/spinner";

const RegisterForm = () => {
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },

    mode: "onSubmit",
  });

  const submitRegisterData = async ({
    name,
    emailAddress,
    confirmPassword,
  }: RegisterSchemaType) => {
    try {
      const { error } = await authClient.signUp.email({
        name,
        email: emailAddress,
        password: confirmPassword,
      });

      if (error) {
        console.error(error);
        toast.error("Registration failed. Please try again.");
      } else {
        toast.success("Registration successful!");

        reset();

        replace("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitRegisterData)}
      className="space-y-2"
      noValidate>
      {/* user full name field  */}
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name </FieldLabel>
            <Input
              {...field}
              type="text"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Full name"
              autoComplete="name"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* user email address field  */}
      <Controller
        name="emailAddress"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email Address </FieldLabel>
            <Input
              {...field}
              type="email"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder=" Email address"
              autoComplete="email"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* user password field  */}
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
            <Input
              {...field}
              type="password"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Password"
              autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* user confirm password field  */}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
            <Input
              {...field}
              type="password"
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Confirm password"
              autoComplete="off"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* submit button  */}
      <Button
        type="submit"
        className="w-full py-4"
        disabled={isSubmitting}>
        {isSubmitting ?
          <Spinner />
        : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
