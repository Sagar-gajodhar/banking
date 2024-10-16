import AuthForm from "@/components/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const SignUp =async ()=>{

    const loggedIn = await getLoggedInUser();
    console.log(loggedIn);
    return (
        <section className="flex-center max-sm:px-6 size-full ">
            <AuthForm type="sign-up"/>
        </section>
    )
}
export default SignUp;