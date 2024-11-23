import { bookController } from "../bookController.js";

const routes = (app) => {

    app.route('/books').get(bookController.getAllBook);
    app.route('/book/:bookId/:status').get(bookController.updateBookStatus);
    app.route('/book/:bookId').get(bookController.getBookbyID);
}
export default routes;