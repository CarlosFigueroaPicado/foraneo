// Cargar ExpoRoot desde el paquete de expo-router instalado en el proyecto móvil dentro de ./front.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ExpoRoot } = require('./front/node_modules/expo-router');

export default function App() {
  const ctx = (require as any).context('./front/app', true, /\.(js|jsx|ts|tsx)$/);
  return <ExpoRoot context={ctx} />;
}
