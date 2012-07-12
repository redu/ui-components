$(function() {
  $('.table-with-check-list input[type="checkbox"]').each(function() {
    var checkbox = $(this),
        row = checkbox.parents('tr')

    checkbox.on('change', function() {
      if (checkbox.is(':checked')) {
        row.addClass("inbox-message-selected")
      } else {
        row.removeClass('inbox-message-selected')
      }
    })
  })
})