import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';


// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact(), pluginSass(), pluginSvgr()],
  resolve: {
    alias: {
      '@': './src',
      'icons': './public/icons'
    },
  },
});
