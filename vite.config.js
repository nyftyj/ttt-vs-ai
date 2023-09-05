import { defineConfig, loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default (({ mode }) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
        build: {
            outDir: 'build',
            commonjsOptions: {
                include: [/node_modules/],
            },
        },
        optimizeDeps: {
            include: [],
        },
        plugins: [
            reactRefresh(),
            svgrPlugin({
                svgrOptions: {
                    icon: true,
                }
            }),
        ],
    });
});