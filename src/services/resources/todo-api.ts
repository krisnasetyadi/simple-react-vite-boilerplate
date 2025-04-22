import RequestHandler from "../request-handler";
import { ENDPOINT } from "../endpoint";

class TodoApi extends RequestHandler {
  constructor() {
    super(ENDPOINT.TODO);
  }
}

export default new TodoApi();
