import 'package:flutter/material.dart';
import '../services/api_service.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({Key? key}) : super(key: key);

  @override
  _PaymentScreenState createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  final TextEditingController _amountController = TextEditingController();
  final TextEditingController _methodController = TextEditingController();
  bool _isLoading = false;
  String? _error;

  Future<void> _submitPayment() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });
    try {
      final amountText = _amountController.text;
      final method = _methodController.text;
      if (amountText.isEmpty || method.isEmpty) {
        setState(() {
          _error = 'Por favor, complete todos los campos';
          _isLoading = false;
        });
        return;
      }
      final amount = double.tryParse(amountText);
      if (amount == null) {
        setState(() {
          _error = 'El monto debe ser un n\u00famero v\u00e1lido';
          _isLoading = false;
        });
        return;
      }
      await ApiService.createPayment({
        'amount': amount,
        'method': method,
      });
      _amountController.clear();
      _methodController.clear();
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pago procesado correctamente')),
      );
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

  @override
  void dispose() {
    _amountController.dispose();
    _methodController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Procesar pago')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            if (_error != null)
              Text(
                _error!,
                style: const TextStyle(color: Colors.red),
              ),
            TextField(
              controller: _amountController,
              decoration: const InputDecoration(labelText: 'Monto'),
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _methodController,
              decoration: const InputDecoration(labelText: 'M\u00e9todo de pago'),
            ),
            const SizedBox(height: 16),
            _isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _submitPayment,
                    child: const Text('Realizar pago'),
                  ),
          ],
        ),
      ),
    );
  }
}
