/**
 * Created by Shivam on 15-07-2017.
 */

var x  = function display(data) {
    $('.sidebar-nav').html('');
    var list = $('.sidebar-nav');
    var y = data;
    console.log(y);
    if(y.length!==0){
        list.append('<li class="list">' + "Book Name" + '<span class="list2 p">' + "Price" + '</span>' + '</li>');
        for(var  i=0;i<y.length;i++){
            var n = y[i].name;
            list.append('<li class="list">' + y[i].name + '<span class="list2">' + "Rs " + y[i].price +
                '<a id="' + n + '" onclick="del(this)">' + '<span class="glyphicon glyphicon-trash cross"></span>' +  '</a>' +
                '</span>' + '</li>'
                // '<li class="order">' + '<button type="button" class="btn btn-success">' + "Place Order" + '</button></li>'
            );
        }
    }
    else{
        list.append('<li class="list">' + "The Cart is Empty" + '</li>');
    }


};

$(document).ready(function() {

    var title = $('#name');
    var description = $('#description');
    var price = $('#price');
    var row = $('.row');
    var book = $('.books');
    console.log($('.mail')[0].defaultValue);
    console.log($('.mail'));





    $("#menu-toggle").click( function (){
        var flag = true;
        // e.preventDefault();
        $("#wrapper").toggleClass("menuDisplayed");
        if(this.value == ">" ){
            this.value = "<"
        }
        else{
            flag = false;
            this.value = ">"
        }
        if(flag){
            getter(x);
        }
        

    });

    $(".get-started").click(function() {
        $('html,body').animate({
                scrollTop: $(".form-control").offset().top},
            3000);
    });


    $(".order-show").click(function () {
        var check = localStorage.getItem('main');
        if(check==='false'){
            console.log("ok");
            $('.mail')[0].value = "Orderd Placed";
        }
        $(".l").html('');
        var output = $(".l");
        getter(function (data) {
            var y = data;
            if(y!==null){
                var sum = 0;
                // output.append('<input type=text class="address" value="Enter Delivery Address"');
                output.append('<li class="output-name">' + "Book Name" + '<span class="output-price">' + "Price" + '</span>' + '</li>');
                output.append('<li class="output-name partition">' + "________________________" + '<span class="output-price">' + '' + '</span>' + '</li>' + '<br>');
                for(var i=0;i<y.length;i++){
                    sum = sum + y[i].price;
                    output.append('<li class="output-name">' + y[i].name + '<span class="output-price">' + y[i].price + '</span>' + '</li>');
                }
                console.log(sum);
                output.append('<br>' + '<li class="output-name partition">' + "________________________" + '<span class="output-price">' + '' + '</span>' + '</li>');
                output.append('<li class="output-name">' + "Total" + '<span class="output-price">' + sum + '</span>' + '</li>');
            }
        })
    });

    $('.mail').click(function () {
        console.log(this);
        if(this.value === "Place Order") {
            console.log($('.address').val());
            if ($('.address').val() === '') {
                alert("Enter address first");
            }
            else {
                if (this.value === "Place Order") {
                    this.value = "Order Placed";
                    localStorage.setItem('main', 'false');
                }
                ;
                $.post('/cart/all', function (data) {
                    console.log(data);
                    var str = '{address: ' + $('.address').val() + '}  ';
                    for (var i = 0; i < data.length; i++) {
                        str = str + '{name: ' + data[i].name + ',' + 'price: ' + data[i].price + '}  ';
                    }
                    console.log(str);
                    $.post('/cart/email', {data: str}, function (data) {
                        console.log(data);
                    })
                })
            }
        }
        else{
            alert("Order has already been placed");
        }

    })



     $("#find").click(function () {
        var inp = $('#input').val();
        var URL = 'https://www.googleapis.com/books/v1/volumes?q=' + inp;
        $.ajax({
            url:URL,
            datatype:'jsonp',
            success:function (result) {
                if(result === null){

                }
                else{
                    var image;
                    var des;
                    var cost;
                    $('.new').html('');
                console.log(result);
                // console.log(result.items);
                // console.log(result.items[0].volumeInfo.title);
                // console.log(result.items[0].volumeInfo.description);
                // console.log(result.items[0].volumeInfo.averageRating);
                // console.log(result.items[0].volumeInfo.previewLink);
                // console.log(result.items[0].volumeInfo.imageLinks.thumbnail);
                // console.log(result.items[0].saleInfo.listPrice.amount);
                for(var i =0;i<result.items.length;i++){
                    if((result.items[i].saleInfo).hasOwnProperty('listPrice')){
                        cost = result.items[i].saleInfo.listPrice.amount;
                    }
                    else{
                        cost = 500;
                    }

                    if((result.items[i].volumeInfo).hasOwnProperty('description')){
                        des = result.items[i].volumeInfo.description;
                    }
                    else{
                        des = "Not Available";
                    }

                    if(result.items[i].volumeInfo.hasOwnProperty('imageLinks')){
                        image = result.items[i].volumeInfo.imageLinks.thumbnail
                    }
                    else{
                        image = '';
                    }

                    var obj = {
                        "price":cost,
                        "name":result.items[i].volumeInfo.title
                    };
                    book.append(
                        '<div class=col-md-8>'  + '<div class="main">' +
                        '<h1 id="name">' + result.items[i].volumeInfo.title + '</h1>' +
                        '<div id="description">' + '<img class="picture" src="' + image + '">' +
                        '<div class="data">' + '<div class="describe">Description :-</div>' + '<br>' + des + '</div>' + '</div>' + '</div>' + '</div>' +

                        '<div class="col-md-4 four">' +
                        '<li class="right">' + "Author :- " + result.items[i].volumeInfo.authors[0] + '</li>' +
                        '<li class="right">' + "Page Count :- " + result.items[i].volumeInfo.pageCount + '</li>' +
                        '<li class="right">' + '<a href="' + result.items[i].volumeInfo.previewLink + '">More About Book</a>' + '</li>' +
                        '<li class="right">' + "Price :- " + cost + '</li>' +
                        '<li class="right">' + '<button onclick="adder(this)" type="button" class="btn btn-success shortList" ' +
                                                        'id="' + obj.price + " " + obj.name +
                                                        '">' + "Short List" + '</button>' + '</li>' +
                        '</div>'


                    );
                }

                // $('html,body').animate({
                //         scrollTop: $(".main").offset().top},
                //     3000);
                }
            },
            complete:function(data) {
                console.log("HI");
                $('html, body').animate({
                    scrollTop: $(".main").offset().top
                }, 2000);
            }
        });
    })
});



function adder(ele){
    var strPrice = "";
    var strName = "";
    console.log(ele.id);
    for(var i=0;i<ele.id.length;i++){
        if(ele.id.charAt(i)===" "){
            break;
        }else{
            strPrice+=ele.id.charAt(i);
        }
    }
    strName = ele.id.slice(i+1,ele.id.length);
    console.log(strName);
    console.log(strPrice,i);

    $.post('cart/insert',{name:strName,price:strPrice,quantity:1},function (data) {
        console.log(data);
        getter(x);
    })
}

function getter(cb) {
    $.post('/cart/all',function (data) {
        cb(data);
    })
}

function del(ele) {
    console.log(ele.id);
    $.post('/cart/del',{name:ele.id},function (data) {
      console.log(data);
      getter(x);
    })
}

