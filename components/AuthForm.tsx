'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFiled from "./costumForm";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { signIn , signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({type} : {type : string})=>{

    const router = useRouter();
    
    const formSchema = authFormSchema(type);
    
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(false);
      // 1. Define your form.
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(data: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setLoading(true);
        try{
            if(type == 'sign-up')
            {
                const userData = {
                    email: data.email,
                    password: data.password,
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    city:data.city!
                }

                const newUser = await signUp(userData); 
                if(newUser){
                    setUser(newUser)
                    console.log("User Created Successfully",newUser)
                }else{
                    console.log("SignUp Failed")
                }
            }
            if(type == 'sign-in')
            {
                const response = await signIn({email : data.email, password : data.password});
                if(response) router.push('/')
            }
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
      }



    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="flex cursor-pointer items-center gap-2">
                    <Image
                        src = "/icons/logo.svg"
                        width={34}
                        height={34} 
                        alt="Horizon LOGO" className="size-[24px] max-xl:size-14"/>
                    <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                        {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                        <p className="text-16 font-normal text-gray-600">
                            {user? 'Link your account to get started' : 'Please enter your details'}
                        </p>
                    </h1>
                </div>
            </header>
            {user ? (<div className="flex flex-col gap-4">
                <PlaidLink user={user} variant="primary"/>
            </div>): <>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {type === 'sign-up' && (
                    <>
                        <div className="flex gap-4">
                            <CustomFiled control={form.control} name="firstName" label="First Name" placeholder="First Name" type="text"/>
                            <CustomFiled control={form.control} name="lastName" label="Last Name" placeholder="last Name" type="text"/>
                        </div>
                        
                        <CustomFiled control={form.control} name="address" label="Address" placeholder="Enter your Address" type="text"/>
                        <CustomFiled control={form.control} name="city" label="City" placeholder="Indore" type="text"/>

                        <div className="flex gap-4">
                            <CustomFiled control={form.control} name="state" label="State" placeholder="Madhya Pradesh" type="text"/>
                            <CustomFiled control={form.control} name="postalCode" label="Pin Code" placeholder="452016" type="text"/>
                        </div>
                        
                        <div className="flex gap-4">
                            <CustomFiled control={form.control} name="dateOfBirth" label="Date Of Birth" placeholder="YYYY-MM-DD" type="text"/>
                            <CustomFiled control={form.control} name="ssn" label="SSN" placeholder="Example-1234" type="text"/>
                        </div>
                    </>
                )}

                <CustomFiled control={form.control} name="email" label="Email" placeholder="Enter your Email" type="text"/>
                <CustomFiled control={form.control} name="password" label="Password" placeholder="Enter your Password" type="password"/>
                <div className="flex flex-col w-full">
                    <Button type="submit" className="form-btn" disabled={loading} >
                    {loading?(
                        <>
                            <Loader2 size={20} className="animate-spin"/> &nbsp; Loading...
                        </>
                    ): type == 'sign-in'?"Sign In": "Sign Up"}
                    </Button>
                </div>
                </form>
                </Form>

                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                      {type == 'sign-in'?"Don't Have a Account?":"Already Have a Account?"}  
                    </p>
                    <Link className="form-link" href={type == 'sign-in'?"/sign-up":"sign-in"}>
                        {type == 'sign-in'?"SignUp":"SignIn"}
                    </Link>
                </footer>
            </>}
        </section>
    )
}

export default AuthForm;