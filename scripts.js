function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const imagenesPerfil = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

function obtenerUsuarios() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const usuariosObtenidos = fetch('https://jsonplaceholder.typicode.com/users')
                .then(usuariosObtenidos => usuariosObtenidos.json());
            resolve(usuariosObtenidos);
        }, 2000);

    });
}

function agregarImagenAUsuarios(usuarios) {
    usuarios.forEach((usuario) => {
        usuario.imagen = random_item(imagenesPerfil);
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return;
}

const cargarUsuarios = async(usuarios) => {
    document.getElementById('lista-contactos').removeChild(document.getElementById('cargando'));
    usuarios.forEach((usuario, index) => {
        const nodo = document.createElement('li');
        const imagen = document.createElement('img');
        const contenedor = document.createElement('div');
        const user = document.createElement('h5');
        const email = document.createElement('h6');
        nodo.appendChild(imagen);
        nodo.appendChild(contenedor);
        contenedor.appendChild(user);
        contenedor.appendChild(email);
        imagen.src = `/img/${usuario.imagen}`;
        user.innerHTML = usuario.username;
        email.innerHTML = usuario.email;

        document.getElementById('lista-contactos').appendChild(nodo);
    });
}

function usarUsuario(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuario = usuarios.find(usuario => usuario.id === id);
    if (usuario) {
        /* cargo imagen en header */
        const img = document.getElementById('foto-perfil');
        img.src = `/img/${usuario.imagen}`;
        img.style.height = '49px';

        /* cargo datos en postear */
        const imagen = document.getElementById('imagen-usuario');
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        imagen.src = `/img/${usuario.imagen}`;
        imagen.style.height = '100px';
        username.innerHTML = usuario.username;
        username.style.fontWeight = 'bold';
        email.innerHTML = usuario.email;
        email.style.fontWeight = 'lighter';

    }
    localStorage.setItem('usuario_actual', JSON.stringify(usuario));
}

function colocarPosteo() {
    const posteos = JSON.parse(localStorage.getItem('posteos'));
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('fileElem').files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imagen);
    reader.onloadend = function() {
        const imagenBase64 = reader.result;
        const posteo = {
            id: posteos.length + 1,
            usuario: JSON.parse(localStorage.getItem('usuario_actual')),
            usuario_id: JSON.parse(localStorage.getItem('usuario_actual')).id,
            descripcion,
            imagenBase64,
            comentarios: new Array(),
            likes: new Array(),
        }
        posteos.push(posteo);
        localStorage.setItem('posteos', JSON.stringify(posteos));
    }

    return;
}


function cargarPosteos() {

    const usuario_actual = JSON.parse(localStorage.getItem('usuario_actual'));
    const posteos = JSON.parse(localStorage.getItem('posteos'));
    posteos.sort(function(a, b) {
        return b.id - a.id;
    });
    const posteosElement = document.getElementById('posts');

    posteos.forEach((posteo, index) => {
        const artilce = document.createElement('article');

        posteosElement.appendChild(artilce);

        const header = document.createElement('header');
        const imagen_perfil = document.createElement('img');
        const usuario = document.createElement('h4');
        const usuarioDesc = document.createElement('h4');
        const imagen = document.createElement('img');
        const interacciones = document.createElement('section');
        const like = document.createElement('i');
        const comentario = document.createElement('i');
        const contenedor_descripcion = document.createElement('section');
        const descripcion = document.createElement('p');
        const contenedor_comentarios = document.createElement('section');
        const lista_comentarios = document.createElement('ul');
        const contenedor_me_gustas = document.createElement('section');
        const lista_me_gustas = document.createElement('ul');
        const input_comentario = document.createElement('input');

        artilce.appendChild(header);
        artilce.appendChild(imagen);
        imagen.src = posteo.imagenBase64;
        artilce.appendChild(interacciones);
        interacciones.classList.add('interacciones');
        artilce.appendChild(contenedor_me_gustas);
        artilce.appendChild(contenedor_descripcion);
        artilce.appendChild(contenedor_comentarios);
        artilce.appendChild(input_comentario);

        input_comentario.classList.add('input-comentario');
        input_comentario.type = 'text';
        input_comentario.placeholder = 'Escribe un comentario...';
        input_comentario.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                const comentario = {
                    usuario: usuario_actual,
                    comentario: `${e.target.value}`,
                };
                posteo.comentarios.push(comentario);
                localStorage.setItem('posteos', JSON.stringify(posteos));
                location.reload();
            }
        })


        header.appendChild(imagen_perfil);
        header.appendChild(usuario);
        imagen_perfil.src = `/img/${posteo.usuario.imagen}`;
        imagen_perfil.style.height = '49px';
        usuario.innerHTML = posteo.usuario.username;

        interacciones.classList.add('interacciones');
        interacciones.appendChild(like);
        interacciones.appendChild(comentario);
        like.classList.add('fas');
        like.classList.add('fa-heart');
        comentario.classList.add('fas');
        comentario.classList.add('fa-comment');
        like.setAttribute('id', `${posteo.id}`);
        like.addEventListener('click', (e) => {
            const posteo_id = e.target.id;

            const likes = posteo.likes;

            if (likes.length > 0) {

                if (likes.includes(usuario_actual.username)) {
                    like.classList.remove('liked');
                    likes.splice(likes.indexOf(usuario_actual.id));
                } else {
                    like.classList.add('liked');
                    likes.push(usuario_actual.username);
                }


            } else {
                like.classList.add('liked');
                likes.push(usuario_actual.username);
            }

            localStorage.setItem('posteos', JSON.stringify(posteos));

            location.reload();
        });
        comentario.setAttribute('id', `${posteo.id}`);
        if (posteo.likes.includes(usuario_actual.username) && like.getAttribute('class') !== 'fas fa-heart liked') {
            like.classList.add('liked');
        }

        contenedor_me_gustas.appendChild(lista_me_gustas);
        lista_me_gustas.classList.add('lista-me-gustas');
        //reccorrer todos los likes del posteo y cargar los nombres en el ul
        if (posteo.likes.length > 0) {
            posteo.likes.forEach((like) => {
                const li = document.createElement('li');
                li.innerHTML = like;
                lista_me_gustas.appendChild(li);
                li.classList.add('me-gusta');
                li.classList.add('on');
            });
        } else {
            lista_me_gustas.style.display = 'none';
        }

        contenedor_descripcion.appendChild(usuarioDesc);
        usuarioDesc.innerHTML = posteo.usuario.username;
        contenedor_descripcion.appendChild(descripcion);
        descripcion.innerHTML = posteo.descripcion;
        contenedor_descripcion.classList.add('descripcion');

        contenedor_comentarios.appendChild(lista_comentarios);
        contenedor_comentarios.classList.add('contenedor-comentarios');
        //recorrer todos los comentarios de los post y cargarlos en un li
        posteo.comentarios.forEach((comentario) => {
            const li = document.createElement('li');

            const usuario_comentario = document.createElement('h6');
            const comentario_texto = document.createElement('p');

            li.appendChild(usuario_comentario);
            li.appendChild(comentario_texto);


            usuario_comentario.innerHTML = comentario.usuario.username;
            comentario_texto.innerHTML = comentario.comentario;

            lista_comentarios.appendChild(li);
        });

    });
}

