import { loadView } from "../helpers/loadView";
import { productosController } from "../views/productos/productosController.js";
import { productoController } from "../views/productos/productoController.js";
import { categoriasController } from "../views/categorias/categoriasController.js";
import { categoriaController } from "../views/categorias/categoriaController.js";
import { editarController } from "../views/categorias/editarController.js";
import { loginController } from "../views/login/loginController.js";
import { registroController } from "../views/registro/registroController.js";
import { inicioController } from "../views/inicio/inicioController.js";
import { estaAutenticado } from "../helpers/auth.js";

const routes = {
  inicio: {
    "template": "inicio/index.html",
    controlador: inicioController,
    private: false
  },
  productos: {
    "template": "productos/index.html",
    controlador: productosController,
    private: false
  },
  producto: {
    "template": "productos/producto.html",
    controlador: productoController,
    private: true
  },
  categorias: {
    "template": "categorias/index.html",
    controlador: categoriasController,
    private: true
  },
  categoria: {
    "template": "categorias/categoria.html",
    controlador: categoriaController,
    private: true
  },
  "editarcategoria/:id": {
    "template": "categorias/editar.html",
    controlador: editarController,
    private: true
  },
  login: {
    "template": "login/index.html",
    controlador: loginController,
    private: false
  },
  registro: {
    "template": "registro/index.html",
    controlador: registroController,
    private: false
  }
};

export const router = async (app) => {
  const hash = location.hash.slice(1);
  const [rutas, params] = matchRoute(hash);
  if (!rutas) {
    await loadView(app, "inicio/index.html");
    inicioController();
    return;
  }

  if (rutas.private && !estaAutenticado()) {
    location.hash = "#login"
    return;
  }
  // Llamando la vista
  await loadView(app, rutas.template);
  // Ejecutar el controldor
  rutas.controlador(params);

};

const matchRoute = (hash) => {
  const arreglo = hash.split("/");

  for (const route in routes) {
    const b = route.split("/");

    if (b.length !== arreglo.length) continue;

    const params = {};

    const matched = b.every((parte, i) => {
      if (parte.startsWith(":")) {
        const partName = parte.slice(1);
        const value = arreglo[i];
        params[partName] = value;
        return true;
      }
      if (parte === arreglo[i]) {
        return true;
      }
    });

    if (matched) {
      return [routes[route], params];
    }
  }
  return [null, null];
};