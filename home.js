const product =[
    {id:0,image:'./images/bottle.png',name:'Bottle of Water',price: 0.25,discount:0,VAT:8/100,qty:0},
    {id:1,image:'./images/chip.png',name:'Chip',price: 2.40,discount:0,VAT:8/100,},
    {id:2,image:'./images/tv.png',name:'TV',price: 760.00,discount:0,VAT:22/100,},
    {id:3,image:'./images/coca.png',name:'CocaCola',price: 0.50,discount:0.10,VAT:18/100,},
    {id:4,image:'./images/choco.png',name:'Chocolate bar',price: 1.25,discount:0,VAT:22/100,},
    {id:5,image:'./images/soap.jpeg',name:'Hand soap',price: 3.78,discount:0,VAT:8/100,},
    {id:6,image:'./images/fish.png',name:'Fish /kg',price: 8.30,discount:0,VAT:18/100,},
    {id:7,image:'./images/humus.jpg',name:'Humus /package',price: 2.66,discount:0,VAT:18/100,},
    {id:8,image:'./images/white-wine.png',name:'White Wine',price:9.20,discount:0.02,VAT:18/100,},
    {id:9,image:'./images/banana.png',name:'Banana /kg',price: 1.25,discount:0,VAT:22/100,},
    {id:10,image:'./images/wine.png',name:'Wine',price: 9.78,discount:0,VAT:22/100,},
    {id:11,image:'./images/oil.png',name:'Oil /l',price: 8.30,discount:0,VAT:18/100,},
    {id:12,image:'./images/cigarette.png',name:'Cigarette/package',price: 5.46,discount:0,VAT:22/100,},
    {id:13,image:'./images/cookie.png',name:'Cookie /pack',price: 1.34,discount:0,VAT:8/100,},
    {id:14,image:'./images/yogurt.png',name:'Yogurt',price: 0.66,discount:0,VAT:18/100,},
    {id:15,image:'./images/bleach.png',name:'Bleach',price: 1.23,discount:0,VAT:22/100,},
    {id:16,image:'./images/napkin.png',name:'Napkin',price: 0.21,discount:0,VAT:8/100,},
    {id:17,image:'./images/eggs.png',name:'Egg',price: 0.16,discount:0,VAT:18/100,},
    {id:18,image:'./images/plastic.jpg',name:'Plastic bag',price: 0.05,discount:0,VAT:18/100,},
    {id:19,image:'./images/folie.jpg',name:'Alumin foil',price: 1.12,discount:0,VAT:8/100,},
    {id:20,image:'./images/razor.png',name:'Razor',price: 8.10,discount:0,VAT:8/100,},
    {id:21,image:'./images/lot.png',name:'Lotion',price: 12.00,discount:0,VAT:22/100,}
];

var invoices = [];

if (window.location.href.indexOf('home.html') > -1) {
    window.onload = (event) => {
        localStorage.clear();
      };
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
                       <h2>$ ${price.toFixed(2)}</h2>`+
                       "<input class='quantity' placeholder='QTY' type='number' min='1' name='' id='"+(k++)+"'>"+ 
                       "<button onclick='addtocart("+(i++)+")'>Add</button>"+
                    `</div>
              </div>`
        )
    }).join('')
    
    var cart=[];
    
    function addtocart(i){
        cart.push({...categories[i]});
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
    
    
    
    
    function displaycart() {
        let j = 0, subTotal = 0, general_vat = 0;
    
        // document.getElementById("count").innerHTML = cart.length;
    
        if (cart.length !== 0){
            document.getElementById('cartItem').innerHTML = cart.map((items) => {
             
           
                var { id,image, name, price, discount, VAT,qty} = items;
               
                qty= document.getElementById(id).value;
                items.qty=parseInt(qty);
    
                subTotal = subTotal + (qty*(price-discount));
                general_vat = general_vat + (qty*(price-discount) * (VAT));
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
                             <h2 style="font-size:12px;">${qty} X $${price}</h2>` +
                    "<img src='./images/remove-icon.png' class='remove-bttn' onclick='delElement(" + (j++) + ")'></img></div>"
    
                );
                
            
            }).join('');

            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}
