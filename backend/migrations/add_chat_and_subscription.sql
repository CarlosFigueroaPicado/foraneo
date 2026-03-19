-- Agregar subscription_tier a la tabla profiles si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'subscription_tier'
  ) THEN
    ALTER TABLE profiles ADD COLUMN subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro'));
  END IF;
END $$;

-- Crear tabla chat_history para almacenar el historial de conversaciones
CREATE TABLE IF NOT EXISTS chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  is_pro BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas por usuario
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_created_at ON chat_history(created_at DESC);

-- Habilitar RLS (Row Level Security) para chat_history
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver su propio historial
CREATE POLICY "Users can view their own chat history"
  ON chat_history
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar su propio historial
CREATE POLICY "Users can insert their own chat history"
  ON chat_history
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Agregar comentarios para documentación
COMMENT ON TABLE chat_history IS 'Almacena el historial de conversaciones con el asistente de IA';
COMMENT ON COLUMN profiles.subscription_tier IS 'Nivel de suscripción del usuario: free o pro';
