import 'package:flutter/material.dart';
import '../services/api_service.dart';

/// Pantalla que muestra la lista de reservas del usuario.
/// Permite ver las reservas y cancelar/eliminar alguna si se desea.
class ReservationsScreen extends StatefulWidget {
  const ReservationsScreen({Key? key}) : super(key: key);

  @override
  _ReservationsScreenState createState() => _ReservationsScreenState();
}

class _ReservationsScreenState extends State<ReservationsScreen> {
  List<dynamic> _reservations = [];
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchReservations();
  }

  /// Obtiene la lista de reservas desde el backend.
  Future<void> _fetchReservations() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final data = await ApiService.getReservations();
      setState(() {
        _reservations = data;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  /// Elimina una reserva por ID.
  Future<void> _deleteReservation(int id) async {
    try {
      await ApiService.deleteReservation(id);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Reserva eliminada')),
      );
      await _fetchReservations();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mis Reservas')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Error: $_error'))
              : RefreshIndicator(
                  onRefresh: _fetchReservations,
                  child: ListView.builder(
                    itemCount: _reservations.length,
                    itemBuilder: (context, index) {
                      final reserva = _reservations[index] as Map<String, dynamic>;
                      return ListTile(
                        title: Text('Reserva #${reserva['id']} - Servicio ${reserva['idServicio']}'),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Usuario: ${reserva['idUsuario']}'),
                            Text('Fechas: ${reserva['fechaInicio']} a ${reserva['fechaFin']}'),
                            Text('Cantidad: ${reserva['cantidad']}'),
                            Text('Total: \$${reserva['total']}'),
                            Text('Estado: ${reserva['estado']}'),
                          ],
                        ),
                        isThreeLine: true,
                        trailing: IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () => _deleteReservation(reserva['id'] as int),
                        ),
                      );
                    },
                  ),
                ),
    );
  }
}
