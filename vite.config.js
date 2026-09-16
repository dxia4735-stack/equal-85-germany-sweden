import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';

// Serve and publish the same snapshot used by the charts, without duplicate data.
function dataSnapshot() {
  const snapshot = () => readFileSync(new URL('./src/data/eurostat-sdg-05-20.json', import.meta.url));
  return {
    name: 'eurostat-snapshot',
    configureServer(server) {
      server.middlewares.use('/data/eurostat-sdg-05-20.json', (_request, response) => {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.end(snapshot());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'data/eurostat-sdg-05-20.json', source: snapshot() });
    },
  };
}

export default defineConfig({
  plugins: [react(), dataSnapshot()],
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
