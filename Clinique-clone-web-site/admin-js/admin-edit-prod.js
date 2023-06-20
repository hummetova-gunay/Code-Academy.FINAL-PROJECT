const BASE_URL = "http://localhost:3000/allProducts";
 let id =new URLSearchParams(window.location.search).get("id")
 console.log(id);
 let heading=document.querySelector('h1')
 let  editImg = document.querySelector('#editImg')
 let  editImgModal=document.querySelector('#editImgModal')
 let  editName = document.querySelector('#editName')
 let  editDesc = document.querySelector('#editDesc')
 let  editPrice = document.querySelector('#editPrice')
 let  editCat = document.querySelector('#editCat')
 let  editConcern = document.querySelector('#editConcern')
 let  editSkinType = document.querySelector('#editSkinType')
 let  editForm = document.querySelector('#editForm')
let form=document.querySelector('form')
if(id){
    heading.innerHTML="Edit product"
    async function getProdData(){
        const res=await axios(`${BASE_URL}/${id}`)
        const data=await res.data
        console.log(data);
        editName.value=data.productName
        editDesc.value=data.productDescription
        editPrice.value=data.productPrice
        editCat.value=data.productCategory
        editConcern.value=data.skinConcern
        editSkinType.value=data.skinType
        editForm.value=data.productForm
    }
    getProdData()
 }else{
    heading.innerHTML="Add product"
} 
 async function editProd(){
    const editedProduct={
        productName:editName.value,
        productDescription:editDesc.value,
        productPrice:+editPrice.value,
        productImageMain:editImg.value.split("\\")[2],
        productImageModal:editImgModal.value.split("\\")[2],
        productCategory:editCat.value,
        skinConcern:editConcern.value,
        skinType:editSkinType.value,
        productForm:editForm.value
    }
    await axios.patch(`${BASE_URL}/${id}`, editedProduct)
    window.location.href="admin-all-products.html"
 }


async function createProd(){
    const newProduct={
        productName:editName.value,
        productDescription:editDesc.value,
        productPrice:+editPrice.value,
        productImageMain:editImg.value.split("\\")[2],
        productImageModal:editImgModal.value.split("\\")[2],
        productCategory:editCat.value,
        skinConcern:editConcern.value,
        skinType:editSkinType.value,
        productForm:editForm.value
    }
    await axios.post(BASE_URL, newProduct)
    window.location.href="admin-all-products.html"
}

form.addEventListener('submit', function(e){
    e.preventDefault()
    if(id){
        heading.innerHTML="Edit product"
        editProd()
    }else{
        createProd()
    }
})