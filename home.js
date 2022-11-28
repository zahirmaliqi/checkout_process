const product =[
    {
        id:0,
        image:'',
        name:'Bottle of Water',
        price: 0.25,
        discount:0,
        VAT:8,
    },
    {
        id:1,
        image:'',
        name:'Chip',
        price: 2.40,
        discount:0,
        VAT:8,
    },
    {
        id:2,
        image:'',
        name:'TV',
        price: 760.00,
        discount:0,
        VAT:22,
    },
    {
        id:3,
        image:'',
        name:'CocaCola',
        price: 0.50,
        discount:0.10,
        VAT:18,
    }
];

const categories = [...new Set(product.map((item)=>{
  return item}))]
let i =0;
let k=0;
document.getElementById('root').innerHTML=categories.map((item)=>{
    var{image,name,price} = item;
    return(
        `<div class='box'>
                <div class='img-box'>
                     <img class='imgages' src=${image}></img>
                </div>

                <div class='bottom'>
                   <p> ${name} </p>
                   <h2>$ ${price}</h2>`+
                   "<input type='number' min='1' name='' id='"+(k++)+"'>"+ 
                   "<button onclick='addtocart("+(i++)+")'>Add</button>"+
                `</div>
          </div>`
    )
}).join('')


var cart=[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}

function delElement(a){
    // bought_product.pop({...group[k]});
    cart.splice(a,1);
    displaycart();

}

      document.getElementById('cartItem').innerHTML="Empty cart";
      document.getElementById("subTotal").innerHTML="$ 0.00";
      document.getElementById("vat").innerHTML="$ 0.00";
      document.getElementById("total").innerHTML="$ 0.00";

function displaycart(a) {
    let j = 0, subTotal = 0, general_vat = 0;

    document.getElementById("count").innerHTML = cart.length;

    if (cart.length !== 0){
        document.getElementById('cartItem').innerHTML = cart.map((items) => {

            var { id,image, name, price, discount, VAT } = items;
            var k= document.getElementById(id).value;
        
            subTotal = subTotal + (k*(price-discount));
            general_vat = general_vat + (k*(price-discount) * (VAT / 100));
            let total = general_vat + subTotal;

            document.getElementById("subTotal").innerHTML = "$" + subTotal.toFixed(2);
            document.getElementById("vat").innerHTML = "$" + general_vat.toFixed(2);
            document.getElementById("total").innerHTML = "$" + total.toFixed(2);
     
            return (
                `<div class='cart-item'>
                         <div class='row-img'>
                             <img class='rowing' alt=${name} src=${image}>
                         </div>
                         <p style="font-size:12px;">${name}</p>
                         <h2 style="font-size:12px;">${k} X $${price}</h2>` +
                "<img alt=${name} onclick='delElement(" + (j++) + ")'></img></div>"

            );
        
        }).join('');
    }
}






