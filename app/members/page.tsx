import type { Metadata } from "next"
import MembersClient from "./members-client"

export const metadata: Metadata = {
  title: "Members - Doxbin",
  description: "Doxbin community members directory",
}

export default function MembersPage() {
  return <MembersClient />
}
