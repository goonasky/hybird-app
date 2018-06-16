$(function () {
    var count = 0;
    //点击一级菜单
    $(".content>li").click(function (e) {
        var i = $(this).index();
        $(this).children(".options").toggle();
        // $(".content .right .rt").toggle()
        $(this).find(".right .rt").toggle();
        $(this).find(".right .down").toggle();
        // $(".content .right .down").toggle();
        console.log($(this).children(".right .rt"));
        $(this).siblings().children(".options").hide();
        $(this).siblings().find(".right .rt").show();
        $(this).siblings().find(".right .down").hide();
    })
    //点击二级菜单，字体高亮
    $(".options li").on("click", function (e) {
        e.stopPropagation();
        $(this).children(".gou").show();
        $(this).siblings().children(".gou").hide();
        $(this).css({
            color: "green"
        }).siblings().css({
            color: "black"
        })

        var value = $(this).attr("data-list");
        $(this).parent().parent().find(".tittle").text(value);
    })
})