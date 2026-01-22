import { UserActions } from "./components/UserActions";
import { UserFilters } from "./components/UserFilters";
import { UsersTable } from "./components/UsersTable";

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage all users in your platform</p>
        </div>
        <UserActions />
      </div>

      <UserFilters />
      <UsersTable />
    </div>
  );
}