else {
    window.onload = function() {
        let invoice_container = document.getElementById("invoice__container");
        const cartItems = JSON.parse(localStorage.getItem('cart'));

        let data = calculateInvoice(cartItems);
        let invoices = data.invoices;
        // <h3>Order 1</h3> <h4> Sub:${data.subtotal}</h4> <h4> VAT:${data.VAT}</h4> <h4> Total: ${data.total}</h4>
        invoice_container.innerHTML=invoices.map((invoice, index)=>
        `
        
        <table>
            <tr>
                <th> Invoice ${index+1}</th>
            </tr>
            <tr>
                <th>Description</th>
                <th>QTY</th>
                <th>Price</th>
                <th>Discount</th>
                <th>VAT</th>
                <th>Total</th>
            </tr>
        ${invoice.map(item => 
            `<tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${item.price}</td>
                <td>${data.discount}</td>
                <td>${data.VAT}</td>
                <td>${item.total}</td>
            </tr>`
        )}
        <tr>
            <td>Subtotal</td>
            <td>${(invoice.reduce((sub_total, obj) => obj.price*obj.qty + sub_total,0))}</td>
        </tr>
        <tr>
            <td>VAT</td>
            <td>${(invoice.reduce((total_vat, obj) => obj.price*obj.qty * obj.VAT + total_vat,0))}</td>
        </tr>
        <tr>
            <td>Total</td>
            <td>${(invoice.reduce((total, obj) => ((obj.price*obj.qty * obj.VAT) + (obj.price*obj.qty)) + total,0))}</td>
        </tr>
        </table>` 
        ).join('')
      }
}

function calculateInvoice(cart) {
    subtotal = 0;
    let VAT = 0
    let total = 0;
    let discount = 0;
    let invoices = [];
    var j = 0;
    console.log("cART",cart);
    
    for (let i=0; i<cart.length; i++) {
        if(cart[i]['qty']>50 && cart[i]['price']<=500) {
            cart.push({"id":cart[i]['id'],"name":cart[i]['name'], "image":cart[i]['image'], "qty":cart[i]['qty']-50, "price":cart[i]['price'], "VAT": cart[i]['VAT'], 'discount': cart[i]['discount']})
            cart[i]['qty'] = 50;
        }
        let total = cart[i]['qty']*cart[i]['price'];
        cart[i]['total'] = `${total.toFixed(2)} + ${(total*cart[i]['VAT']).toFixed(2)} = ${(total + total*cart[i]['VAT']).toFixed(2)}`
    }
    
    for(let i=0; i<cart.length; i++) {
        total += cart[i]['price']
        VAT += cart[i]['VAT']
        discount += cart[i]['discount']
        if (cart[i]['price']>500) {
            if (cart[i]['qty']>1) {
                var quantity = cart[i]['qty'];
                for (let z = 0; z < quantity; z++) {
                    if (invoices.length>0) {
                        j++   
                    }
                    invoices[j] = new Array(cart[i]);
                    cart[i]['qty'] = 1;
                    let total = cart[i]['qty']*cart[i]['price'];
                    cart[i]['total'] = `${total.toFixed(2)} + ${(total*cart[i]['VAT']).toFixed(2)} = ${(total + total*cart[i]['VAT']).toFixed(2)}`
                }
            }
            else {
                if (invoices.length>0) {
                    j++
                }
                invoices[j] = new Array(cart[i]);
                j++
            }
            
        }
        else {
            let added = false;
            if (invoices.length<1) {
                invoices[j] = new Array(cart[i])
                added = true;
            }
            for (j = 0; j < invoices.length; j++) {
                if (invoices[j].reduce((total, obj) => obj.price*obj.qty + total,0)<=500 && (invoices[j].reduce((total, obj) => obj.price*obj.qty + total,0) + cart[i]['price']*cart[i]['qty']) <=500   && !(invoices[j].some(e => e.name === cart[i]['name']))) {

                    invoices[j].push(cart[i]);
                    added = true;
                    break;
                }
            }
            if (!added) {
                invoices[invoices.length] = new Array(cart[i]);
    
            }
        }
    
    }
    // total = total.toFixed(2);
    // VAT = VAT.toFixed(2);
    // discount = discount.toFixed(2);
    // subtotal = (total-VAT-discount).toFixed(2);
    return {invoices, total, VAT, discount, subtotal};
}







