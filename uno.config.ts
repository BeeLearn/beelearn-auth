import {
    defineConfig,
    presetUno,
    presetAttributify,
    presetIcons,
    transformerDirectives,
    transformerVariantGroup,
  } from "unocss";
  
  export default defineConfig({
    safelist: [],
    presets: [presetUno(), presetIcons(), presetAttributify()],
     transformers: [transformerDirectives(), transformerVariantGroup()],
  });
  