const express = require("express");
const router = express.Router();

//Simulando una base de datos
let productos = [
  { id: 1, nombre: "Producto 1", precio: 10 },
  { id: 2, nombre: "Producto 2", precio: 19 },
  { id: 3, nombre: "Producto 3", precio: 5 },
];

//Todos los productos
router.get("/", (req, res, next) => {
  try {
    res.json(productos);
  } catch (error) {
    next(err);
  }
});

//Productos por ID
router.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const producto = productos.find((p) => p.id === id);
    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    } else {
    }
  } catch (error) {
    next(error);
  }
});

//Hay que controlar los errores como arriba donde defino uno propio, asi con todos

//Crear un nuevo producto
router.post("/", (req, res, next) => {
  try {
    const { nombre, precio } = req.body;
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      precio,
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    next(err);
  }
});

//Actualizar un producto existente
router.put("/:id", (req, res, next) => {
  try {
    const { nombre, precio } = req.body;
    const id = parseInt(req.params.id);
    const producto = productos.find((p) => p.id === id);

    if (!producto) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    } else {
      (producto.nombre = nombre), (producto.precio = precio);
      res.json(producto);
    }
  } catch (error) {
    next(error);
  }
});

//Eliminando un producto
router.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = productos.findIndex((p) => p.id === id);

    if (index === -1) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      throw error;
    } else {
      const productoEliminado = productos.splice(index, 1);
      res.json(`Producto eliminado: ${id}`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
