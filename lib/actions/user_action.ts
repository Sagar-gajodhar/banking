'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signUp = async (userdata : SignUpParams)=>{
    const {email ,password , firstName , lastName} = userdata;
    try{
        const { account } = await createAdminClient();

        const newUserAccount  = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`);
        const session = await account.createEmailPasswordSession(email, password);
      
        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount)
    }catch(err){
        console.log(err);
    }
}
export const signIn = async (email: string, password: string) => {
  try {
    const { account } = await createAdminClient();

    // Check if the user already has an active session
    const currentSession = await account.getSession('current').catch(() => null);

    if (!currentSession) {
      // Create a session for the user
      const session = await account.createEmailPasswordSession(email, password);

      // Store session securely in cookies
      cookies().set('appwrite-session', session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });

      console.log("Signed in successfully!");
      return session; // Return session data
    } else {
      console.log('User already signed in.');
      return currentSession; // Optionally return the current session
    }
  } catch (err) {
    console.error('Error during sign-in:', err);
    return null; // Return null on error  
  }
};  

export const logOutAccount = async ()=>{
  try{
    const { account } =  await createSessionClient();
    
        // "Delete" the session cookie by overwriting it with an empty value
        cookies().set('appwrite-session', '', {
          path: '/',               // Ensure the cookie is removed site-wide
          httpOnly: true,           // Secure settings for cookies
          sameSite: 'strict',
          secure: true,
          expires: new Date(0),     // Set the expiry date to the past to remove the cookie
        });
        
    await account.deleteSession('current');
    console.log("Successfully Logged OUT");
  }catch(err){
    console.log("You encounter an Error------------------------------> ", err);
    return null;
  }
}

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get();
      console.log("User is ---------------->",user);
      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  