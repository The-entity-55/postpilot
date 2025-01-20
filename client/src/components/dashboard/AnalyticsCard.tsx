import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Heart, Share2, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricProps {
  title: string
  value: number | string
  icon: React.ReactNode
  className?: string
}

const Metric = ({ title, value, icon, className }: MetricProps) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="rounded-lg p-2 bg-primary/10">{icon}</div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value.toLocaleString()}</p>
    </div>
  </div>
)

interface AnalyticsCardProps {
  platform: string
  metrics: {
    likes: number
    comments: number
    shares: number
    impressions: number
    engagement: number
  }
}

export function AnalyticsCard({ platform, metrics }: AnalyticsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{platform}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Metric
          title="Engagement Rate"
          value={`${metrics.engagement}%`}
          icon={<TrendingUp className="h-4 w-4" />}
          className="mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <Metric
            title="Likes"
            value={metrics.likes}
            icon={<Heart className="h-4 w-4" />}
          />
          <Metric
            title="Comments"
            value={metrics.comments}
            icon={<Users className="h-4 w-4" />}
          />
          <Metric
            title="Shares"
            value={metrics.shares}
            icon={<Share2 className="h-4 w-4" />}
          />
          <Metric
            title="Impressions"
            value={metrics.impressions}
            icon={<Eye className="h-4 w-4" />}
          />
        </div>
      </CardContent>
    </Card>
  )
}