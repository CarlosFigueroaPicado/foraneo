import 'package:flutter/material.dart';
import '../services/api_service.dart';

/// Pantalla de detalle para un servicio específico.
/// Muestra la información del servicio y un formulario para reservarlo.
class DetailScreen extends StatefulWidget {
  const DetailScreen({Key? key}) : super(key: key);

  @override
  _DetailScreenState createState() => _DetailScreenState();
}

class _DetailScreenState extends State<DetailScreen> {
  final _formKey = GlobalKey<FormState>();
  final _usuarioController = TextEditingController();
  final _fechaInicioController = TextEditingController();
  final _fechaFinController = TextEditingController();
  final _cantidadController = TextEditingController(text: '1');
  bool _isSubmitting = false;

  @override
  void dispose() {
    _usuarioController.dispose();
    _fechaInicioController.dispose();
    _fechaFinController.dispose();
    _cantidadController.dispose();
    super.dispose();
  }

  /// Envía la reserva al backend.
  Future<void> _submitReservation(Map<String, dynamic> service) async {
    if (!_formKey.currentState!.validate()) return;
    setState(() {
      _isSubmitting = true;
    });
    final idUsuario = _usuarioController.text.trim();
    final fechaInicio = _fechaInicioController.text.trim();
    final fechaFin = _fechaFinController.text.trim();
    final cantidad = int.parse(_cantidadController.text.trim());
    try {
      await ApiService.createReservation({
        'idUsuario': idUsuario,
        'idServicio': service['id'],
        'fechaInicio': fechaInicio,
        'fechaFin': fechaFin,
        'cantidad': cantidad,
      });
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Reserva creada con éxito')), 
      );
      Navigator.pushNamed(context, '/reservations');
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: ${e.toString()}')),
      );
    } finally {
      if (mounted) {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final service = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    return Scaffold(
      appBar: AppBar(title: Text(service['nombre'] ?? 'Detalle')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              service['descripcion'] ?? '',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 10),
            Text('Categoría: ${service['categoria']}', style: const TextStyle(fontSize: 14)),
            Text('Precio: \$${service['precio']}', style: const TextStyle(fontSize: 14)),
            const SizedBox(height: 20),
            const Text('Reservar este servicio', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            Form(
              key: _formKey,
              child: Column(
                children: [
                  TextFormField(
                    controller: _usuarioController,
                    decoration: const InputDecoration(labelText: 'ID de usuario'),
                    validator: (value) => value == null || value.isEmpty ? 'Campo obligatorio' : null,
                  ),
                  TextFormField(
                    controller: _fechaInicioController,
                    decoration: const InputDecoration(labelText: 'Fecha inicio (YYYY-MM-DD)'),
                    validator: (value) => value == null || value.isEmpty ? 'Campo obligatorio' : null,
                  ),
                  TextFormField(
                    controller: _fechaFinController,
                    decoration: const InputDecoration(labelText: 'Fecha fin (YYYY-MM-DD)'),
                    validator: (value) => value == null || value.isEmpty ? 'Campo obligatorio' : null,
                  ),
                  TextFormField(
                    controller: _cantidadController,
                    decoration: const InputDecoration(labelText: 'Cantidad'),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      final n = int.tryParse(value ?? '');
                      return n == null || n <= 0 ? 'Ingresa un número válido' : null;
                    },
                  ),
                  const SizedBox(height: 20),
                  _isSubmitting
                      ? const CircularProgressIndicator()
                      : ElevatedButton(
                          onPressed: () => _submitReservation(service),
                          child: const Text('Crear reserva'),
                        ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}