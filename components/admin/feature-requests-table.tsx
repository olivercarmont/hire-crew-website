"use client"

import { useEffect, useMemo, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Link as LinkIcon, CheckCircle2, Hourglass, MailCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"]
  const v = n % 100
  return s[(v - 20) % 10] || s[v] || s[0]
}

function formatExact(dateString: string) {
  if (!dateString) return "—"
  const d = new Date(dateString)
  const month = d.toLocaleString("en-US", { month: "short" })
  const day = d.getDate()
  let hours = d.getHours()
  const minutes = d.getMinutes().toString().padStart(2, "0")
  const ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  if (hours === 0) hours = 12
  return `${month} ${day}${getOrdinal(day)}, ${hours}:${minutes}${ampm}`
}

function StatusIcon({ status }: { status?: string }) {
  if (status === "processing") return <Hourglass className="h-4 w-4 text-amber-500" />
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-green-600" />
  if (status === "failed") return <CheckCircle2 className="h-4 w-4 text-red-500 rotate-45" />
  return <Hourglass className="h-4 w-4 text-muted-foreground" />
}

function MergedIcon({ merged }: { merged?: boolean }) {
  if (merged) return <CheckCircle2 className="h-4 w-4 text-green-600" />
  return <Hourglass className="h-4 w-4 text-muted-foreground" />
}

export default function FeatureRequestsTable({ initialRequests }: { initialRequests: any[] }) {
  const [requests, setRequests] = useState<any[]>(initialRequests || [])

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    const channel = supabase
      .channel("admin-feature-requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "feature_requests" },
        (payload: any) => {
          const newRow = payload.new
          const oldRow = payload.old
          setRequests((prev) => {
            if (payload.eventType === "INSERT" && newRow) {
              const exists = prev.some((r) => r.id === newRow.id)
              return exists ? prev : [newRow, ...prev]
            }
            if (payload.eventType === "UPDATE" && newRow) {
              return prev.map((r) => (r.id === newRow.id ? newRow : r))
            }
            if (payload.eventType === "DELETE" && oldRow) {
              return prev.filter((r) => r.id !== oldRow.id)
            }
            return prev
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>PR URL</TableHead>
          <TableHead>Merged</TableHead>
          <TableHead>User Emailed</TableHead>
          <TableHead>Submitted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="w-10">
              <StatusIcon status={request.status} />
            </TableCell>
            <TableCell className="font-medium">{request.name}</TableCell>
            <TableCell>{request.email || "Not provided"}</TableCell>
            <TableCell className="max-w-md truncate">{request.message}</TableCell>
            <TableCell>
              {request.pr_url ? (
                <a
                  href={request.pr_url}
                  className="text-orange-600 hover:underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon className="h-4 w-4" /> PR
                </a>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell className="w-10">
              <MergedIcon merged={request.pr_merged} />
            </TableCell>
            <TableCell className="w-10">
              {request.user_emailed ? (
                <MailCheck className="h-4 w-4 text-green-600" />
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </TableCell>
            <TableCell>{formatExact(request.created_at)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
