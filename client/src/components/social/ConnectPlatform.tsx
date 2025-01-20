import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/useToast"
import { connectSocialAccount } from "@/api/socialAuth"
import { Facebook, Instagram, Twitter, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConnectPlatformProps {
  platform: string
  connected: boolean
  username?: string
  onSuccess: () => void
}

export function ConnectPlatform({ platform, connected, username, onSuccess }: ConnectPlatformProps) {
  console.log("[ConnectPlatform] Received props:", {
    platform,
    connected,
    username
  });

  const [isOpen, setIsOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(connected)
  const [inputUsername, setInputUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const getPlatformIcon = () => {
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

  const getPlatformColor = () => {
    switch (platform) {
      case 'instagram':
        return 'hover:border-pink-500 hover:bg-pink-500/5'
      case 'facebook':
        return 'hover:border-blue-600 hover:bg-blue-600/5'
      case 'twitter':
        return 'hover:border-sky-500 hover:bg-sky-500/5'
      default:
        return ''
    }
  }

  const handleConnect = async () => {
    try {
      setLoading(true)
      await connectSocialAccount(platform, { username: inputUsername, password })
      setIsConnected(true)
      toast({
        title: "Success",
        description: `Connected to ${platform} successfully!`
      })
      setIsOpen(false)
      onSuccess()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "w-full h-32 relative",
          isConnected ? "border-primary bg-primary/5" : getPlatformColor()
        )}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-col items-center gap-2">
          {getPlatformIcon()}
          <span className="capitalize">{platform}</span>
          {username && <span className="text-sm text-muted-foreground">{username}</span>}
        </div>
        {isConnected && (
          <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-primary" />
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect {platform}</DialogTitle>
            <DialogDescription>
              Enter your {platform} credentials to connect your account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={loading}>
              {loading ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}