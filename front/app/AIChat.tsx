import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function AIChatScreen() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de viaje con IA. ¿En qué puedo ayudarte hoy? Puedo ayudarte a planificar itinerarios, recomendar destinos en Nicaragua, sugerir actividades y más.',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL || ''}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.slice(-10).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servicio de IA');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Lo siento, no pude procesar tu solicitud.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between border-b border-neutral-200 px-6 py-4">
        <Pressable onPress={() => router.back()} className="mr-4">
          <Feather name="arrow-left" size={24} color="#111827" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-lg font-semibold text-neutral-900">Planificador Inteligente</Text>
          <Text className="text-xs text-neutral-500">Asistente de viaje con IA</Text>
        </View>
        <Feather name="more-vertical" size={24} color="#6B7280" />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingVertical: 16 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 ${message.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <View
                className={`max-w-[80%] rounded-3xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary'
                    : 'bg-neutral-100'
                }`}
              >
                <Text
                  className={`text-sm ${
                    message.role === 'user' ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {message.content}
                </Text>
              </View>
              <Text className="mt-1 text-xs text-neutral-400">
                {message.timestamp.toLocaleTimeString('es-NI', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          ))}
          {isLoading && (
            <View className="mb-4 items-start">
              <View className="rounded-3xl bg-neutral-100 px-4 py-3">
                <ActivityIndicator size="small" color="#6B7280" />
              </View>
            </View>
          )}
        </ScrollView>

        <View className="border-t border-neutral-200 px-6 py-3">
          <View className="flex-row items-center space-x-2">
            <View className="flex-1 flex-row items-center rounded-3xl border border-neutral-300 bg-white px-4 py-2">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder="Escribe tu mensaje..."
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-sm text-neutral-900"
                multiline
                maxLength={500}
                onSubmitEditing={handleSend}
                editable={!isLoading}
              />
            </View>
            <Pressable
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={`h-10 w-10 items-center justify-center rounded-full ${
                inputText.trim() && !isLoading ? 'bg-primary' : 'bg-neutral-200'
              }`}
            >
              <Feather
                name="send"
                size={18}
                color={inputText.trim() && !isLoading ? '#FFFFFF' : '#9CA3AF'}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
