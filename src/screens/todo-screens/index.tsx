import { useEffect, useState } from "react";

import { TodoApi } from "@/services/resources";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import TodoDialog from "@/components/todo-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { debounce } from "@/lib/utils";

function AboutScreens() {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({
    open: false,
    type: "default",
    data: {},
  });

  useEffect(() => {
    setIsLoading(true);
    TodoApi.get()
      .then(({ Data }: any) => {
        setData(Data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  }, []);

  const handleCreateData = (formData: any) => {
    setIsLoading(true);
    TodoApi.store(formData)
      .then((response: any) => {
        const updatedData = [...data, response.data];
        setData(updatedData);

        setIsLoading(false);
        setSelectedData({
          open: false,
          data: {},
          type: "default",
        });
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };

  const handleUpdateTodo = (todoId: number, formData: any) => {
    setIsLoading(true);
    TodoApi.update(String(todoId), formData)
      .then((response: any) => {
        const updatedData = data.map((item: any) => {
          if (item.id === todoId) {
            item.title = response.data.title;
            item.description = response.data.description;
          }
          return item;
        });
        setData(updatedData);

        setIsLoading(false);
        setSelectedData({
          open: false,
          data: {},
          type: "default",
        });
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };

  const handleDeleteTodo = (todoId: number) => {
    setIsLoading(true);
    TodoApi.delete(String(todoId))
      .then(() => {
        const updatedData = data.filter((item: any) => item.id !== todoId);
        setData(updatedData);

        setIsLoading(false);
        setSelectedData({
          open: false,
          data: {},
          type: "default",
        });
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };
  const onChangeSearch = (value: any) => {
    const searchValue = value.target.value;

    setIsLoading(true);
    TodoApi.get({ title: searchValue })
      .then(({ Data }: any) => {
        setData(Data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setIsLoading(false);
      });
  };

  return (
    <Card className="w-full max-w-2xl p-4">
      <div className="flex flex-col w-[70%]]">
        <div className="flex justify-between items-center mb-4">
          <Input
            name="title"
            onChange={debounce(onChangeSearch, 2000)}
            className="w-40"
            placeholder="Search title here..."
          />
          <Button
            size={"sm"}
            onClick={() =>
              setSelectedData({ open: true, data: {}, type: "create" })
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Todo
          </Button>
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading ? (
              data?.map((i: any) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Link
                        to={`${i.id}`}
                        className="font-semibold underline underline-offset-"
                      >
                        {i.title}
                      </Link>
                    </TableCell>
                    <TableCell>{i.description}</TableCell>
                    <TableCell className="text-right">
                      {i.is_completed ? "COMPLETED" : "INCOMPLETE"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="w-8 h-8 p-0"
                          onClick={() => {
                            setSelectedData({
                              open: true,
                              data: i,
                              type: "edit",
                            });
                          }}
                          disabled={isLoading}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger>
                            <Button
                              variant="outline"
                              className="w-8 h-8 p-0"
                              disabled={isLoading}
                            >
                              <Trash2 className="h-4 w-4 text-red-700" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>
                              Are you sure to delete this {i.title} ?
                            </DialogTitle>
                            <DialogDescription>
                              Please proceed by submit the delete button
                            </DialogDescription>
                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteTodo(i.id)}
                              >
                                {isLoading ? "Deleting..." : "Delete"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <Loading cols={4} rows={5} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TodoDialog
          open={selectedData.open}
          setOpen={(val: any) => setSelectedData({ open: val, data: {} })}
          selectedData={selectedData}
          isLoading={isLoading}
          onSubmit={(formData: any) => {
            if (selectedData.type === "edit") {
              handleUpdateTodo(selectedData.data.id, formData);
            } else if (selectedData.type === "create") {
              handleCreateData(formData);
            }
          }}
        />
      </div>
    </Card>
  );
}
export default AboutScreens;
