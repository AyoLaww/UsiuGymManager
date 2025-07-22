"use client"

import SuccessCard from "@/components/SuccessCard";
import SuccessContent from "@/components/SuccessContent";
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";

export default function Success(){

    return(
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <SuccessContent />
            </Suspense>
        </>
    )
}