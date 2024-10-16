import HeaderBox from "@/components/header"
import RecentTransaction from "@/components/recentTransaction";
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalance_box";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async ({searchParams:{id,page}} : SearchParamProps) =>{

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

    return(
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type = 'greeting'
                    title = 'Welcome'
                    user = {loggedIn?.firstName || 'Guest'}
                    subtext = "Access and Manage you Account and transactions efficiently"/>

                <TotalBalanceBox
                 accounts={accountsData}
                 totalBanks={accounts?.totalBanks}
                 totalCurrentBalance={accounts?.totalCurrentBalance} />
                </header>
                <RecentTransaction accounts={accountsData} transactions = {account?.transactions} appwriteItemId={appwriteItemId} page={currentPage}/>
            </div>
            <RightSideBar
            user = {loggedIn}
            transactions={account?.transactions}
            banks = {accountsData.slice(0,2)}/>

        </section>
    )
}
export default Home