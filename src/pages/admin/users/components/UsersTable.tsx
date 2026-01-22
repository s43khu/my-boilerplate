import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/custom/confirm-dialog";
import { DataTable, type Column } from "@/components/custom/data-table";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
};

const allUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "User", status: "Active" },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
  { id: "6", name: "Diana Prince", email: "diana@example.com", role: "User", status: "Inactive" },
  { id: "7", name: "Edward Norton", email: "edward@example.com", role: "User", status: "Active" },
  { id: "8", name: "Fiona Apple", email: "fiona@example.com", role: "User", status: "Active" },
  { id: "9", name: "George Lucas", email: "george@example.com", role: "Admin", status: "Active" },
  { id: "10", name: "Helen Keller", email: "helen@example.com", role: "User", status: "Inactive" },
  { id: "11", name: "Ian McKellen", email: "ian@example.com", role: "User", status: "Active" },
  { id: "12", name: "Julia Roberts", email: "julia@example.com", role: "User", status: "Active" },
];

export function UsersTable() {
  const handleDelete = (userId: string, userName: string) => {
    console.log(`Deleting user: ${userName} (${userId})`);
  };

  const columns: Column<User>[] = [
    {
      header: "Name",
      accessor: "name",
      cell: (value) => <span className="font-medium">{value as string}</span>,
    },
    {
      header: "Email",
      accessor: "email",
      cell: (value) => <span className="text-muted-foreground">{value as string}</span>,
    },
    {
      header: "Role",
      accessor: "role",
      cell: (value) => <span className="px-2 py-1 text-xs rounded bg-muted">{value as string}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      cell: (value) => {
        const status = value as "Active" | "Inactive";
        return (
          <span
            className={`px-2 py-1 text-xs rounded ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Actions",
      accessor: "id",
      className: "text-right",
      cell: (_value, row) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <ConfirmDialog
            trigger={
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
            title="Delete user?"
            description={`This will permanently delete ${row.name} from the system. This action cannot be undone.`}
            onConfirm={() => handleDelete(row.id, row.name)}
            variant="destructive"
            size="sm"
            icon={<Trash2 />}
            iconClassName="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive"
            confirmText="Delete"
            cancelText="Cancel"
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      data={allUsers}
      columns={columns}
      getRowId={(row) => row.id}
      itemsPerPage={5}
      countLabel={(start, end, total) => `Showing ${start} to ${end} of ${total} users`}
    />
  );
}
