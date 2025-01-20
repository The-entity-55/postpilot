import { useEffect, useState } from "react"
import { getCalendarEvents } from "@/api/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar as CalendarIcon, Facebook, Instagram, Twitter } from "lucide-react"
import { format } from "date-fns"

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'instagram':
      return <Instagram className="h-4 w-4" />
    case 'facebook':
      return <Facebook className="h-4 w-4" />
    case 'twitter':
      return <Twitter className="h-4 w-4" />
    default:
      return null
  }
}

export function Calendar() {
  const [events, setEvents] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCalendarEvents()
        setEvents(data.events)
      } catch (error) {
        console.error("Error fetching calendar events:", error)
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
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-bold">Content Calendar</h1>

      <div className="grid gap-4">
        {events.map((event: any) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PlatformIcon platform={event.platform} />
                  <CardTitle>{event.title}</CardTitle>
                </div>
                <Badge
                  variant={
                    event.status === 'published'
                      ? 'default'
                      : event.status === 'scheduled'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="h-4 w-4" />
                <span>
                  {format(new Date(event.scheduledAt), "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}