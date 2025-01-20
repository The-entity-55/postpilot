import { useEffect, useState } from "react"
import { getSocialConnections } from "@/api/socialAuth"
import { ConnectPlatform } from "@/components/social/ConnectPlatform"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Connection {
  platform: string
  connected: boolean
  username?: string
}

const DEFAULT_PLATFORMS = [
  { platform: 'instagram', connected: false },
  { platform: 'facebook', connected: false },
  { platform: 'twitter', connected: false }
];

export function Home() {
  const [connections, setConnections] = useState<Connection[]>(DEFAULT_PLATFORMS);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    console.log("[Home] Starting to fetch connections");
    try {
      const data = await getSocialConnections();
      console.log("[Home] Received connections data:", data);
      setConnections(data.connections || DEFAULT_PLATFORMS);
    } catch (error) {
      console.error("[Home] Error fetching connections:", error);
      // Keep the default platforms when API fails
      setConnections(DEFAULT_PLATFORMS);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log("[Home] Component mounted");
    fetchConnections();
  }, []);

  console.log("[Home] Current connections state:", connections);
  console.log("[Home] Rendering with connections:", connections);
  console.log("[Home] Connection platforms:", connections.map(c => c.platform));

  if (loading) {
    return <div>Loading...</div>
  }

  console.log("[Home] About to render with state:", {
    loading,
    connectionsLength: connections.length,
    connections
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Social Media Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {connections.map((connection) => (
              <ConnectPlatform
                key={connection.platform}
                platform={connection.platform}
                connected={connection.connected}
                username={connection.username}
                onSuccess={fetchConnections}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}