import { SocialPost } from "@/api/social"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface PostsGridProps {
  posts: SocialPost[]
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="h-5 w-5" />
    case 'facebook':
      return <Facebook className="h-5 w-5" />
    case 'twitter':
      return <Twitter className="h-5 w-5" />
    default:
      return null
  }
}

export function PostsGrid({ posts }: PostsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <PlatformIcon platform={post.platform} />
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.postedAt), { addSuffix: true })}
            </span>
          </CardHeader>
          <CardContent>
            <img
              src={post.image}
              alt=""
              className="aspect-square rounded-lg object-cover mb-3"
            />
            <p className="text-sm">{post.content}</p>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span>👍 {post.metrics.likes}</span>
              <span>💬 {post.metrics.comments}</span>
              <span>🔄 {post.metrics.shares}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}