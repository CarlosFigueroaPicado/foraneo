import 'package:flutter/material.dart';

// Importar las pantallas definidas en archivos separados.
import 'screens/home_screen.dart';
import 'screens/explore_screen.dart';
import 'screens/detail_screen.dart';
import 'screens/experiences_screen.dart'
  import 'screens/reservations_screen.dart';
import 'screens/transports_screen.dart';

import 'screens/itineraries_screen.dart';
import 'screens/notifications_screen.dart';
import 'screens/reviews_screen.dart';
import 'screens/payment_screen.dart';

import 'screens/profile_screen.dart';

void main() {
  runApp(ForaneoApp());
}

class ForaneoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Foráneo',
      theme: ThemeData(
        primarySwatch: Colors.teal,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      initialRoute: '/',
      routes: {
        '/': (context) => const HomeScreen(),
        '/explore': (context) => const ExploreScreen(),
        '/detail': (context) => const DetailScreen(),
        '/reservations': (context) => const ReservationsScreen(),
        '/profile': (context) => const ProfileScreen(),
            '/transports': (context) => const TransportsScreen(),
    '/experiences': (context) => const ExperiencesScreen(),
    '/itineraries': (context) => const ItinerariesScreen(),
    '/notifications': (context) => const NotificationsScreen(),
    '/reviews': (context) => const ReviewsScreen(),
    '/payments': (context) => const PaymentScreen(),

      },
    );
  }
}

// Las implementaciones anteriores de HomeScreen, ExploreScreen, DetailScreen,
// ReservationsScreen y ProfileScreen han sido movidas a archivos separados
// dentro del directorio lib/screens. Esto mantiene un código más limpio y
// modular.