window.addEventListener("load", function() {
    if (localStorage.getItem('usuarios') !== null) {
        cargarUsuarios(JSON.parse(localStorage.getItem('usuarios')));
        const usuario_actual = localStorage.getItem('usuario_actual');
        if (usuario_actual !== null) {
            usarUsuario(JSON.parse(usuario_actual).id);
        } else {
            usarUsuario(1);
        }
        agregarOnClick();
    } else {
        Promise.all([obtenerUsuarios()]).then((resp) => {
            agregarImagenAUsuarios(resp[0]);
            cargarUsuarios(JSON.parse(localStorage.getItem('usuarios')));
            usarUsuario(1);
            agregarOnClick();
        }).catch((err) => {
            console.log(err);
        });
    }

    if (localStorage.getItem('posteos') === null) {
        localStorage.setItem('posteos', JSON.stringify([]));
    }
    cargarPosteos();
});

/* -------------------- Detectar scroll para fondo header -------------------- */
window.onscroll = (e) => {
    const header = document.querySelector('.cabecera');
    if (window.scrollY > 0) {
        header.classList.add('agregar_fondo');
    } else {
        header.classList.remove('agregar_fondo');
    }
}


/* -------------------- Zona soltar imagen -------------------- */
let dropArea = document.getElementById('drop-area');

;
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
})

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

;
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
})

;
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
})

function highlight(e) {
    dropArea.classList.add('highlight');
}

function unhighlight(e) {
    dropArea.classList.remove('highlight');
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files);
}

function handleFiles(files) {
    ([...files]).forEach(previewFile);
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.createElement('img')
        img.src = reader.result
        document.getElementById('gallery').appendChild(img)
        img.style.width = '50%';
    }
}

/* -------------------- Fin Zona soltar imagen -------------------- */

/* -------------------- Usuarios clickeables -------------------- */
function agregarOnClick() {
    const ul = document.getElementById('lista-contactos');
    const list_items = ul.getElementsByTagName('li');
    for (let i = 0; i < list_items.length; i++) {
        list_items[i].addEventListener('click', (e) => {
            usarUsuario(i + 1);
            location.reload();
        });
    }
}
/* -------------------- Fin Usuarios clickeables -------------------- */