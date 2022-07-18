# fotostalk

Este es un proyecto creado para un laboratorio de la materia RIA de la carrera Tecnólogo en Informática.

## Requerimientos

- Generar un layout en HTML/CSS que respete el presentado por el departamento de
diseño. No tiene porqué ser exactamente ese diseño, pero sí que respete la
ubicación de lo distintos ítems que la componen y que aparezcan todos los
componentes pedidos.
- La cabecera debe permanecer fija y visible siempre. El resto del contenido puede
ser scrolleado.
- La “lista de contactos” a la derecha debe cargar una lista de usuarios utilizando la
API REST JSON Placeholder (http://jsonplaceholder.typicode.com/) y mostrar
nombre de usuario e email. Al hacer click en uno de estos usuarios quedará
habilitado como “usuario activo”, cambiando el nombre de usuario en el área “Nuevo
Post” y dejándolo como usuario activo para cualquiera de las demás acciones que
se pueden realizar.
- Cuando el presentador haga las veces de usuario y postee una nueva imagen, este
nuevo post debe aparecer inmediatamente en el área principal de posts.
OPCIONAL: El nuevo post debe aparecer con una animación fluida (eres libre de
elegir la que quieras).
- Cuando el presentador interactúe con un post haciendo un comentario, este
comentario debe aparecer debajo de la imagen, tal como se presenta en el mockup
de la webapp.
- Cuando el presentador interactúe con un post dando un “me gusta”, el nombre de
usuario del usuario que dió el “me gusta” debe aparecer en la lista de usuarios que
gustaron del post.
- La webapp debe mantener su estado entre sesión y sesión, por lo que hay que
generar una capa de persistencia en la webapp, utilizando la API LocalStorage.

## Restricciones

- La aplicación web a desarrollar no debe ni puede depender de librería externa
alguna
  - No obstante se permite el uso de la librería de iconos Font Awesome o
similar, siendo la aplicación de estos íconos algo no excluyente ni necesario.
  - También se pueden utilizar fuentes cargadas con @font-face, utilizando algún
servicio externo como Google Fonts o con fuentes descargadas.
- La aplicación web debe ser lo más autocontenida posible, tratando de que la
cantidad de archivos necesarios sean mínimos y que haya una estructura de
directorios correcta. Se recomienda que se entreguen:
  - Un archivo 'script.js', conteniendo la lógica necesaria para que la aplicación
web se inicialice y funcione, escrito preferiblemente en ECMAScript. En caso
de ser escrito en un lenguaje pre-compilado (Dart, Coffeescript, etc.) incluir
los archivos originales y recordar: no se deben usar librerías Javascript
externas. El archivo generado debe ser puro, sin dependencias en librerías.
  - Un archivo 'styles.css', conteniendo los estilos necesarios para la correcta
visualización y funcionamiento de la aplicación web. En este caso no se
permite usar lenguajes pre-compilados (Less, Sass, etc.)
  - Un archivo 'index.html', siendo el archivo que contiene el marcado HTML de
la aplicación web.
  - En caso de generar una PWA todos los archivos de manifiesto necesarios.
- Cualquier otro archivo extra no restará puntos. Se pueden incluir imágenes, archivos
de configuración o lo que sea necesario. Tan solo se recomienda minimizar la
dependencia en muchos archivos.

## Resultado obtenido

![image](https://user-images.githubusercontent.com/57294943/179625740-74bae1b1-4e13-40b8-8c54-e735f32c6088.png)
![image](https://user-images.githubusercontent.com/57294943/179625545-a73c4529-c9bc-494b-9aa3-5f94ecd95561.png)
![image](https://user-images.githubusercontent.com/57294943/179625614-18b5493d-3c32-4a87-a5da-bae225e71438.png)

