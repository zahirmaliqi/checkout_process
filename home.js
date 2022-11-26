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
    }
];

const group = [...new Set(product.map((article)=>{
  return article
}))]
let i =0;

document.getElementById('item-section').innerHTML=group.map((article)=>{
    var{image,name,price} = article;
    return(
        `<div class="box">
                <div class="image-part">
                     <img class="img" src=${image}/>
                </div>

                <div class="product-details">
                   <p> ${name} </p>
                   <h3>$ ${price}</h3>
                     `+ "<button onclick= 'addProducttoCart("+(i++)+")'>Add</button>"+
                `</div>
          </div>`
    )
}).join('')


var bought_product=[];

function addProducttoCart(k){
    bought_product.push({...group[k]});
    client_product();

}

function client_product(k){
    let a=0;
    let sum=0;
    document.getElementById("counter").innerHTML=bought_product.length;
    if(bought_product.length == 0)
    {
        document.getElementById('emptyitem').innerHTML="Empty cart";
        document.getElementById("total").innerHTML="$ 0.00";
    } else{
        document.getElementById('emptyitem').innerHTML=bought_product.map((article)=>{
            
                 var{image,name,price}=article;
                 sum=sum+price;
                 document.getElementById("total").innerHTML="$"+sum;
                 return(
                    `<div class='bought-product'>
                         <div class='product-img'>
                             <img class="productimage" alt=${name} src=${image}>
                         </div>
                         <p>${name}</p>
                         <h3>$ ${price}</h3>`+
                         "<img alt=${name} onclick='removeProduct("+ (a++) + ")'><div>"

                 );
        }).join('');
    }
}

function removeProduct(k){
    // bought_product.pop({...group[k]});
    bought_product.splice(k,1);
    client_product();

}

