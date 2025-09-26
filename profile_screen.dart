import 'package:flutter/material.dart';

/// Pantalla de perfil del usuario.
/// Muestra información básica y opciones de configuración.
class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mi perfil')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: const [
                CircleAvatar(
                  radius: 30,
                  child: Icon(Icons.person, size: 30),
                ),
                SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Usuario Invitado', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    Text('usuario@ejemplo.com', style: TextStyle(fontSize: 14)),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 20),
            const Text('Preferencias', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const ListTile(
              leading: Icon(Icons.language),
              title: Text('Idioma'),
              subtitle: Text('Español'),
            ),
            const ListTile(
              leading: Icon(Icons.color_lens),
              title: Text('Tema'),
              subtitle: Text('Predeterminado'),
            ),
            const SizedBox(height: 20),
            const Text('Acerca de', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            const Text(
              'Foráneo es una aplicación para descubrir y reservar servicios turísticos en Nicaragua. Esta sección puede ampliarse para mostrar información de la cuenta, cerrar sesión, etc.',
            ),
          ],
        ),
      ),
    );
  }
}