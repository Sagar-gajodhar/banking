import HeaderBox from "@/components/header";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";
const TransactionHistory = async ({searchParams : {id,page} } : SearchParamProps)=>{
    
    const currentPage = Number(page as string) || 1;
    const loggedIn =  await getLoggedInUser();
    const accounts = await getAccounts({userId:loggedIn.$id});

    if(!accounts){
        console.log("Error in Fetching Bank details Check getAccounts function in user.action.ts-------------------");
        return;
    }

    const accountsData = accounts?.data;

    const appwriteItemId = (id as string ) || accountsData[0]?.appwriteItemId;

    const account = await getAccount({appwriteItemId})
    const transactions = account?.transactions
    const rowPerPage = 10;
    const totalPage = Math.ceil(transactions.length/rowPerPage);

    const indexOfLastTransaction = currentPage*rowPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction-rowPerPage

    const currentTransactions = transactions.slice(indexOfFirstTransaction,indexOfLastTransaction);
    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox
                    title="Transaction History"
                    subtext="See your bank details and transactions"
                />
            </div>

            <div>
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">
                            {account?.data.name}
                        </h2>

                        <p className="text-14 text-blue-25">
                            {account?.data.officialName}
                        </p>

                        <p className="text-14 semi-bold tracking-[1.1px] text-white">
                            ●●●● ●●●● ●●●● <span className="text-16">{account?.data.mask}</span>
                        </p>
                    </div>

                    <div className="transactions-account-balance">
                        <p className="text-14">
                            Current Balance
                        </p>

                        <p className="text-24 text-center font-bold">
                            {formatAmount(account?.data.currentBalance)}
                        </p>
                    </div>
                </div>
                <section className="flex w-full flex-col gap-6">
                    <TransactionsTable transactions={currentTransactions}/>
                    {totalPage > 1 && (
                        <div className="my-4 w-full">
                            <Pagination totalPages={totalPage} page={currentPage}/>
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

export default TransactionHistory;