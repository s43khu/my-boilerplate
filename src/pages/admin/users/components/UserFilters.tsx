import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function UserFilters() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search users..." />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="role">Role</Label>
            <Input id="role" placeholder="Filter by role..." />
          </div>
          <div className="flex items-end">
            <Button>Apply Filters</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
