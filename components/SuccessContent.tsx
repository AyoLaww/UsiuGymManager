'use client'

import SuccessCard from "@/components/SuccessCard"
import { useSearchParams } from "next/navigation"

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  if (!email) {
    return <p>Email not provided</p>
  }

  return <SuccessCard email={email} />
}
