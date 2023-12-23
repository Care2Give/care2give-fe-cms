import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "./ui/checkbox";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email, please try again",
  }),
  password: z.string().min(8, {
    message: "Invalid password, please try again",
  }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col text-black bg-white p-10 rounded-2xl shadow-lg m-10 space-y-4 min-w-[300px] max-w-[800px] min-h-[460px]"
      >
        <p className="font-bold text-4xl text-center">Welcome back!</p>
        <p className="font-bold text-center">Caregivers Alliance Limited</p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-light text-sm">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-light text-sm">Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" className="border-[#E5E7EB]" />
            <label
              htmlFor="remember"
              className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <Link
            className="text-sm font-light text-right underline"
            href="/login"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          className="bg-[#E6F3FF] hover:bg-[#B3DBFF] text-black font-light"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
