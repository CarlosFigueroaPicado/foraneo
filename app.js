const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Simulated in-memory storage for services and reservations
let services = [
  { id: 1, nombre: 'Hostal El Río', categoria: 'Hospedaje', descripcion: 'Habitación privada con baño', precio: 25 },
  { id: 2, nombre: 'Tour Volcano', categoria: 'Experiencia', descripcion: 'Excursión guiada al volcán Masaya', precio: 40 }
];
let reservations = [];

// Helper function to generate unique IDs
function generateId(collection) {
  return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
}

// ==== SERVICES ROUTES ====

// GET /api/servicios - List all services
app.get('/api/servicios', (req, res) => {
  res.json(services);
});

// GET /api/servicios/:id - Get a single service by ID
app.get('/api/servicios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const service = services.find(s => s.id === id);
  if (!service) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  res.json(service);
});

// POST /api/servicios - Create a new service
app.post('/api/servicios', (req, res) => {
  const { nombre, categoria, descripcion, precio } = req.body;
  if (!nombre || !categoria || !descripcion || precio === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const newService = {
    id: generateId(services),
    nombre,
    categoria,
    descripcion,
    precio: Number(precio)
  };
  services.push(newService);
  res.status(201).json(newService);
});

// PUT /api/servicios/:id - Update an existing service
app.put('/api/servicios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const service = services.find(s => s.id === id);
  if (!service) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  const { nombre, categoria, descripcion, precio } = req.body;
  if (nombre) service.nombre = nombre;
  if (categoria) service.categoria = categoria;
  if (descripcion) service.descripcion = descripcion;
  if (precio !== undefined) service.precio = Number(precio);
  res.json(service);
});

// DELETE /api/servicios/:id - Remove a service
app.delete('/api/servicios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = services.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  services.splice(index, 1);
  res.status(204).end();
});

// ==== RESERVATIONS ROUTES ====

// GET /api/reservas - List all reservations
app.get('/api/reservas', (req, res) => {
  res.json(reservations);
});

// GET /api/reservas/:id - Get reservation by ID
app.get('/api/reservas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const reserva = reservations.find(r => r.id === id);
  if (!reserva) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  res.json(reserva);
});

// POST /api/reservas - Create new reservation
app.post('/api/reservas', (req, res) => {
  const { idServicio, idUsuario, fechaInicio, fechaFin, cantidad } = req.body;
  const servicio = services.find(s => s.id === idServicio);
  if (!servicio) {
    return res.status(404).json({ error: 'Servicio no encontrado' });
  }
  if (!idUsuario || !fechaInicio || !fechaFin || !cantidad) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  const nuevaReserva = {
    id: generateId(reservations),
    idUsuario,
    idServicio,
    fechaInicio,
    fechaFin,
    cantidad: Number(cantidad),
    total: Number(cantidad) * servicio.precio,
    estado: 'confirmada'
  };
  reservations.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});

// PUT /api/reservas/:id - Update a reservation
app.put('/api/reservas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const reserva = reservations.find(r => r.id === id);
  if (!reserva) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  const { fechaInicio, fechaFin, cantidad, estado } = req.body;
  if (fechaInicio) reserva.fechaInicio = fechaInicio;
  if (fechaFin) reserva.fechaFin = fechaFin;
  if (cantidad !== undefined) {
    reserva.cantidad = Number(cantidad);
    const servicio = services.find(s => s.id === reserva.idServicio);
    reserva.total = reserva.cantidad * servicio.precio;
  }
  if (estado) reserva.estado = estado;
  res.json(reserva);
});

// DELETE /api/reservas/:id - Cancel or delete reservation
app.delete('/api/reservas/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reservations.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  reservations.splice(index, 1);
  res.status(204).end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
