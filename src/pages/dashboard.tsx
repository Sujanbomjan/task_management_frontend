import { useState } from "react";
import { useGetAllTasks } from "@/hooks/useGetAllTasks";
import { useCreateTask } from "@/hooks/useCreateTasks";
import { useDeleteTask } from "@/hooks/useDeleteTasks";
import { useUpdateTask } from "@/hooks/useUpdateTasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TasksList } from "@/components/TaskList";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Navbar } from "@/components/Navbar";
import { PlusCircle, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();

  const { setToken } = useAuth();
  const {
    data: tasks = [],
    isLoading: isFetchingTask,
    isError,
  } = useGetAllTasks();
  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState<{
    id: string;
    title: string;
    description?: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on search query
  const filteredTasks = tasks.filter((task: any) => {
    if (!searchQuery) return true;
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description &&
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleCreate = () => {
    if (!newTask.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    createTask(newTask, {
      onSuccess: () => {
        toast.success("Task created successfully");
        setNewTask({ title: "", description: "" });
      },
      onError: () => toast.error("Failed to create task"),
    });
  };

  const handleUpdate = () => {
    if (!editTask?.title.trim()) {
      toast.error("Task title is required");
      return;
    }

    updateTask(
      {
        id: editTask.id,
        title: editTask.title,
        description: editTask.description || "",
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          setEditTask(null);
        },
        onError: () => toast.error("Failed to update task"),
      }
    );
  };

  const handleDelete = (id: any) => {
    deleteTask(id, {
      onSuccess: () => toast.success("Task deleted successfully"),
      onError: () => toast.error("Failed to delete task"),
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setToken(null);

    setTimeout(() => navigate("/login"), 1000);
  };
  if (isFetchingTask) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-48 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200"
            />
          ))}
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar
          username={localStorage.getItem("username") || "User"}
          handleLogout={handleLogout}
        />

        <div className="container mx-auto p-6 max-w-6xl">
          <Card className="my-8 border-red-200 shadow-lg">
            <CardHeader className="bg-red-50">
              <CardTitle className="text-xl font-semibold text-red-600">
                Error Loading Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700">
                There was a problem fetching your tasks. Please try again later
                or contact support.
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t border-gray-100">
              <Button
                onClick={() => window.location.reload()}
                className="bg-red-500 hover:bg-red-600"
              >
                Retry
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        username={localStorage.getItem("username") || "User"}
        handleLogout={handleLogout}
      />

      <div className="container mx-auto p-4 sm:p-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 mt-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
            <p className="text-gray-500 mt-1">
              Manage your tasks and stay organized
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                  <PlusCircle size={18} />
                  New Task
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-xl">
                    Create New Task
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Fill in the details below to create a new task.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 my-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      id="title"
                      placeholder="Enter task title"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-sm font-medium"
                    >
                      Description
                    </label>
                    <Textarea
                      id="description"
                      placeholder="Enter task description (optional)"
                      rows={3}
                      value={newTask.description}
                      className="w-full resize-none break-words overflow-wrap break-all"
                      wrap="soft"
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleCreate}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Task
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Dashboard Stats */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Task Dashboard</CardTitle>
            <CardDescription className="text-blue-100">
              You have {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in
              your list
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            className="pl-10 bg-white border border-gray-200 focus:border-blue-500 rounded-lg"
            placeholder="Search tasks by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Tasks List */}
        {isCreating || isDeleting || isUpdating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton
                key={i}
                className="w-full h-48 rounded-xl bg-gradient-to-r from-blue-100 to-blue-200"
              />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <TasksList
              tasks={filteredTasks}
              onEdit={setEditTask}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* Edit Task Dialog */}
      <AlertDialog
        open={editTask !== null}
        onOpenChange={(open) => !open && setEditTask(null)}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Edit Task</AlertDialogTitle>
            <AlertDialogDescription>
              Update the details of your task.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 my-4">
            <div className="space-y-2">
              <label htmlFor="edit-title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="edit-title"
                placeholder="Enter task title"
                value={editTask?.title || ""}
                onChange={(e) =>
                  setEditTask(
                    editTask ? { ...editTask, title: e.target.value } : null
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="edit-description"
                placeholder="Enter task description (optional)"
                rows={3}
                value={editTask?.description || ""}
                onChange={(e) =>
                  setEditTask(
                    editTask
                      ? { ...editTask, description: e.target.value }
                      : null
                  )
                }
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setEditTask(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdate}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Update Task
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
