import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

function TodoDialog({
  open,
  setOpen,
  selectedData,
  isLoading,
  onSubmit = (value: any) => value,
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your todo here</DialogTitle>
          <DialogDescription>Please edited</DialogDescription>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const formDataObj = Object.fromEntries(formData);
              onSubmit(formDataObj);
            }}
          >
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                name="title"
                defaultValue={selectedData?.data?.title || ""}
                placeholder="Title"
                disabled={isLoading}
              />
              <Input
                type="text"
                name="description"
                defaultValue={selectedData?.data?.description || ""}
                placeholder="Description"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default TodoDialog;
