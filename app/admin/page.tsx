export const dynamic = "force-dynamic"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import FeatureRequestsTable from "@/components/admin/feature-requests-table"

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: featureRequests, error } = await supabase
    .from("feature_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching feature requests:", error)
  }

  const countLast24 = (featureRequests || []).filter((req: any) => {
    const hoursSince = (new Date().getTime() - new Date(req.created_at).getTime()) / (1000 * 60 * 60)
    return hoursSince < 24
  }).length

  const mergeRate = featureRequests && featureRequests.length > 0
    ? Math.round(((featureRequests.filter((req: any) => req.pr_merged === true).length) / featureRequests.length) * 100)
    : 0

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
              <div className="text-2xl font-bold">{countLast24}</div>
              <p className="text-xs text-muted-foreground">In last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PR Merge Rate</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mergeRate}%</div>
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
            <FeatureRequestsTable initialRequests={featureRequests || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
