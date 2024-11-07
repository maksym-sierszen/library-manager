import { loadBooksList, loadAuthorsOptions, loadBooksOptions } from "./loaders.js";

window.onload = () => {
  loadBooksList();
  loadAuthorsOptions();
  loadBooksOptions();
};
