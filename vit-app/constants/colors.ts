const tintColorLight = '#dba6a1'; // botón primario claro (rosa pastel)
const tintColorDark = '#c4796a';  // equivalente oscuro

const accentColorLight = '#908e37'; // acciones destacadas (verde oliva claro)
const accentColorDark = '#fff';  // equivalente oscuro

export const Colors = {
  light: {
    background: '#f7f1eb',        // fondo general pastel
    card: '#ffffff',             // tarjetas
    text: '#594232',             // texto principal
    subtitle: '#816049',         // texto secundario
    input: '#ffffff',            // campos de entrada
    tint: tintColorLight,        // botones primarios
    border: '#d7bf9f',           // bordes claros
    accent: accentColorLight,    // botones destacados
  },
  dark: {
    background: '#1a1a1a',       // fondo oscuro neutro
    card: '#2a2a2a',             // tarjetas oscuras
    text: '#f5f5f5',             // texto claro
    subtitle: '#888',         // texto secundario claro
    input: '#333333',            // campos en oscuro
    tint: tintColorDark,         // botones primarios oscuros
    border: '#444444',           // bordes neutros
    accent: accentColorDark,     // botones destacados oscuros
  },
};
