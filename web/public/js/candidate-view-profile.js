$(document).ready(function () {
    var workExpBlank = {
        "startDate": "",
        "endDate": "",
        "jobTitle": "",
        "description": "",
        "company": ""
    }

    var educationBlank = {
        "startDate": "",
        "endDate": "",
        "areaOfStudy": "",
        "university": ""
    }

    function setName(fullName) {
        $("#candidate-title").html(fullName)
        $("#full-name").attr("value", fullName)
    }

    function setEmail(email) {
        $("#candidate-title-email").html(email)
        $("#candidate-email").attr("value", email)
    }

    function setBio(bio) {
        $("#bio").html(bio)
    }

    function setCurrentCTC(currentCTC) {
        $("#current-ctc").attr("value", currentCTC)
    }

    function setExpectedCTC(expectedCTC) {
        $("#expected-ctc").attr("value", expectedCTC)
    }

    function setNoticePeriod(noticePeriod) {
        $("#notice-period").attr("value", noticePeriod)
    }

    function setYearsOfExperience(yearsOfExperience) {
        $("#exp-years").attr("value", yearsOfExperience)
    }

    function setSkills(skills) {
        $("#skills").selectpicker('val', skills)
    }

    function setLanguages(languages) {
        $("#languages").selectpicker('val', languages)
    }

    function getConvertedDate(dateToBeConverted) {
        if (dateToBeConverted === '')
            return ''

        var date = new Date(dateToBeConverted)
        var d = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        return d;
    }

    function setWorkExpObjectToForm(i, workExp) {
        $('#exp-' + i).find('.company').attr('value', workExp.company)
        $('#exp-' + i).find('.job-title').attr('value', workExp.jobTitle)
        $('#exp-' + i).find('.description').html(workExp.description)
        $('#exp-' + i).find('.start-date').attr('value', getConvertedDate(workExp.startDate))
        $('#exp-' + i).find('.end-date').attr('value', getConvertedDate(workExp.endDate))
    }

    function cloneWorkExp(id) {
        var workExpClone = $('.work-exp').clone()
        $(workExpClone).attr('id', 'exp-' + id)
        $(workExpClone).appendTo(".work-exp-container")

        //clear values for the newly cloned work exp
        setWorkExpObjectToForm(id, workExpBlank)

    }

    function setWorkExp(workExp) {
        var i = 0
        for (i; i < workExp.length; i++) {
            if (i > 0) {
                cloneWorkExp(i)
            }
            setWorkExpObjectToForm(i, workExp[i])

        }
    }

    function setEducationObjectToForm(i, education) {
        $('#edu-' + i).find('.study').attr('value', education.areaOfStudy)
        $('#edu-' + i).find('.university').attr('value', education.university)
        $('#edu-' + i).find('.edu-start-date').attr('value', getConvertedDate(education.startDate))
        $('#edu-' + i).find('.edu-end-date').attr('value', getConvertedDate(education.endDate))
    }

    function cloneEducation(id) {
        var educationClone = $('.education').clone()
        $(educationClone).attr('id', 'edu-' + id)
        $(educationClone).appendTo(".education-container")

        //clear values for the newly cloned education
        setEducationObjectToForm(id, educationBlank)

    }

    function setEducation(education) {
        var i = 0
        for (i; i < education.length; i++) {
            if (i > 0) {
                cloneEducation(i)
            }
            setEducationObjectToForm(i, education[i])

        }
    }

    function setOtherProfiles(otherProfiles) {
        $('#hackerrank').attr('value', otherProfiles.hackerrank)
        $('#github').attr('value', otherProfiles.github)
        $('#stackoverflow').attr('value', otherProfiles.stackOverflow)
    }

    function setProfileRating(profileRating) {
        if (profileRating === undefined || profileRating === null || profileRating.length === 0 || profileRating === 0.0) {
            $('#rating-message').text("Your profile rating will be available soon!")
            $('#rating-placeholder').addClass('badge-warning')
            $('#rating').attr('value', '0.0')
        } else {
            $('#rating-message').text("Profile rating = " + profileRating)
            $('#rating-placeholder').addClass('badge-success')
            $('#rating').attr('value', profileRating)
            $('#profile-rating-header').html('<small>Profile rating = ' + profileRating + '</small>')
        }
    }

    function setFormValues(response) {
        setName(response.fullName)
        setBio(response.bio)
        setCurrentCTC(response.currentCTC)
        setExpectedCTC(response.expectedCTC)
        setNoticePeriod(response.noticePeriod)
        setYearsOfExperience(response.yearsOfExperience)
        setSkills(response.skills)
        setLanguages(response.languages)
        setWorkExp(response.workExperience)
        setEducation(response.education)
        setOtherProfiles(response.otherProfiles)
        setProfileRating(response.profileRating)
    }

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    function initCandidateViewProfile() {
        var email = $.urlParam("email")
        jQuery.ajax({
            url: window.prefix + '/candidate/' + email,
            method: 'GET',
            contentType: 'application/json',
            success: function (response) {
                setEmail(email)
                if (response != null) {
                    setFormValues(response)
                }

            },
            error: function (response) {
                $('#details-alert-container').html(response.message)
                $('#details-alert-container').removeClass()
                $('#details-alert-container').addClass('alert alert-danger')
            }

        })
    }

    initCandidateViewProfile()

})