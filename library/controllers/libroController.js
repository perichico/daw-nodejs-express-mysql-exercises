const Libro = require('../models/libroModel');

// Mostrar el formulario para agregar un nuevo libro
exports.mostrarFormulario = (req, res) => {
  res.render('formulario');
};

// Agregar un nuevo libro a la base de datos
exports.agregarLibro = async (req, res) => {
  const { isbn, titulo, autor } = req.body;

  try {
    // Crear un nuevo libro en la base de datos
    await Libro.create({
      isbn,
      titulo,
      autor,
    });
    console.log("Libro agregado correctamente");
    res.redirect('/libros'); // Redirigir a la lista de libros
  } catch (error) {
    console.error("Error al agregar el libro:", error);
    res.status(500).send('Error al agregar el libro');
  }
};

// Listar todos los libros desde la base de datos
exports.listarLibros = async (req, res) => {
  try {
    // Consultar todos los libros desde la base de datos
    const libros = await Libro.findAll();
    res.render('index', { libros }); // Pasar los libros a la vista
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    res.status(500).send('Error al obtener los libros');
  }
};

// Ver los detalles de un libro por su ISBN
exports.verLibro = async (req, res) => {
  const { isbn } = req.params;

  try {
    // Consultar el libro por su ISBN
    const libro = await Libro.findByPk(isbn);
    
    if (!libro) {
      return res.status(404).send('Libro no encontrado');
    }
    
    res.render('verLibro', { libro }); // Pasar el libro a la vista
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).send('Error al obtener el libro');
  }
};

// Borrar un libro por su ISBN
exports.borrarLibro = async (req, res) => {
  const { isbn } = req.params;

  try {
    // Eliminar el libro de la base de datos
    const exito = await Libro.destroy({
      where: { isbn },
    });
    
    if (exito) {
      res.redirect('/libros'); // Redirigir a la lista de libros
    } else {
      res.status(404).send('Libro no encontrado para eliminar');
    }
  } catch (error) {
    console.error("Error al borrar el libro:", error);
    res.status(500).send('Error al borrar el libro');
  }
};
