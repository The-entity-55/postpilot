import { useEffect, useState } from "react"
import { getAnalyticsOverview, getRecentPosts, getAIRecommendations } from "@/api/social"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Sparkles } from "lucide-react"
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard"
import { PostsGrid } from "@/components/dashboard/PostsGrid"

export function Dashboard() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [posts, setPosts] = useState<any>([])
  const [recommendations, setRecommendations] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsData, postsData, recommendationsData] = await Promise.all([
          getAnalyticsOverview(),
          getRecentPosts(),
          getAIRecommendations(),
        ])
        setAnalytics(analyticsData.platforms)
        setPosts(postsData.posts)
        setRecommendations(recommendationsData.recommendations)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnalyticsCard platform="instagram" metrics={analytics.instagram} />
        <AnalyticsCard platform="facebook" metrics={analytics.facebook} />
        <AnalyticsCard platform="twitter" metrics={analytics.twitter} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">AI Recommendations</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec: any, index: number) => (
            <Alert key={index}>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>{rec.type}</AlertTitle>
              <AlertDescription>{rec.content}</AlertDescription>
            </Alert>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        <PostsGrid posts={posts} />
      </div>
    </div>
  )
}