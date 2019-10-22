// Will use this file to tie the entire js code together
// Will start with writing tne class for creating new store items



document.addEventListener("DOMContentLoaded", ()=>
{
  window.cart = {};
  flashImageSetter("AMD RYZEN", "3000 SERIES", "/assets/flashsales/flash1.jpg")

  window.collections = {
    "RAM 4G 8G_A-Tech 8GB 2 x 4GB PC3-12800 Desktop DDR3 1600": {
      price: "2500",
      image: "/assets/image1.png"
    },
    "Grey Thermal Conductive Grease Paste For CPU GPU Chipset Cooling": {
      price: "1500",
      image: "/assets/image2.png"
    },
    "4GB DDR5 128Bit Office Silent PCI Express Game Graphics Card Desktop PC": {
      price: "1300",
      image: "/assets/image3.png"
    },
    // "GeForce GTX 1180": {
    //   price: "127000",
    //   image: "/assets/image4.png"
    // },
    "Generic PCI Express Display Adapter": {
      price: "1200",
      image: "/assets/image5.png"
    },
    "CMOS BIOS Battery Battery Camera Cr2032 Cable Connector Notebook Laptop 3V 2Pin": {
      price: "1000",
      image: "/assets/image6.png"
    }
  }
  
  for (let i in window.collections)
  {
    let item = window.collections[i];
    item.name = i;
    let singleItem = createItem(item);
  }

  const store = document.querySelector(".allitems-contents");
    store.querySelectorAll('.item-medium').forEach(anItem => {//fetch all items in page as anitem
      anItem.querySelectorAll('.item-count-button').forEach(button => {// fetch all buttons in single anItem
        button.addEventListener('click', event=>{//add click event
          if(event.target.classList.contains('item-count-plus')){
            anItem.querySelector('.item-count-quantity--val').innerText = anItem.querySelector('.item-count-quantity--val').innerText/1 + 1;
          }
          else if(event.target.classList.contains('item-count-minus') && anItem.querySelector('.item-count-quantity--val').innerText > 0){
            anItem.querySelector('.item-count-quantity--val').innerText = anItem.querySelector('.item-count-quantity--val').innerText/1 - 1;
          }          
          window.collections[anItem.querySelector('.item-name').innerText].quantity = anItem.querySelector('.item-count-quantity--val').innerText;
        });
      });
    });
});


function createItem(params)
{
  const store = document.querySelector(".allitems-contents")
  let item = store.makeElement({
    element: "div",
    attributes: {class: "item-medium"}, 
    children: [
      {element: "img", attributes: {class: "item-picture", src: params.image, alt: params.name}},
      {element: "div", text: params.name, attributes: {class: "item-name"}},
      {element: "div", attributes: {class: "item-count"},
      children: [
        {element: "span", text: '₦'+params.price, attributes: {class: "item-count-price"}},
        {element: "span", attributes: {class: "item-count-quantity"},
        children: [
          {element: "span", text:"-", attributes: {class: "item-count-button item-count-minus"}},
          {element: "span", text: 0, attributes: {class: "item-count-quantity--val"}},
          {element: "span", text:"+", attributes: {class: "item-count-button item-count-plus"}}
        ]}  
      ]}
    ]
  });

  return item;
}



function flashImageSetter(bigText, smallText, imageUrl)
{
  //will write later, but this should automatically change the content 
  //of the flash header at the click of a button.
  let [big, small] = [document.querySelector(".flashcontent_bigtitle1"), document.querySelector(".flashcontent_smalltitle1")]
  
  big.innerText = bigText;
  small.innerText = smallText;

  // console.log(document.getElementsByClassName("flashcontent_bigtitle1").innerText)
}

function cartPageCreator()
{
  let pane = document.querySelector(".checkout-cart").makeElement(
    {element: "div", attributes: {class: "checkout"}}
  )
  
  console.log("yimu")
  
  let userAddedItem = Object.keys(window.collections).some(item=>{    
    return window.collections[item].quantity > 0 ;
  });

  pane.makeElement(
    {element: "div", attributes: {class: "cart"}, 
      children: [
        {element: "div", text: "Your Cart", attributes: {class: "cart-title"}},
        {element: "div", attributes: {class: "cart-content"}},
        {element: "img", attributes: {class:"close", src: "/assets/close.png"}},
              
      ]
    }
  );

  let cart = document.querySelector('.cart');

  pane.querySelector('.cart').addEventListener('click', event=>{
    pane.remove()
  })

  if(userAddedItem){
    cart.querySelector(".cart-content").makeElement(
      {element: "table", attributes: {class: "cart-table"}, children: [
        {element: "thead", children: [
          {element: 'tr', children: [
            {element: 'th', text: 'S/N'},
            {element: 'th', text: 'IMAGE'},
            {element: 'th', text: 'ITEM'},
            {element: 'th', text: 'QTY'},
            {element: 'th', text: 'PRICE'}
          ]}
        ]},
        {element: "tbody"},
        {element: "tfoot", children:[
          {element: "tr", children: [
            {element: "th", text: 'TOTAL', attributes: {colspan: 4, id: "total-text"}},
            {element: "th", text: 'N 0.00', attributes: {id: 'total-cost'}}
          ]}
        ]}
      ]}
    );

    cart.querySelector(".cart-content").makeElement(
      {element: "button", attributes: {class: "cart-checkout-btn"},
        text: "Checkout"}
    )

    let i = 0;
    let total = 0;
    let orders = [];
    for(let j in window.collections){
      let item = window.collections[j];
      if(typeof item.quantity == 'undefined' || item.quantity == 0) continue;
      item.name = j;
      i++;
      total = total/1 + (item.price * item.quantity)/1;

      pane.querySelector('.cart').querySelector('tbody').makeElement(
        {element: 'tr', children: [
          {element: 'td', text: i, attributes: {class: 'cart-item-sn'}},
          {element: 'td', attributes: {class: 'cart-item-img'}, children: [
            {element: 'img', attributes: {class: 'cart-item-image', src: item.image}} 
          ]},
          {element: 'td', text: item.name, attributes: {class: 'cart-item-name'}},
          {element: 'td', text: item.quantity, attributes: {class: 'cart-item-qty'}},
          {element: 'td', text: item.price * item.quantity, attributes: {class: 'cart-item-total'}}
        ]}
      )

      orders.push(
        [{
        orderName: item.name,
        orderImage: item.image,
        orderQuantity: item.quantity,
        orderPrice: item.price
      }]
      )
    }
    console.log(orders)
    
    cart.querySelector('#total-cost').innerHTML = "₦" + total;
  }
  else{
    // cart.querySelector(".card-content").makeElement(
    //   {element: ""}
    // )    
    cart.querySelector(".cart-content").makeElement(
      {element: 'h2', text: 'Cart is Empty, Please keep shopping', attributes: {class: 'empty-cart-text'}}
    );
    console.log("worked")
  }
}