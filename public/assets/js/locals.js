$("#addNote").on("click",function(event){
    event.preventDefault();

    var id = $("#article").attr("data-id");
    console.log(id);

    var note_info = {
        note_body: $("#note").val().trim()
    };

    console.log(note_info);
    console.log("/article_details/" + id);

    $.ajax("/article_details/" + id,{
        type: "POST",
        data: note_info
    }).then(function() {
        window.location.reload();
    });
});

$(".btn-delete").on("click", function(event){
    event.preventDefault();

    var note_id = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: "/article_details/" + note_id
    }).then(function(){
        window.location.reload();
    });
});

$("#art_home").on("click",function(event){
    event.preventDefault();
    window.location = "/";
})

$("#scraper").on("click",function(event){
    event.preventDefault();
    window.location = "/scrape";
})