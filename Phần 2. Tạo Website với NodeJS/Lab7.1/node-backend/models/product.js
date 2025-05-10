const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../datas/products.json");

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.id = Math.random().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return new Promise((resolve, reject) => {
      Product.fetchAll()
        .then((products) => {
          products.push(this);
          fs.writeFile(dataPath, JSON.stringify(products, null, 2), (err) => {
            if (err) reject(err);
            else resolve();
          });
        })
        .catch((err) => reject(err));
    });
  }

  static fetchAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(dataPath, (err, fileContent) => {
        if (err) return resolve([]);
        resolve(JSON.parse(fileContent));
      });
    });
  }
};
