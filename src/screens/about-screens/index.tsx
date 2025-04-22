import { useEffect } from "react";
import { useCounter } from "../../stores/useCounter";
import { TodoApi } from "@/services/resources";

function AboutScreens() {
  const { count, decrement, increment } = useCounter((state) => state);

  // contoh penggunaan api
  useEffect(() => {
    TodoApi.update(2, {
      title: "updated title",
      description: "updated description",
      completed: false,
    })
      .then((res) => {
        console.log("res_TodoApi", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <div className="text-red-700">should be center! counter: {count}</div>

      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => increment()}
      >
        Increment
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => decrement()}
      >
        Decrement
      </button>
    </div>
  );
}
export default AboutScreens;
