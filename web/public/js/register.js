$(document).ready(function () {

    $('#candidate-sign-up-btn').on('click', function (e) {
        e.preventDefault()
        var email = $('#candidate-email').val()
        var password = $('#candidate-password').val()
        var fullName = $('#candidate-name').val()

        var data = {
            'fullName': fullName,
            'email': email,
            'password': password,
            'userType': 'C'
        }

        jQuery.ajax({
            url: window.prefix + '/user/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $.sessionStorage.set("email", email)
                $.sessionStorage.set("userType", "C")
                $.sessionStorage.set("usersession", response.sessionKey)
                var url = "candidate-home.html";
                $(location).attr('href', url);
            },
            error: function (response) {
                alert(response)
            }

        })

    })

    $('#recruiter-sign-up-btn').on('click', function (e) {
        e.preventDefault()
        var email = $('#recruiter-email').val()
        var password = $('#recruiter-password').val()
        var fullName = $('#recruiter-name').val()

        var data = {
            'fullName': fullName,
            'email': email,
            'password': password,
            'userType': 'R'
        }

        jQuery.ajax({
            url: window.prefix + '/user/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $.sessionStorage.set("email", email)
                $.sessionStorage.set("userType", "R")
                $.sessionStorage.set("usersession", response.sessionKey)
                var url = "recruiter-home.html";
                $(location).attr('href', url);
            },
            error: function (response) {
                alert(response)
            }

        })
    })
})
