import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TodoApi } from "@/services/resources";
import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function DetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    TodoApi.find(String(id))
      .then((response: any) => {
        setData(response.data);
        console.log("response", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <Card className="w-full max-w-2xl p-4">
      <div className="flex justify-between items-center mb-4 mx-2">
        <Button variant={"outline"} onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Button>
        <h1 className="font-medium">Todo Detail</h1>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">Title</h2>
          <p>{data?.title}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold">Description</h2>
          <p>{data?.description}</p>
        </div>
      </div>
    </Card>
  );
}

export default DetailScreen;
