
let baseUrl="http://owinrestproductsapi.azurewebsites.net/";

let $ = require('jquery');

const products = [];



//Api calls
class realApi {

//Get all products with delay
  static getAllProducts() {

     return new Promise(function(resolve,reject){
                      
            $.ajax({
                url:baseUrl+"api/products",
                dataType:"json",
                success: function(data){ 
                    console.log("success on getting products")          
                    resolve(Object.assign([], data))},
                error: function(error){
                    console.log("api error on getting products")
                    reject("api error on getting products");
                }
            })
                   
        })

  }


  //Save a product without violating immutability
  static saveProduct(product) {
    product.Price = parseFloat(product.Price);
    product = Object.assign({}, product); // Comply with Immutability

    return new Promise((resolve, reject) => {

         //Some Server-side validation
            if (product.Name.length < 5) {
            reject(`Name must be at least 5 characters.`);
            }

            if (product.Price < 0 || product.Price.toString() ==='') {
            reject(`You must fill a positive price`);
            }

    if(product.Id){

        $.ajax({
                    type:"PUT",
                    url:baseUrl+"api/products/"+product.Id,
                    dataType:"json",
                    data: product,
                    success: function(data){ 
                        console.log("success on updating product"+ product.Id)  

                        const existingProductIndex = products.findIndex(a => a.id == product.id);
                        products.splice(existingProductIndex, 1, product);

                        resolve(product);
                        },
                    error: function(error){

                        console.log(error);
                        console.log("api error on updating product");
                        reject("api error on updating product");

                    }
                })    
    }
    else{

        $.ajax({
                    type:"POST",
                    url:baseUrl+"api/products",
                    dataType:"json",
                    data: product,
                    success: function(productId){ 
                        console.log("success on inserting product"+ productId)  
                        product.Id= productId;

                        console.log(product);
                        products.push(product);
                        resolve(product)},
                    error: function(error){
                        console.log("api error on inserting product")
                        reject("api error on inserting product");
                    }
                })

     }





    });

  }



 //Delete
 static deleteProduct(productId) {
    return new Promise((resolve, reject) => {

            $.ajax({
                url:baseUrl+"api/products/"+productId,
                type: 'DELETE',
                success: function(response) {

                    console.log("success on deleting product "+ productId)   
                    const indexOfProductToDelete = products.findIndex(product => {
                    product.Id == productId;
                    });
                    products.splice(indexOfProductToDelete, 1);
                    resolve();
               
                },
                error: function(error) {
                    reject("api error on getting products");
                }
            });

     
    });
  }


  






}

export default realApi;