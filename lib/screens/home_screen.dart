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
              child: const Text('Mi perfil'),
            ),
          ],
        ),
      ),
    );
  }
}
