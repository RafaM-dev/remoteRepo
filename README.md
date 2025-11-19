# Aplicación Remote - Rick and Morty Episode Detail

Micro-frontend remoto construido con React, TypeScript, Vite y Tailwind CSS. Esta aplicación proporciona la funcionalidad de detalle de episodios de Rick and Morty y se integra con la aplicación host mediante Module Federation.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#️-instalación)
- [Ejecución](#️-ejecución)
- [Arquitectura](#-arquitectura)
- [Dependencias](#-dependencias)
- [Testing](#-testing)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Características](#-características)
- [Tecnologías](#-tecnologías)

## 🔧 Requisitos Previos

- **Node.js** v16 o superior
- **npm** v7 o superior (o yarn)
- **Aplicación Host** para consumir este micro-frontend (opcional para desarrollo)

## 🛠️ Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>

# 2. Navegar al directorio del proyecto
cd remote

# 3. Instalar dependencias
npm install
```

## 🚀 Ejecución

### Modo Desarrollo

**IMPORTANTE:** Este micro-frontend debe ejecutarse ANTES que la aplicación host.

```bash
# Iniciar la aplicación remota
npm run dev
```

La aplicación estará disponible en: `http://localhost:5174`

### Orden de Ejecución Recomendado

```bash
# Terminal 1: Iniciar aplicación remote
cd remote
npm run dev

# Terminal 2: Iniciar aplicación host (después de que remote esté corriendo)
cd ../host
npm run dev
```

### Compilar para Producción

```bash
# Compilar el proyecto
npm run build

# Previsualizar la compilación de producción
npm run preview
```

### Verificar Código

```bash
# Ejecutar ESLint
npm run lint
```

## 🏗️ Arquitectura

### Arquitectura de Micro-Frontend

Este proyecto funciona como un **módulo remoto** en la arquitectura de Module Federation:

```
┌─────────────────────────────────────────┐
│       REMOTE APPLICATION                │
│       (Este Proyecto)                   │
│                                         │
│  ┌────────────────────────────────┐   │
│  │   Module Federation Exposes    │   │
│  │   - DetailEpisode Component    │   │
│  └────────────────────────────────┘   │
│                                         │
│  ┌────────────────────────────────┐   │
│  │     Features Module            │   │
│  │  ┌──────────────────────────┐ │   │
│  │  │   DetailEpisode          │ │   │
│  │  │   (Component Principal)  │ │   │
│  │  └──────────────────────────┘ │   │
│  └────────────────────────────────┘   │
│                                         │
│  ┌────────────────────────────────┐   │
│  │   Shared Types                 │   │
│  │   (Definiciones TypeScript)    │   │
│  └────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    ↑
                    │ Consume
                    │
         ┌──────────────────────┐
         │   HOST APPLICATION   │
         │   (Micro-frontend)   │
         └──────────────────────┘
```

### Patrón de Exposición

```typescript
// vite.config.ts - Module Federation
exposes: {
  './DetailEpisode': './src/features/DetailEpisode'
}
```

### Flujo de Integración

```
Host Application
      ↓
   Solicita Módulo Remoto
      ↓
Remote Application (Este proyecto)
      ↓
   Expone DetailEpisode Component
      ↓
   Host Consume el Componente
      ↓
   Renderiza en la UI del Host
```

## 📦 Dependencias

### Dependencias de Producción

```json
{
  "react": "^18.3.1",              // Biblioteca UI principal
  "react-dom": "^18.3.1"           // Renderizado de React para web
}
```

### Dependencias de Desarrollo

```json
{
  "@vitejs/plugin-react": "^4.3.4",              // Plugin React para Vite
  "vite": "^6.0.1",                              // Herramienta de build
  "typescript": "~5.6.2",                        // Superset tipado de JavaScript
  "@originjs/vite-plugin-federation": "^1.3.6",  // Module Federation
  "tailwindcss": "^3.4.17",                      // Framework CSS
  "postcss": "^8.4.49",                          // Procesador CSS
  "autoprefixer": "^10.4.20",                    // Prefijos CSS automáticos
  "eslint": "^9.15.0",                           // Linter de JavaScript
  "@eslint/js": "^9.15.0",                       // Configuración base ESLint
  "typescript-eslint": "^8.15.0",                // ESLint para TypeScript
  "eslint-plugin-react-hooks": "^5.0.0",         // Reglas ESLint para hooks
  "eslint-plugin-react-refresh": "^0.4.14"       // Reglas ESLint para Fast Refresh
}
```

### APIs Externas

- **Rick and Morty API**: `https://rickandmortyapi.com/api`
  - Endpoint de episodios: `/episode`
  - Endpoint de personajes: `/character`

## 🧪 Testing

### Configurar Tests (Pendiente)

Este proyecto actualmente no tiene tests configurados. Para agregar testing, se recomienda:

```bash
# Instalar dependencias de testing
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Crear archivo de configuración vitest.config.ts
```

### Configuración de Vitest

Crear `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

### Agregar Scripts de Test

Agregar en `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Estructura de Tests Recomendada

```
src/
├── features/
│   ├── __tests__/
│   │   └── DetailEpisode.test.tsx
│   └── DetailEpisode.tsx
├── shared/
│   └── types/
│       └── __tests__/
│           └── index.test.ts
└── test/
    └── setup.ts
```

### Ejemplos de Tests

```typescript
// DetailEpisode.test.tsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DetailEpisode from '../DetailEpisode'

describe('DetailEpisode', () => {
  it('renders episode details correctly', () => {
    render(<DetailEpisode />)
    expect(screen.getByText(/episode/i)).toBeInTheDocument()
  })
})
```

### Ejecutar Tests (Una vez configurado)

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm test -- --watch

# Ejecutar tests con cobertura
npm run test:coverage

# Ejecutar tests con UI
npm run test:ui
```

## 📁 Estructura del Proyecto

```
remote/
├── public/                          # Archivos estáticos
├── src/
│   ├── assets/                      # Recursos (imágenes, fuentes)
│   ├── features/                    # Módulos por característica
│   │   └── DetailEpisode.tsx       # Componente de detalle de episodio
│   ├── shared/                      # Código compartido
│   │   └── types/                  # Definiciones de tipos TypeScript
│   │       └── index.tsx           # Tipos exportados
│   ├── App.css                      # Estilos del componente App
│   ├── App.tsx                      # Componente raíz
│   ├── index.css                    # Estilos globales + Tailwind
│   └── main.tsx                     # Punto de entrada
├── .gitignore                       # Archivos ignorados por Git
├── eslint.config.js                 # Configuración ESLint
├── index.html                       # HTML principal
├── package.json                     # Dependencias y scripts
├── README.md                        # Este archivo
├── tailwind.config.js               # Configuración Tailwind CSS
├── tsconfig.json                    # Configuración TypeScript base
├── tsconfig.app.json                # Config TypeScript para app
├── tsconfig.node.json               # Config TypeScript para Vite
└── vite.config.ts                   # Configuración Vite + Module Federation
```

## 🎯 Características

### 1. Detalle de Episodios
- **Visualización completa**: Muestra información detallada de episodios
- **Integración con API**: Consume datos de Rick and Morty API
- **Componente exportable**: Listo para ser consumido por el host

### 2. Module Federation
- **Exposición de componentes**: Expone DetailEpisode para consumo externo
- **Independencia**: Funciona de manera autónoma o como parte del host
- **Hot Module Replacement**: Recarga en caliente durante desarrollo

### 3. Sistema de Tipos
- **TypeScript completo**: Tipado estático en toda la aplicación
- **Tipos compartidos**: Definiciones reutilizables en `/shared/types`

## 💻 Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| React | 18.3.1 | Framework UI |
| TypeScript | 5.6.2 | Tipado estático |
| Vite | 6.0.1 | Build tool y dev server |
| Tailwind CSS | 3.4.17 | Framework de estilos |
| Module Federation | 1.3.6 | Micro-frontend architecture |
| ESLint | 9.15.0 | Linter de código |

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo (puerto 5174)

# Producción
npm run build        # Compila para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Ejecuta ESLint
```

## 🔗 Module Federation

### Configuración

La configuración de Module Federation se encuentra en `vite.config.ts`:

```typescript
federation({
  name: 'remote_root',
  filename: 'remoteEntry.js',
  exposes: {
    './DetailEpisode': './src/features/DetailEpisode'
  },
  shared: ['react', 'react-dom']
})
```

### Módulos Expuestos

Este micro-frontend expone:
- **./DetailEpisode**: Componente de detalle de episodios (puerto 5174)

### Consumir desde Host

```typescript
// En la aplicación host
import DetailEpisode from 'remote_root/DetailEpisode'

function App() {
  return <DetailEpisode />
}
```

## 🔧 Configuración del Puerto

Este micro-frontend corre en el puerto **5174** por defecto:

```typescript
// vite.config.ts
server: {
  port: 5174,
  strictPort: true
}
```

## 🐛 Resolución de Problemas

### Error: Puerto en uso
```bash
# Cambiar el puerto en vite.config.ts
server: {
  port: 5175  // Cambiar a otro puerto disponible
}

# También actualizar en la aplicación host:
# remotes: {
#   remote_root: 'http://localhost:5175/assets/remoteEntry.js'
# }
```

### Error: Module not found
```bash
# Verificar que el servidor esté corriendo
npm run dev

# Verificar la URL en el navegador
# http://localhost:5174/assets/remoteEntry.js debe ser accesible
```

### Error: CORS
```bash
server: {
  cors: true
}
```

## 📝 ESLint Configuration

Este proyecto usa ESLint con configuración para TypeScript y React. Para habilitar reglas más estrictas:

```javascript
// eslint.config.js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 🎨 Estilos

Este proyecto usa **Tailwind CSS** para los estilos:

- **index.css**: Estilos globales y directivas de Tailwind
- **App.css**: Estilos específicos del componente App
- **tailwind.config.js**: Configuración personalizada de Tailwind


Desarrollado con ❤️ usando React, TypeScript, Vite y Module Federation