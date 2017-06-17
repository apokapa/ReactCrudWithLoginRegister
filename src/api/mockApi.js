// This file mocks a web API with fake products and users
// Calls return promises and have a set delay of 0.5sec

//Fake Delay 0.5sec
const delay=500;

//Fake products
const products = [
  {
    Id: 4567,
    Name: "Product 1",
    Category: "GPU",
    Price: 2338
  },
  {
    Id: 4568,
    Name: "Product 2",
    Category: "GPU",
    Price: 2611
  },
  {
    Id: 4569,
    Name: "Product 3",
    Category: "MOBO",
    Price: 1233
  },
  {
    Id: 4667,
    Name: "Product 4",
    Category: "GPU",
    Price: 3433
  },
  {
    Id: 4767,
    Name: "Product 5",
    Category: "MOBO",
    Price: 3444
  }
];

//Fake categories
const categories = [
  {
    Code: "GPU",
    Name: "Graphic cards"
  },
  {
    Code: "MOBO",
    Name: "Motherboards"
  }
];

//Some fake users
const users = [
  {
    username: "bill",
    password: "1234"
  },
  {
    username: "monty",
    password: "python"
  },
  {
    username: "pink",
    password: "floyd"
  },
  {
    username: "rick",
    password: "morty"
  }
];

//This would be performed on the server in a real app. Just stubbing in.

//Mimic DB Auto-Incremen
//Returns the max product id+1 If there is no products at all resets to 1.
const generateNumberId= (products) => {

   if (products.length >0) {
        var Id = products.sort(function(product1, product2){
        return product1.Id < product2.Id;})[0].Id;
         return Id+1;
   }
  else{
    return 1
  }
};

//Api calls
class mockApi {

//Products

  //Get all products with delay
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], products));
      }, delay);
    });
  }

  //Save a product without violating immutability
  static saveProduct(product) {
    product.Price = parseFloat(product.Price);
    product = Object.assign({}, product); // Comply with Immutability

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Some Server-side validation
        if (product.Name.length < 5) {
          reject(`Name must be at least 5 characters.`);
        }

        if (product.Price < 0 || product.Price.toString() ==='') {
          reject(`You must fill a positive price`);
        }


        if (product.Id) {
          const existingProductIndex = products.findIndex(a => a.id == product.id);
          products.splice(existingProductIndex, 1, product);
        } else {

          //Comply with Immutability
          //Cloning so copy returned is passed by value rather than by reference.
          product.Id = generateNumberId(products);

          products.push(product);
        }

        resolve(product);
      }, delay);
    });

  }

 //Delete
 static deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfProductToDelete = products.findIndex(product => {
          product.Id == productId;
        });
        products.splice(indexOfProductToDelete, 1);
        resolve();
      }, 0);
    });
  }

//Categories

  //Get all categories
  static getAllCategories() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], categories));
      }, delay);
    });
  }


//Account

   //Login
  static loginUser(user){
      return new Promise((resolve, reject) => {
      setTimeout(() => {


        if (users.length > 0 && users.find(_user => _user.username.toLowerCase() === user.username.toLowerCase() && _user.password.toLowerCase() === user.password.toLowerCase() )) {
          resolve();
        }
        else{
          reject(`Wrong username or passwosdsrd :(`);
        }
        resolve();
      }, delay);
      });
    }

  //Register
  static registerUser(user) {
    user = Object.assign({}, user); // Comply with Immutability

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Some Server-side validation
        if (user.username.length < 4) {
          reject(`Username must be at least 4 characters.`);
        }

        if (user.password.length < 4) {
          reject(`Password must be at least 4 characters.`);
        }

        const existingUserIndex = users.findIndex(a => a.username == user.username);
        console.log(existingUserIndex);

        if (existingUserIndex>=0) {
          reject(`Username already exists...`);
        } else {
          users.push(user);
        }

        resolve(user);
      }, delay);
    });

  }


}

export default mockApi;
