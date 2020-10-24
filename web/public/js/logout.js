window.prefix = ''

$(function () {
    $(document).on('click', '#logout-btn', function () {
        $.sessionStorage.removeAll()
        var url = window.prefix + '/index.html'
        $(location).attr('href', url)
    })
})