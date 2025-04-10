import { ClipboardList, Edit, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
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
} from "./ui/alert-dialog";

interface Task {
  id: string;
  title: string;
  description?: string;
}

export const TasksList = ({
  tasks,
  onEdit,
  onDelete,
}: {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}) => {
  if (tasks.length === 0) {
    return (
      <Card className="bg-gray-50 border border-dashed border-gray-200 shadow-sm">
        <CardContent className="py-12 flex flex-col items-center justify-center text-center">
          <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700">No tasks found</h3>
          <p className="text-gray-500 mt-1">
            You don't have any tasks yet. Create your first task to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-gray-800 break-words whitespace-pre-wrap overflow-hidden">
              {task.title}
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-gray-500 break-words whitespace-pre-wrap overflow-hidden">
              {task.description || "No description provided"}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end pt-4 pb-2 border-t border-gray-100">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                onClick={() => onEdit(task)}
              >
                <Edit size={16} className="mr-1" /> Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this task? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
