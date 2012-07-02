 // Responder status
    $("a.reply-status, .cancel", ".statuses").live("click", function(e){
        $(this).parents("ul:first").next(".create-response").slideToggle();
        $(this).parents(".create-response:first").slideToggle();
        $(this).parents("ul:first").next(".create-response").find("textarea").focus();
        e.preventDefault();
    });