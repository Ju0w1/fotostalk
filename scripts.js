function random_item(items) {
    return items[Math.floor(Math.random() * items.length)];
}

const imagenesPerfil = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];

const usuarios = async() => {
    const usuarios = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(usuarios => usuarios.json());

    let lista = ``;
    usuarios.forEach((usuario, index) => {
        lista += `
        <li>
            <img src="/img/${random_item(imagenesPerfil)}" alt="">
            <div>
                <h5>${usuario.username}</h5>
                <h6>${usuario.email}</h6>
            </div>
        </li>
        `;
    });
    document.getElementById('lista-contactos').innerHTML = lista;
    console.log(usuarios);
}

const albums = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
        .then(response => response.json());

    console.log(response);
}

async function obtenerFotos(index) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${index + 1}/photos`);

    return response;
}


const posts = async() => {
    const posteos = await fetch('https://jsonplaceholder.typicode.com/users/1/posts')
        .then(posteos => posteos.json());

    let posts = ``;

    for (let i = 0; i < posteos.length; i++) {
        const posteo = posteos[i];

        const { title } = posteo;

        const foto = await fetch(`https://jsonplaceholder.typicode.com/photos/${i + 1}`);
        const fotoToJson = await foto.json();
        // console.log(albums);
        console.log(fotoToJson);

        posts += `
        <article>
            <header>
                <img src="/img/${random_item(imagenesPerfil)}" alt="">
                <h4>username</h4>
            </header>
            <img src="${fotoToJson.url}" alt="">
            <section class="interacciones">
                <a href="#"><i class="fa-solid fa-heart"></i></a>
                <a href="#"><i class="fa-solid fa-comment"></i></a>
            </section>
            <section class="descripcion">
                <p>${posteo.body}</p>
            </section>
            <section class="comentarios">
                <ul>
                    <li>
                        <h6>username</h6>
                        <p>comment</p>
                    </li>
                </ul>
            </section>
        </article>
        `;
    }

    console.log(posts);
    document.getElementById('posts').innerHTML = posts;

    console.log(posteos);
}
const comments = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then(response => response.json());
    console.log(response);
}

window.addEventListener("load", function() {
    usuarios();
    albums();
    posts();
    comments();
});