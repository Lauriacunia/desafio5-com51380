/** Recordar agregar el script de socket en el html
 * <script src="/socket.io/socket.io.js"></script>
 */
const socket = io();

socket.on("connection", () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

// const form = document.getElementById('form');
// let newProduct ={};

// form.addEventListener('submit', (event) => {
//     event.preventDefault();
//     const title = form.elements.title.value;
//     const description = form.elements.description.value;
//     const price = form.elements.price.value;
//     const thumbnail = form.elements.thumbnail.value;
//     const code = form.elements.code.value;
//     const stock = form.elements.stock.value;
//     const category = form.elements.category.value;
//     const status = form.elements.status.value;

//     newProduct = {title, description, price, thumbnail, code, stock, category, status};

//     //FRONT EMITE
//     socket.emit('msg_from_client_to_server', newProduct);
//     form.reset();
// });

function deleteProduct(id) {
  fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //reload page
      window.location.reload();
    })
    .catch((err) => console.log(err));
}
