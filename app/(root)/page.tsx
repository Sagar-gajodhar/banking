import HeaderBox from "@/components/header"
import RightSideBar from "@/components/RightSideBar";
import TotalBalanceBox from "@/components/TotalBalance_box";

const Home = () =>{
    const loggedIn =  {firstName : "Sagar" , lastName : " Rathore" , email : "sagarrathore52204@gmail.com"};

    return(
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type = 'greeting'
                    title = 'Welcome'
                    user = {loggedIn?.firstName || 'Guesr'}
                    subtext = "Access and Manage you Account and transactions efficiently"/>
                </header>

                <TotalBalanceBox
                 accounts={[]}
                 totalBanks={1}
                 totalCurrentBalance={1250} />
            </div>
            <RightSideBar
            user = {loggedIn}
            transactions={[]}
            banks = {[{currentBalance:1250 },{ currentBalance:350.28}]}/>

        </section>
    )
}
export default Home