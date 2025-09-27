import 'package:flutter/material.dart';
import '../services/api_service.dart';

class ExperiencesScreen extends StatefulWidget {
  const ExperiencesScreen({Key? key}) : super(key: key);

  @override
  _ExperiencesScreenState createState() => _ExperiencesScreenState();
}

class _ExperiencesScreenState extends State<ExperiencesScreen> {
  List<dynamic> _experiences = [];
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _fetchExperiences();
  }

  Future<void> _fetchExperiences() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final experiences = await ApiService.getExperiences();
      setState(() {
        _experiences = experiences;
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

  void _createExperience() async {
    final titleController = TextEditingController();
    final descriptionController = TextEditingController();
    final priceController = TextEditingController();
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Crear experiencia'),
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
            TextField(
              controller: priceController,
              decoration: const InputDecoration(labelText: 'Precio'),
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
              final newExperience = {
                'title': titleController.text,
                'description': descriptionController.text,
                'price': priceController.text,
              };
              await ApiService.createExperience(newExperience);
              _fetchExperiences();
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  void _editExperience(Map<String, dynamic> experience) async {
    final titleController = TextEditingController(text: experience['title']?.toString() ?? '');
    final descriptionController = TextEditingController(text: experience['description']?.toString() ?? '');
    final priceController = TextEditingController(text: experience['price']?.toString() ?? '');
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Editar experiencia'),
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
            TextField(
              controller: priceController,
              decoration: const InputDecoration(labelText: 'Precio'),
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
              final updatedExperience = {
                'title': titleController.text,
                'description': descriptionController.text,
                'price': priceController.text,
              };
              await ApiService.updateExperience(experience['id'], updatedExperience);
              _fetchExperiences();
            },
            child: const Text('Guardar'),
          ),
        ],
      ),
    );
  }

  void _deleteExperience(Map<String, dynamic> experience) async {
    await ApiService.deleteExperience(experience['id']);
    _fetchExperiences();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Experiencias')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Error: $_error'))
              : ListView.builder(
                  itemCount: _experiences.length,
                  itemBuilder: (context, index) {
                    final exp = _experiences[index] as Map<String, dynamic>;
                    return Card(
                      margin: const EdgeInsets.all(8),
                      child: ListTile(
                        title: Text(exp['title']?.toString() ?? ''),
                        subtitle: Text('Descripción: ' + (exp['description']?.toString() ?? '') + '\nPrecio: ' + (exp['price']?.toString() ?? '')),
                        isThreeLine: true,
                        trailing: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.edit),
                              onPressed: () => _editExperience(exp),
                            ),
                            IconButton(
                              icon: const Icon(Icons.delete),
                              onPressed: () => _deleteExperience(exp),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: _createExperience,
        child: const Icon(Icons.add),
      ),
    );
  }
}
