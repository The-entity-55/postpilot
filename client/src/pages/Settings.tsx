import { useEffect, useState } from "react"
import { getUserSettings, updateUserSettings, UserSettings } from "@/api/settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"
import { Loader2 } from "lucide-react"

export function Settings() {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getUserSettings()
        setSettings(response.settings)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load settings"
        })
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [toast])

  const handleSave = async () => {
    if (!settings) return

    try {
      setSaving(true)
      await updateUserSettings(settings)
      toast({
        title: "Success",
        description: "Settings updated successfully"
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings"
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={settings?.notifications.email}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev!,
                  notifications: { ...prev!.notifications, email: checked }
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={settings?.notifications.push}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev!,
                  notifications: { ...prev!.notifications, push: checked }
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
            <Switch
              id="desktop-notifications"
              checked={settings?.notifications.desktop}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev!,
                  notifications: { ...prev!.notifications, desktop: checked }
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your application experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings?.theme}
              onValueChange={(value) =>
                setSettings((prev) => ({ ...prev!, theme: value as UserSettings["theme"] }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings?.timezone}
              onValueChange={(value) =>
                setSettings((prev) => ({ ...prev!, timezone: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="PST">PST</SelectItem>
                <SelectItem value="GMT">GMT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}