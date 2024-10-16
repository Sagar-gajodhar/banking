import HeaderBox from "@/components/header";
import PaymentTransferForm from "@/components/PaymentTranseferForm";
import React from "react";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Transfer = async ()=>{
    const loggedIn =  await getLoggedInUser();
    const accounts = await getAccounts({userId:loggedIn.$id});
    const accountsData = accounts?.data;
    return (
        <section className="payment-transfer">
            <HeaderBox title="Payment Transfer" subtext="Please Provide any specific details or notes related to the payment transfer"/>

            <section className="size-full pt-5">
                <PaymentTransferForm accounts={accountsData}/>

            </section>
        </section>
    )
}

export default Transfer