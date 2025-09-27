import 'package:flutter/material.dart';

/// Pantalla de inicio con navegación a otras secciones.
class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Foráneo - Inicio')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Bienvenido a Foráneo',
              style: TextStyle(fontSize: 22),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/explore'),
              child: const Text('Explorar destinos'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/reservations'),
              child: const Text('Mis Reservas'),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pushNamed(context, '/profile'),
         
                      ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/transports'),
          child: const Text('Transporte'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/experiences'),
          child: const Text('Experiencias'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/itineraries'),
          child: const Text('Itinerarios'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/notifications'),
          child: const Text('Notificaciones'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/reviews'),
          child: const Text('Rese\u00f1as'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pushNamed(context, '/payments'),
          child: const Text('Pago'),
        ),
child: const Text('Mi perfil'),
            ),
          ],
        ),
      ),
    );
  }
}
