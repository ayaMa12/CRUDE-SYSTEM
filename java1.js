let input = document.getElementsByClassName("input")[0];
let output = document.getElementsByClassName("output")[0];
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
total.style.backgroundColor = "red";
let count = document.getElementById("count");
let category = document.getElementById("category");
let creat = document.getElementById("btn1");
let table = document.getElementById("table");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
let deletAll = document.getElementById("deleteAll");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let span = document.createElement("span");
deletAll.appendChild(span);
span.innerHTML = `${0}`;
deletAll.style.display = "none";
let mood = "create";
let tmpIndex; // لتخزين العنصر اللي بنعدله

// get total
onkeyup = function () {
  if (price.value > 0) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `total ${result}`;
    total.style.backgroundColor = "green";
  } else {
    total.innerHTML = `total ${0}`;
    total.style.backgroundColor = "red";
  }
};

let array = JSON.parse(localStorage.getItem("product")) || [];
datetable(array);
countAll(array);
creat.onclick = function () {
  let result = +price.value + +taxes.value + +ads.value - +discount.value;
  // validation condition
  if (!title.value || !price.value || !category.value) {
    [title, price, count, category].forEach((e) => {
      e.style.outline = "2px solid blue";
    });
    deletAll.style.display = "none";
    title.focus();
  } else if (+count.value > 100 || +count.value < 1) {
    alert("please  data &count biger than 100");
  } else {
    deletAll.style.display = "block";
    let newPro = {
      title: title.value.toLowerCase(),
      price: +price.value,
      taxes: +taxes.value,
      ads: +ads.value,
      discount: +discount.value,
      total: result,
      count: +count.value,
      category: category.value.toLowerCase(),
    };

    if (mood === "create") {
      if (+count.value > 1) {
        for (let i = 0; i < +count.value; i++) {
          array.unshift(newPro);
        }
      } else {
        array.unshift(newPro);
      }
    } else {
      array[tmpIndex] = newPro;
      mood = "create";
      creat.innerHTML = "create";
      count.style.display = "block";
    }
    localStorage.setItem("product", JSON.stringify(array));
    datetable(array);
  }
  clearData();
  countAll(array);
  search.value = "";

  // console.log(array);
};
function datetable(array) {
  tbody.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let newPro = array[i];
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${newPro.title}</td>
            <td>${newPro.price.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}</td>
            <td>${newPro.taxes.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}</td>
            <td>${newPro.ads.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}</td>
            <td>${newPro.discount.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}</td>
            <td>${newPro.total.toLocaleString(undefined, {
              minimumFractionDigits: 0,
            })}</td>
            <td>${newPro.category}</td>
            <td><button id="update" onclick="updateProduct(${i})">update</button></td>
            <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
        `;

    tbody.appendChild(tr);
  }
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "total";
  total.style.backgroundColor = "red";
  count.value = "";
  category.value = "";
}

//get localstorage
function updateProduct(index) {
  let data = JSON.parse(localStorage.getItem("product")) || [];
  if (data) {
    title.value = data[index].title;
    price.value = data[index].price;
    taxes.value = data[index].taxes;
    ads.value = data[index].ads;
    discount.value = data[index].discount;
    category.value = data[index].category;
    // alert(index)
    count.style.display = "none";
    creat.innerHTML = "update";
    mood = "update";
    tmpIndex = index;
    console.log(tmpIndex);
  }
  scroll({
    top: 0,
    behavior: "smooth",
  });
  searchTitle.style.cssText = ``;
  searchCategory.style.cssText = ``;
}
function deleteProduct(index) {
  let array = JSON.parse(localStorage.getItem("product")) || [];
  array.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(array));
  datetable(array);
  span.innerHTML = `${array.length}`;
}

function countAll(array) {
  span.style.backgroundColor = "blue";
  span.innerHTML = `${array.length}`;
}
deletAll.onclick = function () {
  localStorage.clear();
  array.splice(0);
  datetable(array);
  span.innerHTML = `${array.length}`;
  deletAll.style.display = "none";
};
function fun() {
  search.onkeyup = function () {
    let array = JSON.parse(localStorage.getItem("product")) || [];
    let tr = "";
    let value = search.value.toLowerCase();
    if (searchMode === "title") {
      for (let i = 0; i < array.length; i++) {
        let newPro = array[i];
        if (newPro.title.includes(value)) {
          tr += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${newPro.title}</td>
                    <td>${newPro.price.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.taxes.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.ads.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.discount.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.total.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>
            `;
        }
      }
    } else if (searchMode === "category") {
      for (let i = 0; i < array.length; i++) {
        let newPro = array[i];
        if (newPro.category.includes(value)) {
          tr += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${newPro.title}</td>
                    <td>${newPro.price.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.taxes.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.ads.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.discount.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.total.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                    })}</td>
                    <td>${newPro.category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">update</button></td>
                    <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                </tr>
            `;
        }
      }
    }
    tbody.innerHTML = tr;
  };
}
let searchMode = "title";
searchTitle.onclick = function () {
  searchTitle.style.cssText = `
    background-color: rgba(14, 150, 9, 1);
    transition: all 0.3s ease-in-out;
    `;
  searchCategory.style.cssText = ``;
  searchMode = "title";
  search.placeholder = "Search by Title";
  search.focus();
  search.value = "";
  fun();
};

searchCategory.onclick = function () {
  searchCategory.style.cssText = `
    background-color: rgba(14, 150, 9, 1);
    transition: all 0.3s ease-in-out;
    `;
  searchTitle.style.cssText = ``;
  searchMode = "category";
  search.placeholder = "Search by Category";
  search.focus();
  search.value = "";
  fun();
};
