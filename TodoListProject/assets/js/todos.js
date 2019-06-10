var counter = 0;
// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});
//Click on X to delete Todo
$("ul").on("click", "span",function(event){
    //.parent() metodu tıklanilan span'in ebeveynini yok etmek icin yazildi
    //yani body, .container, ul, li, span diye giden bir sıralama var ve 
    //span'ın üstünde li olduğu için, li yok oluyor yani parent gidiyor
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    //Span'a yani X'e basilinca arkasindaki ornegin 
    //li ve ul gibi yerlere tıklanmasını engeller
    event.stopPropagation();
});
$("input[type='text']").on("keypress", function(event){
    if(event.which === 13){
        //grabbing new todo text from input
        var todoText = $(this).val();
        //create a new li and add to ul
        $("ul").append("<li><span id='delete'><img src='file:///home/guney/Downloads/trash-alt-regular.svg' width='25' height='25'></span>"+todoText+"</li>");
        $(this).val("");
    }
});
$("#sakla").on("click", function(){
    counter += 1;
    $("input[type='text']").fadeOut(300);
    $("#sakla").attr("src","file:///home/guney/Downloads/chevron-down-solid.svg");
    if(counter % 2 == 0){
        $("input[type='text']").fadeIn(300);
     $("#sakla").attr("src","file:///home/guney/Downloads/chevron-up-solid%20(1).svg");
    }
});
