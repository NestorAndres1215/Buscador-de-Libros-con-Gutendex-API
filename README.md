# 📚 Buscador de Libros Clásicos con Gutendex API
Este es un proyecto sencillo pero funcional que te permite **buscar libros clásicos en dominio público** utilizando la [Gutendex API](https://gutendex.com/), una interfaz moderna del famoso **Proyecto Gutenberg**. Está construido con **HTML + JavaScript puro (Vanilla JS)** y **estilizado con Tailwind CSS**.

---

## 🌟 Funcionalidades

✅ Buscar libros por título o autor  
✅ Mostrar resultados con:
- Portada
- Título
- Autor(es)
- Link para leer o descargar (formato EPUB o TXT)

✅ Sin autenticación ni claves de API  
✅ Diseño responsive con TailwindCSS  
✅ Totalmente gratuito y libre de uso

---

## 🔧 Tecnologías utilizadas

- 🟧 HTML5
- 🟦 JavaScript (Vanilla)
- 🌀 Tailwind CSS
- 🔗 Gutendex API (https://gutendex.com/)


## 🧪 Ejemplos de búsqueda

- `amor` → Muestra libros clásicos románticos.
- `Shakespeare` → Libros escritos por William Shakespeare.
- `ciencia` → Libros relacionados con ciencia.
- `Gabriel Garcia Marquez` → También puedes intentar con autores en español.
### 🔎 Parámetros comunes

| Parámetro     | Descripción                              |
|---------------|------------------------------------------|
| `search`      | Buscar por palabra clave                 |
| `languages`   | Filtrar por idioma (`es`, `en`, `fr`, etc) |
| `page`        | Navegar por páginas de resultados        |

### 📚 Ejemplos

- Buscar "quijote":








## 🖼️ Captura de pantalla

![image](https://github.com/user-attachments/assets/67c3d53e-2540-4611-b077-b936fdf25aca)


---

## 🎨 Tailwind CSS

Tailwind está integrado vía CDN para facilitar el desarrollo rápido y responsive.  
Puedes personalizar estilos fácilmente agregando clases utilitarias.

### 🌐 CDN usado
```html
<script src="https://cdn.tailwindcss.com"></script>
