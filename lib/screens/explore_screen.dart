import 'package:flutter/material.dart';
import '../services/api_service.dart';

/// Pantalla para explorar los servicios disponibles.
/// Muestra una lista de servicios y permite crear, editar o eliminar cada uno.
class ExploreScreen extends StatefulWidget {
  const ExploreScreen({Key? key}) : super(key: key);

  @override
  _ExploreScreenState createState() => _ExploreScreenState();
}

class _ExploreScreenState extends State<ExploreScreen> {
  List<dynamic> _services = [];
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchServices();
  }

  /// Obtiene la lista de servicios desde el backend.
  Future<void> _fetchServices() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final data = await ApiService.getServices();
      setState(() {
        _services = data;
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

  /// Muestra un diálogo para crear o editar un servicio.
  Future<void> _showServiceDialog({Map<String, dynamic>? existing}) async {
    final isEdit = existing != null;
    final nombreController = TextEditingController(text: existing?['nombre'] ?? '');
    final categoriaController = TextEditingController(text: existing?['categoria'] ?? '');
    final descripcionController = TextEditingController(text: existing?['descripcion'] ?? '');
    final precioController = TextEditingController(text: existing?['precio']?.toString() ?? '');

    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(isEdit ? 'Editar servicio' : 'Nuevo servicio'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nombreController,
                decoration: const InputDecoration(labelText: 'Nombre'),
              ),
              TextField(
                controller: categoriaController,
                decoration: const InputDecoration(labelText: 'Categoría'),
              ),
              TextField(
                controller: descripcionController,
                decoration: const InputDecoration(labelText: 'Descripción'),
              ),
              TextField(
                controller: precioController,
                decoration: const InputDecoration(labelText: 'Precio'),
                keyboardType: TextInputType.number,
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () async {
              final nombre = nombreController.text.trim();
              final categoria = categoriaController.text.trim();
              final descripcion = descripcionController.text.trim();
              final precio = double.tryParse(precioController.text.trim());
              if (nombre.isEmpty || categoria.isEmpty || descripcion.isEmpty || precio == null) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Por favor completa todos los campos')), 
                );
                return;
              }
              try {
                if (isEdit) {
                  await ApiService.updateService(existing!['id'], {
                    'nombre': nombre,
                    'categoria': categoria,
                    'descripcion': descripcion,
                    'precio': precio,
                  });
                } else {
                  await ApiService.createService({
                    'nombre': nombre,
                    'categoria': categoria,
                    'descripcion': descripcion,
                    'precio': precio,
                  });
                }
                Navigator.pop(context);
                await _fetchServices();
              } catch (e) {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Error: ${e.toString()}')),
                );
              }
            },
            child: Text(isEdit ? 'Guardar' : 'Crear'),
          ),
        ],
      ),
    );
  }

  /// Elimina un servicio por ID y refresca la lista.
  Future<void> _deleteService(int id) async {
    try {
      await ApiService.deleteService(id);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Servicio eliminado')),
      );
      await _fetchServices();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: ${e.toString()}')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Explorar servicios')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Error: $_error'))
              : RefreshIndicator(
                  onRefresh: _fetchServices,
                  child: ListView.builder(
                    itemCount: _services.length,
                    itemBuilder: (context, index) {
                      final service = _services[index] as Map<String, dynamic>;
                      return ListTile(
                        title: Text(service['nombre'] ?? ''),
                        subtitle: Text(service['descripcion'] ?? ''),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () => _showServiceDialog(existing: service),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () => _deleteService(service['id'] as int),
                            ),
                          ],
                        ),
                        onTap: () {
                          Navigator.pushNamed(context, '/detail', arguments: service);
                        },
                      );
                    },
                  ),
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showServiceDialog(),
        child: const Icon(Icons.add),
        tooltip: 'Nuevo servicio',
      ),
    );
  }
}
