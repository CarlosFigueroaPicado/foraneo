import 'dart:convert';
import 'package:http/http.dart' as http;

/// Servicio de API para interactuar con el backend Node.js.
/// Esta clase contiene métodos para obtener y manipular servicios y reservas.
class ApiService {
  // Cambia esta URL si el backend está alojado en otra dirección.
  static const String baseUrl = 'http://localhost:3000';

  // ===== Servicios =====

  /// Obtiene la lista completa de servicios.
  static Future<List<dynamic>> getServices() async {
    final response = await http.get(Uri.parse('$baseUrl/api/servicios'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener servicios');
    }
  }

  /// Obtiene un servicio por ID.
  static Future<Map<String, dynamic>> getService(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/api/servicios/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Servicio no encontrado');
    }
  }

  /// Crea un nuevo servicio.
  static Future<Map<String, dynamic>> createService(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/servicios'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear servicio');
    }
  }

  /// Actualiza un servicio existente por ID.
  static Future<Map<String, dynamic>> updateService(int id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/servicios/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al actualizar servicio');
    }
  }

  /// Elimina un servicio por ID.
  static Future<void> deleteService(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/servicios/$id'));
    if (response.statusCode != 204) {
      throw Exception('Error al eliminar servicio');
    }
  }

  // ===== Reservas =====

  /// Obtiene todas las reservas.
  static Future<List<dynamic>> getReservations() async {
    final response = await http.get(Uri.parse('$baseUrl/api/reservas'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener reservas');
    }
  }

  /// Obtiene una reserva por ID.
  static Future<Map<String, dynamic>> getReservation(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/api/reservas/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Reserva no encontrada');
    }
  }

  /// Crea una nueva reserva.
  static Future<Map<String, dynamic>> createReservation(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/reservas'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear reserva');
    }
  }

  /// Actualiza una reserva existente por ID.
  static Future<Map<String, dynamic>> updateReservation(int id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/reservas/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al actualizar reserva');
    }
  }

  /// Elimina una reserva por ID.
  static Future<void> deleteReservation(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/reservas/$id'));
    if (response.statusCode != 204) {
      throw Exception('Error al eliminar reserva');
    }
  }
}