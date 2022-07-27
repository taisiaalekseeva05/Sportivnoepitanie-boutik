// $("#btn-test").click(function(e) {
//     $("#alert_info").toggle()

// });



let cartObj = {}
let userObj = {
    fio: "",
    email: "",
    tel_number: "",
    adress: ""
}

// let fotoObj = {}


// Add to Cart
$(document).on("click", ".add-to-cart", function () {
    let nowItemName = $(this).parent().children("h4").text()
    let nowItemPrice = $(this).parent().children("h6").text()
    // Добавляем новую переменную для хранения текущей картинки
    let nowItemImg = $(this).parent().children("img").attr("src")

    //  добавляем товар в корзину
    let nowNum = $(this).parent().children(".configurate-count").children("input").val()
    nowNum = Number(nowNum)

    // Ошибка при добавлении в корзину 
    if (nowNum == 0) {
        // console.log($("#alert_info").children("p").text())
        $("#alert_info").children("p").text("Укажите минимум один товар для добавления в корзину")
        $("#alert_info").show()

        let hideInterval = setInterval(() => {
            $("#alert_info").hide()
            clearInterval(hideInterval)
        }, 2000);
    } else {


        nowItemPrice = nowItemPrice.replace(" ₽", "")
        nowItemPrice = Number(nowItemPrice)

        if (cartObj[nowItemName] == undefined) {
            cartObj[nowItemName] = {
                name: nowItemName,
                price: nowItemPrice,
                count: nowNum,
                img: nowItemImg,
            }
        } else {
            cartObj[nowItemName]["count"] += 1
        }

        // console.log(cartObj)

        let countNow = 0
        let sumPriceNow = 0

        $.each(cartObj, function (indexInArray, valueOfElement) {
            countNow += valueOfElement["count"]

            sumPriceNow += (valueOfElement["count"] * valueOfElement["price"])
        });

        $("#prev-count").text(countNow)
        $("#prev-price").text(sumPriceNow)
    }




});
// Btn PLUS
$(document).on("click", ".btn-plus", function () {
    let nowNum = $(this).parent().children("input").val()
    $(this).parent().children("input").val(Number(nowNum) + 1)
});
// Btn MINUS
$(".btn-minus").on("click",  function () {
    let nowNum = $(this).parent().children("input").val()
    if (Number(nowNum) != 0) {
        $(this).parent().children("input").val(Number(nowNum) - 1)
    }
});


$(document).on("click", "#goto_screen_2", function () {
    let countInCart = Object.keys(cartObj).length
    if (countInCart != 0) {
        $("#screen_1").hide("slide")
        $("#screen_2").show("slide")
    } else {
        $("#alert_info").children("p").text("Для перехода к оформлению добавьте минимум 1 товар в корзину")
        $("#alert_info").show()

        let hideInterval = setInterval(() => {
            $("#alert_info").hide()
            clearInterval(hideInterval)
        }, 2000);
    }

});

$(document).on("click", "#goto_screen_1", function () {
    $("#screen_2").hide("slide")
    $("#screen_1").show("slide")
})


$(document).on("click", "#goto_screen_3", function () {
    // alert("mm")
    userObj["fio"] = $("#input_fio").val()
    userObj["email"] = $("#input_email").val()
    userObj["tel_number"] = $("#input_tel").val()
    userObj["adress"] = $("#input_adress").val()
    userObj["tk"] = $("#tk").val()

    // console.log(userObj)

    // Скрываем все ошибки
    $(".input_form").hide()
    // Перебираем все инпуты формы
    $.each($(".detail-pay").children("input"), function (indexInArray, valueOfElement) {
        // Проверяем пустой ли инпут
        if ($(valueOfElement).val() === "") {
            // Если инпут пустой, то делаем ошибку видимой
            $(valueOfElement).next().show()
        } else {
            // Если инпут НЕ пустой, то подсвечиваем инпут зелёной рамкой
            $(valueOfElement).css({ "border": "1px solid green" })
        }
    });

    // Проверяем видны ли ошибки на форме
    if ($(".input_form").is(':visible') == false) {
        // Если ошибок нет, то скрываем текущее окно и отображаем следующее
        $("#screen_2").hide("slide")
        $("#screen_3").show("slide")

        // очищаем текущий заказ перед заполнением товарами
        $("#table_product").html("")

        // обьявляем переменную для итоговой стоимости
        let totalPrice = 0

        // console.log(cartObj)
        $.each(cartObj, function (indexInArray, valueOfElement) {
            // console.log()
            let htmlBlock = `
            <tr>
               
            <td><img src="` + valueOfElement["img"] + `" alt="" height="100" width="100"></td>
                <td>` + valueOfElement["name"] + `</td>
                <td>` + valueOfElement["count"] + ` шт</td>
                <td>` + valueOfElement["price"] + `P</td>
                
            </tr>
            `
            // увеличиваем итоговую стоимость на стоимость позиции
            totalPraice += valueOfElement["price"] *  valueOfElement["count"]
            $("#table_product").append(htmlBlock)
           
        });
        // выводим итоговую стоимость в консоль
        console.log("totalPraice", totalPraice)
    }






    $("#fio").text($("#input_fio").val())
    $("#email").text($("#input_email").val())
    $("#tel").text($("#input_tel").val())
    $("#adress").text($("#input_adress").val())


})

$(document).on("click", ".btn-1", function () {
    // alert("vv")
    $("#screen_3").hide("slide")
    $("#screen_2").show("slide")
})