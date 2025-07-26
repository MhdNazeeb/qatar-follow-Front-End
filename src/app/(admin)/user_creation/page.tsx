"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useUserCreation } from "@/api/hooks/useUserCreation";
import { Eye, EyeOff } from "lucide-react";

const roles = ["HR", "USER", "ADMIN"];

export type FormValues = {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
};

export default function CreateUserPage() {
  const { mutate, isPending, isError, error } = useUserCreation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit =  async (data: FormValues) => {
   await  mutate(data);
    reset();
  };

  return (
    <Card className="w-[50%] mx-auto mt-10 rounded-xl shadow-lg bg-gradient-to-br from-indigo-900 via-purple-700 to-pink-700 border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-white drop-shadow">Create User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full border-0 bg-white/90 text-black px-3 py-2 rounded"
            />
            {errors.fullName && (
              <p className="text-red-300 text-sm mt-1">{errors.fullName.message} </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full border-0 bg-white/90 text-black px-3 py-2 rounded"
            />
            {errors.email && (
              <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                className="w-full border-0 bg-white/90 text-black px-3 py-2 rounded pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-300 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                className="w-full border-0 bg-white/90 text-black px-3 py-2 rounded pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowConfirmPassword((v) => !v)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-300 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-white">Role</Label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full border-0 bg-white/90 text-black px-3 py-2 rounded shadow">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && (
              <p className="text-red-300 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <CardFooter className="p-0">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold py-2 rounded-lg shadow-md border-0 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition"
            >
              Create User
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}


