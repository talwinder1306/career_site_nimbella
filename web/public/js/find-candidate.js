$(document).ready(function () {

    function setName(element, fullName, email) {
        var nameEle = $(element).find('.search-result-item-heading > a')
        $(nameEle).html(fullName)
        $(nameEle).attr('href', window.prefix + '/candidate-view-profile.html?email=' + email)
        $(element).find('.learn-more').attr('href', window.prefix + '/candidate-view-profile.html?email=' + email)
    }

    function setBio(element, bio) {
        $(element).find('.description').html(bio)
    }

    function setProfileRating(element, profileRating) {
        if (profileRating === undefined || profileRating === null || profileRating.length === 0) {
            $(element).find('.profile-rating').html("In Process")
            return
        }

        $(element).find('.profile-rating').html(profileRating)
        if (profileRating >= 8) {
            $(element).find('.badge').removeClass('d-none')
        }
    }

    function setSearchFormValues(response) {

        response.forEach(function (item, index) {
            var searchResultsBox = $('#search-results-frame').clone()
            $(searchResultsBox).attr('id', 'result-' + index)
            $(searchResultsBox).appendTo("#results-container")

            setName(searchResultsBox, item.fullName, item.email)
            setBio(searchResultsBox, item.bio)
            setProfileRating(searchResultsBox, item.profileRating)

            $(searchResultsBox).removeClass('d-none')
        })

    }

    function initCandidateSearch() {
        jQuery.ajax({
            url: window.prefix + '/candidate',
            method: 'GET',
            contentType: 'application/json',
            success: function (response) {
                if (response != null) {
                    $('.search-results-count').html('<b>' + response.length + '</b> Candidate Profiles found')
                    setSearchFormValues(response)
                }
            },
            error: function (response) {
                alert("fail")
            }

        })
    }

    initCandidateSearch()
})