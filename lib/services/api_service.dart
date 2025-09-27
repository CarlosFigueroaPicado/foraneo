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
  // ==== Transportes ====
  static Future<List<dynamic>> getTransports() async {
    final response = await http.get(Uri.parse('$baseUrl/api/transports'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener transportes');
    }
  }

  static Future<Map<String, dynamic>> getTransport(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/api/transports/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Transporte no encontrado');
    }
  }

  static Future<Map<String, dynamic>> createTransport(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/transports'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear transporte');
    }
  }

  static Future<Map<String, dynamic>> updateTransport(int id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/transports/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al actualizar transporte');
    }
  }

  static Future<void> deleteTransport(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/transports/$id'));
    if (response.statusCode != 200) {
      throw Exception('Error al eliminar transporte');
    }
  }

  // ==== Experiencias ====
  static Future<List<dynamic>> getExperiences() async {
    final response = await http.get(Uri.parse('$baseUrl/api/experiences'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener experiencias');
    }
  }

  static Future<Map<String, dynamic>> getExperience(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/api/experiences/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Experiencia no encontrada');
    }
  }

  static Future<Map<String, dynamic>> createExperience(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/experiences'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear experiencia');
    }
  }

  static Future<Map<String, dynamic>> updateExperience(int id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/experiences/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al actualizar experiencia');
    }
  }

  static Future<void> deleteExperience(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/experiences/$id'));
    if (response.statusCode != 200) {
      throw Exception('Error al eliminar experiencia');
    }
  }

  // ==== Reseñas ====
  static Future<List<dynamic>> getReviews() async {
    final response = await http.get(Uri.parse('$baseUrl/api/reviews'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener reseñas');
    }
  }

  static Future<Map<String, dynamic>> createReview(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/reviews'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear reseña');
    }
  }

  static Future<void> deleteReview(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/reviews/$id'));
    if (response.statusCode != 200) {
      throw Exception('Error al eliminar reseña');
    }
  }

  // ==== Notificaciones ====
  static Future<List<dynamic>> getNotifications() async {
    final response = await http.get(Uri.parse('$baseUrl/api/notifications'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener notificaciones');
    }
  }

  static Future<Map<String, dynamic>> createNotification(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/notifications'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear notificación');
    }
  }

  static Future<void> deleteNotification(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/notifications/$id'));
    if (response.statusCode != 200) {
      throw Exception('Error al eliminar notificación');
    }
  }

  // ==== Itinerarios ====
  static Future<List<dynamic>> getItineraries() async {
    final response = await http.get(Uri.parse('$baseUrl/api/itineraries'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as List;
    } else {
      throw Exception('Error al obtener itinerarios');
    }
  }

  static Future<Map<String, dynamic>> getItinerary(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/api/itineraries/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Itinerario no encontrado');
    }
  }

  static Future<Map<String, dynamic>> createItinerary(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/itineraries'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al crear itinerario');
    }
  }

  static Future<Map<String, dynamic>> updateItinerary(int id, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/api/itineraries/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al actualizar itinerario');
    }
  }

  static Future<void> deleteItinerary(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/api/itineraries/$id'));
    if (response.statusCode != 200) {
      throw Exception('Error al eliminar itinerario');
    }
  }

  // ==== Pagos ====
  static Future<Map<String, dynamic>> createPayment(Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/api/payments'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 201) {
      return jsonDecode(response.body) as Map<String, dynamic>;
    } else {
      throw Exception('Error al procesar pago');
    }
  }
