import 'package:flutter/material.dart';
import '../services/api_service.dart';

class ItinerariesScreen extends StatefulWidget {
  const ItinerariesScreen({Key? key}) : super(key: key);

  @override
  _ItinerariesScreenState createState() => _ItinerariesScreenState();
}

class _ItinerariesScreenState extends State<ItinerariesScreen> {
  List<dynamic> _itineraries = [];
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchItineraries();
  }

  Future<void> _fetchItineraries() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final itineraries = await ApiService.getItineraries();
      setState(() {
        _itineraries = itineraries;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _createItinerary() async {
    final titleController = TextEditingController();
    final descriptionController = TextEditingController();
    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Crear itinerario'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleController,
                decoration: const InputDecoration(labelText: 'Título'),
              ),
              TextField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Descripción'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () async {
                final data = {
                  'title': titleController.text,
                  'description': descriptionController.text,
                };
                await ApiService.createItinerary(data);
                Navigator.pop(context);
                _fetchItineraries();
              },
              child: const Text('Guardar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _editItinerary(dynamic itinerary) async {
    final titleController = TextEditingController(text: itinerary['title'] ?? '');
    final descriptionController = TextEditingController(text: itinerary['description'] ?? '');
    await showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Editar itinerario'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: titleController,
                decoration: const InputDecoration(labelText: 'Título'),
              ),
              TextField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Descripción'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancelar'),
            ),
            TextButton(
              onPressed: () async {
                final data = {
                  'title': titleController.text,
                  'description': descriptionController.text,
                };
                await ApiService.updateItinerary(itinerary['id'], data);
                Navigator.pop(context);
                _fetchItineraries();
              },
              child: const Text('Actualizar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> _deleteItinerary(int id) async {
    await ApiService.deleteItinerary(id);
    _fetchItineraries();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Itinerarios')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : ListView.builder(
                  itemCount: _itineraries.length,
                  itemBuilder: (context, index) {
                    final itinerary = _itineraries[index];
                    return ListTile(
                      title: Text(itinerary['title'] ?? 'Sin título'),
                      subtitle: Text(itinerary['description'] ?? ''),
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () => _editItinerary(itinerary),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () => _deleteItinerary(itinerary['id']),
                          ),
                        ],
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: _createItinerary,
        child: const Icon(Icons.add),
      ),
    );
  }
}
