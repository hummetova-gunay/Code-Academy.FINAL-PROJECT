
const BASE_URL = "http://localhost:8000/allProducts";
let tableBody = document.querySelector('tbody');
let addBtn=document.querySelector('#addBtn')

function fillTable(arr) {
  tableBody.innerHTML = '';
  arr.forEach(el => {
    tableBody.innerHTML += `
      <tr>
        <td><img src="./images/${el.productImageMain}" alt=""></td>
        <td><img src="./images/${el.productImageModal}" alt=""></td>
        <td>${el.productName}</td>
        <td>${el.productDescription}</td>
        <td>${el.productPrice}</td>
        <td>${el.productAmount}</td>
        <td>${el.productCategory}</td>
        <td>${el.skinConcern}</td>
        <td>${el.skinType}</td>
        <td>${el.productForm}</td>
        <td>
          <button class="btn" onclick="editProd(${el.id})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn" onclick="deleteProduct(${el.id})">
             <i class="fa-solid fa-trash-can" ></i>
          </button>
        </td>
      </tr>
    `;
  });
}

async function getData() {
    const res = await axios(BASE_URL);
    const data = await res.data;
    fillTable(data);
    console.log(data);
}
getData();


 async function deleteProduct(id){
   await axios.delete(`${BASE_URL}/${id}`)
}

addBtn.addEventListener('click', function(){
  window.location.href="edit-add-products-admin.html"
})

function editProd(id){
  window.location.href=`edit-add-products-admin.html?id=${id}`
}