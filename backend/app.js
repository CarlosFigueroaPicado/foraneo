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

//
// ==== TRANSPORTS STORAGE ====
let transports = [];

// ==== EXPERIENCES STORAGE ====
let experiences = [];

// ==== REVIEWS STORAGE ====
let reviews = [];

// ==== NOTIFICATIONS STORAGE ====
let notifications = [];

// ==== ITINERARIES STORAGE ====
let itineraries = [];

// ==== PAYMENTS STORAGE ====
let payments = [];

// ==== TRANSPORT ROUTES ====
// Get all transports
app.get('/api/transports', (req, res) => {
  res.json(transports);
});

// Get single transport by ID
app.get('/api/transports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const transport = transports.find(t => t.id === id);
  if (!transport) {
    return res.status(404).json({ error: 'Transporte no encontrado' });
  }
  res.json(transport);
});

// Create a new transport
app.post('/api/transports', (req, res) => {
  const newTransport = { id: generateId(transports), ...req.body };
  transports.push(newTransport);
  res.status(201).json(newTransport);
});

// Update a transport
app.put('/api/transports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transports.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Transporte no encontrado' });
  }
  transports[index] = { id, ...req.body };
  res.json(transports[index]);
});

// Delete a transport
app.delete('/api/transports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = transports.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Transporte no encontrado' });
  }
  const deleted = transports.splice(index, 1);
  res.json(deleted[0]);
});

// ==== EXPERIENCES ROUTES ====
app.get('/api/experiences', (req, res) => {
  res.json(experiences);
});

app.get('/api/experiences/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const experience = experiences.find(e => e.id === id);
  if (!experience) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }
  res.json(experience);
});

app.post('/api/experiences', (req, res) => {
  const newExperience = { id: generateId(experiences), ...req.body };
  experiences.push(newExperience);
  res.status(201).json(newExperience);
});

app.put('/api/experiences/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = experiences.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }
  experiences[index] = { id, ...req.body };
  res.json(experiences[index]);
});

app.delete('/api/experiences/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = experiences.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Experiencia no encontrada' });
  }
  const deleted = experiences.splice(index, 1);
  res.json(deleted[0]);
});

// ==== REVIEWS ROUTES ====
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const newReview = { id: generateId(reviews), ...req.body };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.delete('/api/reviews/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reseña no encontrada' });
  }
  const deleted = reviews.splice(index, 1);
  res.json(deleted[0]);
});

// ==== NOTIFICATIONS ROUTES ====
app.get('/api/notifications', (req, res) => {
  res.json(notifications);
});

app.post('/api/notifications', (req, res) => {
  const newNotification = { id: generateId(notifications), ...req.body };
  notifications.push(newNotification);
  res.status(201).json(newNotification);
});

app.delete('/api/notifications/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = notifications.findIndex(n => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Notificación no encontrada' });
  }
  const deleted = notifications.splice(index, 1);
  res.json(deleted[0]);
});

// ==== ITINERARIES ROUTES ====
app.get('/api/itineraries', (req, res) => {
  res.json(itineraries);
});

app.post('/api/itineraries', (req, res) => {
  const newItinerary = { id: generateId(itineraries), ...req.body };
  itineraries.push(newItinerary);
  res.status(201).json(newItinerary);
});

app.put('/api/itineraries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = itineraries.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Itinerario no encontrado' });
  }
  itineraries[index] = { id, ...req.body };
  res.json(itineraries[index]);
});

app.delete('/api/itineraries/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = itineraries.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Itinerario no encontrado' });
  }
  const deleted = itineraries.splice(index, 1);
  res.json(deleted[0]);
});

// ==== PAYMENTS ROUTES ====
app.post('/api/payments', (req, res) => {
  const newPayment = { id: generateId(payments), ...req.body };
  payments.push(newPayment);
  res.status(201).json({ message: 'Pago procesado', payment: newPayment });
});
 Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
