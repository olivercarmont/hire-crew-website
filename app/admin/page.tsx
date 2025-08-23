import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageCircle, Clock, Link as LinkIcon, CheckCircle2, Hourglass, MailCheck } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: featureRequests, error } = await supabase
    .from("feature_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching feature requests:", error)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays === 1) return "1 day ago"
    return `${diffInDays} days ago`
  }

  const statusIcon = (req: any) => {
    if (req.status === "processing") return <Hourglass className="h-4 w-4 text-amber-500" />
    if (req.status === "done") return <CheckCircle2 className="h-4 w-4 text-green-600" />
    if (req.status === "failed") return <CheckCircle2 className="h-4 w-4 text-red-500 rotate-45" />
    return <Hourglass className="h-4 w-4 text-muted-foreground" />
  }

  const mergedIcon = (req: any) => {
    if (req.pr_merged) return <CheckCircle2 className="h-4 w-4 text-green-600" />
    return <Hourglass className="h-4 w-4 text-muted-foreground" />
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">hireCrew Admin</h1>
            <p className="text-muted-foreground">Manage feature requests and feedback</p>
          </div>
          <Button variant="outline" asChild>
            <a href="/">← Back to Site</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feature Requests</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{featureRequests?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {featureRequests?.filter((req: any) => {
                  const hoursSince = (new Date().getTime() - new Date(req.created_at).getTime()) / (1000 * 60 * 60)
                  return hoursSince < 24
                }).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">In last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PR Merge Rate</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {featureRequests && featureRequests.length > 0
                  ? Math.round(
                      (featureRequests.filter((req: any) => req.pr_merged === true).length / featureRequests.length) * 100,
                    )
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground">Features merged to production</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Feature Requests</CardTitle>
            <CardDescription>User feedback and feature suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            {featureRequests && featureRequests.length > 0 ? (
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
                  {featureRequests.map((request: any) => (
                    <TableRow key={request.id}>
                      <TableCell className="w-10">{statusIcon(request)}</TableCell>
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
                      <TableCell className="w-10">{mergedIcon(request)}</TableCell>
                      <TableCell className="w-10">
                        {request.user_emailed ? (
                          <MailCheck className="h-4 w-4 text-green-600" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(request.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No feature requests yet</p>
                <p className="text-sm">Feedback will appear here when users submit the form</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
