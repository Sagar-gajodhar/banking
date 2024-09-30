import { formatAmount } from "@/lib/utils";
import React from "react";
import AnimaterCount from "./Animater";
import DonutChat from "./DonutChart";

const TotalBalanceBox = ({accounts = [] , totalBanks , totalCurrentBalance} : TotlaBalanceBoxProps)=>{
    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                <DonutChat accounts={accounts}/>
            </div>
            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    Bank Account : {totalBanks}
                </h2>

                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">
                        Total Current Balance
                    </p>
                    <div className="total-balance-amount flex-center gap-2">
                        <AnimaterCount amount={totalCurrentBalance}/>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default TotalBalanceBox