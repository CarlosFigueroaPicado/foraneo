import 'package:flutter/material.dart';
import '../services/api_service.dart';

class TransportsScreen extends StatefulWidget {
  const TransportsScreen({Key? key}) : super(key: key);

  @override
  _TransportsScreenState createState() => _TransportsScreenState();
}

class _TransportsScreenState extends State<TransportsScreen> {
  List<dynamic> _transports = [];
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchTransports();
  }

  Future<void> _fetchTransports() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final transports = await ApiService.getTransports();
      setState(() {
        _transports = transports;
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

  void _createTransport() async {
    final nameController = TextEditingController();
    final typeController = TextEditingController();
    final costController = TextEditingController();
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Crear transporte'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: const InputDecoration(labelText: 'Nombre'),
            ),
            TextField(
              controller: typeController,
              decoration: const InputDecoration(labelText: 'Tipo'),
            ),
            TextField(
              controller: costController,
              decoration: const InputDecoration(labelText: 'Costo'),
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
              Navigator.pop(context);
              final newTransport = {
                'name': nameController.text,
                'type': typeController.text,
                'cost': costController.text,
              };
              await ApiService.createTransport(newTransport);
              _fetchTransports();
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  void _editTransport(Map<String, dynamic> transport) async {
    final nameController = TextEditingController(text: transport['name']?.toString() ?? '');
    final typeController = TextEditingController(text: transport['type']?.toString() ?? '');
    final costController = TextEditingController(text: transport['cost']?.toString() ?? '');
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Editar transporte'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: nameController,
              decoration: const InputDecoration(labelText: 'Nombre'),
            ),
            TextField(
              controller: typeController,
              decoration: const InputDecoration(labelText: 'Tipo'),
            ),
            TextField(
              controller: costController,
              decoration: const InputDecoration(labelText: 'Costo'),
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
              Navigator.pop(context);
              final updatedTransport = {
                'name': nameController.text,
                'type': typeController.text,
                'cost': costController.text,
              };
              await ApiService.updateTransport(transport['id'], updatedTransport);
              _fetchTransports();
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  void _deleteTransport(Map<String, dynamic> transport) async {
    await ApiService.deleteTransport(transport['id']);
    _fetchTransports();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Transporte')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Error: $_error'))
              : ListView.builder(
                  itemCount: _transports.length,
                  itemBuilder: (context, index) {
                    final transport = _transports[index] as Map<String, dynamic>;
                    return Card(
                      margin: const EdgeInsets.all(8),
                      child: ListTile(
                        title: Text(transport['name']?.toString() ?? ''),
                        subtitle: Text('Tipo: ' + (transport["type"]?.toString() ?? '') + ' - Costo: ' + (transport["cost"]?.toString() ?? '')),
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () => _editTransport(transport),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () => _deleteTransport(transport),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: _createTransport,
        child: const Icon(Icons.add),
      ),
    );
  }
}
