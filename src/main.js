let shop = document.getElementById("shop");

// Item Data (ARRAY OF OBJECTS):
let shopItemsData = [
  {
    id: "vdertyyum1",
    name: "Casual Shirt",
    price: 55,
    desc: "Lorem ipsum dolor sit amet.",
    img: "images/img1.jpg",
  },
  {
    id: "vfdswiomi2",
    name: "Casual Jacket",
    price: 95,
    desc: "Lorem ipsum dolor sit amet.",
    img: "images/img2.jpg",
  },
  {
    id: "mnbvghute3",
    name: "T-shirt Women",
    price: 45,
    desc: "Lorem ipsum dolor sit amet.",
    img: "images/img3.jpg",
  },
  {
    id: "qwevghnol4",
    name: "Printed T-shirt",
    price: 35,
    desc: "Lorem ipsum dolor sit amet.",
    img: "images/img4.jpg",
  },
  {
    id:'gdheuwikm5',
    name: "Casual Pants",
    price: 50,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img5.jpg"
  },
  {
    id:'ncfekdikj6',
    name: "Orange Top Women",
    price: 75,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img6.jpg"
  },
  {
    id:'qwxdfhyu7',
    name: "T-shirt White",
    price: 45,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img7.jpg"
  },
  {
    id:'qlrpbfued8',
    name: "Cotton Top Women",
    price: 60,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img8.jpg"
  },
  {
    id:'bbggrrpp9',
    name: "Winter Hoodie Pink",
    price: 90,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img9.jpg"
  },
  {
    id:'wwwwklit10',
    name: "Women Pants Grey",
    price: 65,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img10.jpg"
  },
  {
    id:'nbhbtree11',
    name: "Leather Watch",
    price: 130,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img11.jpg"
  },
  {
    id:'gfhdteui12',
    name: "White Sneakers",
    price: 200,
    desc: "Lorem ipsum dolor sit amet.",
    img:"images/img12.jpg"
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Card component function :
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x)=>x.id === id) || [];
      return `
  <div id=product-id-${id} class="item">
    <img src=${img} alt="">
    <div class="details">
      <h3>${name}</h3>
      <p> ${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${search.item === undefined? 0 : search.item}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div> `;
    })
    .join(""));
};

generateShop();

// Increment function:
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  
  // console.log(basket);
  update(selectedItem.id);

  localStorage.setItem("data", JSON.stringify(basket));
};

// Decrement function:
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((x) =>x.item !==0);
  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

// Update Function:
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  // console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

// Calculation function:
let calculation = () => {
  let cardIcon = document.getElementById("cardAmount");
  cardIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
  // console.log(basket.map((x)=>x.item).reduce((x,y) => x+y, 0));
};

calculation();