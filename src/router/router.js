import { loadView } from "../helpers/loadView";
import { productoController } from "../views/productos/productoController.js";
import { categoriaController } from "../views/categorias/categoriaController.js";

const routes = {
  productos: {
    "template": "productos/index.html",
    controlador: productoController
  },
  categorias: {
    "template": "controladorcategorias/index.html",
    controlador: categoriaController
  }
};

export const router = (app) => {
  const hash = location.hash.slice(1);
  const { template, controlador } = matchRoute(hash)
  // Llmando la vista
  loadView(app, template);
  // Ejecutar el controldor
  // ?
  
controlador()
}

const matchRoute = (hash) => {
  for (const route in routes) {
    if (route === hash) {
      return routes[route];
    }
  }
}