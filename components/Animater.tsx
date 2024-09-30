"use client"

import React from "react";
import CountUp from "react-countup";
const AnimaterCount = ({amount} : {amount : number})=>
{
    return (
        <div>
            <CountUp 
            end={amount}
            decimal="."
            prefix="$"
            duration={2.75}
            decimals={2}></CountUp>
        </div>
    )
}

export default AnimaterCount