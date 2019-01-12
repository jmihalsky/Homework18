$("#addNote").on("click",function(event){
    event.preventDefault();

    var id = $(this).attr("data-id");
    console.log(id);

    var note_info = {
        note_body: $("#note").val().trim()
    };

    console.log(note_info);

    $.ajax("/article_details/" + id,{
        type: "POST",
        data: note_info
    }).then(function() {
        location.reload();
    });
});