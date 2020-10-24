$(document).ready(function () {

    $('#skills').selectpicker();
    $('#languages').selectpicker();

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

    function setCurrentJob(element, endDate) {
        $(element).find('.current-job').prop('checked', true);
        $(element).find('.end-date').attr('type', 'hidden');
        $(element).find('.end-date').attr('value', endDate);
        $(element).hide();
    }

    function setWExpEndDateonForm(workExp, i, endDate) {
        var d = new Date();
        if (new Date(workExp.endDate) > d) {
            setCurrentJob($('#exp-' + i).find('.end-date-col'), endDate);
        }
    }


    function setWorkExpObjectToForm(i, workExp) {
        $('#exp-' + i).find('.company').attr('value', workExp.company)
        $('#exp-' + i).find('.job-title').attr('value', workExp.jobTitle)
        $('#exp-' + i).find('.description').html(workExp.description)
        $('#exp-' + i).find('.start-date').attr('value', getConvertedDate(workExp.startDate))
        var endDate = getConvertedDate(workExp.endDate)
        setWExpEndDateonForm(workExp, i, endDate);
    }

    function cloneWorkExp(id) {
        var workExpClone = $('#work-exp-frame').clone()
        $(workExpClone).attr('id', 'exp-' + id)
        $(workExpClone).appendTo(".work-exp-container")

        //clear values for the newly cloned work exp
        setWorkExpObjectToForm(id, workExpBlank)
        $(workExpClone).removeClass('d-none')
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

    function getName() {
        return $("#full-name").val()
    }

    function getBio() {
        return $("#bio").val()
    }

    function getCurrentCTC() {
        return $("#current-ctc").val()
    }

    function getExpectedCTC() {
        return $("#expected-ctc").val()
    }

    function getNoticePeriod() {
        return $("#notice-period").val()
    }

    function getYearsOfExperience() {
        return $("#exp-years").val()
    }

    function getSkills() {
        return $("#skills").val()
    }

    function getLanguages() {
        return $("#languages").val()
    }

    function setDateFormat(date) {
        var d = new Date(date.split("/").reverse().join("-"))
        var dd = ("0" + (d.getDate())).slice(-2)
        var mm = ("0" + (d.getMonth() + 1)).slice(-2)
        var yy = d.getFullYear()

        return yy + "-" + mm + "-" + dd
    }

    function getWorkExpObjectFromForm(workExpFormObj, workExp) {
        workExp = {}
        var id = $(workExpFormObj).attr('id')
        workExp.company = $('#' + id).find('.company').val()
        workExp.jobTitle = $('#' + id).find('.job-title').val()
        workExp.description = $('#' + id).find('.description').val()
        workExp.startDate = setDateFormat($('#' + id).find('.start-date').val())
        workExp.endDate = setDateFormat($('#' + id).find('.end-date').val())
        return workExp
    }

    function getWorkExp() {
        var workExps = []
        var count = 0
        var workExpFormObj = $('.work-exp-container').find('.work-exp')
        for (var i = 0; i < workExpFormObj.length; i++) {
            if ($(workExpFormObj[i]).attr('id') === 'work-exp-frame') {
                continue
            }
            workExps[count] = getWorkExpObjectFromForm(workExpFormObj[i], workExps[i])
            count++
        }
        return workExps
    }

    function getEducationObjectFromForm(educationFormObj, education) {
        education = {}
        var id = $(educationFormObj).attr('id')
        education.areaOfStudy = $('#' + id).find('.study').val()
        education.university = $('#' + id).find('.university').val()
        education.startDate = setDateFormat($('#' + id).find('.edu-start-date').val())
        education.endDate = setDateFormat($('#' + id).find('.edu-end-date').val())

        return education
    }

    function getEducation() {
        var educations = []
        var i = 0
        var educationFormObj = $('.education-container').find('.education')
        for (i; i < educationFormObj.length; i++) {
            educations[i] = getEducationObjectFromForm(educationFormObj[i], educations[i])
        }
        return educations
    }

    function getOtherProfiles() {
        var otherProfiles = {}
        otherProfiles.hackerrank = $('#hackerrank').val()
        otherProfiles.github = $('#github').val()
        otherProfiles.stackOverflow = $('#stackoverflow').val()
        return otherProfiles
    }

    function getProfileRating() {
        return ($('#rating').val() === undefined || $('#rating').val().length === 0) ? 0.0 : $('#rating').val()
    }

    function getDataFromForm(data) {
        data.fullName = getName()
        data.bio = getBio()
        data.currentCTC = getCurrentCTC()
        data.expectedCTC = getExpectedCTC()
        data.noticePeriod = getNoticePeriod()
        data.yearsOfExperience = getYearsOfExperience()
        data.skills = getSkills()
        data.languages = getLanguages()
        data.workExperience = getWorkExp()
        data.education = getEducation()
        data.otherProfiles = getOtherProfiles()
        data.profileRating = getProfileRating()
        return data
    }

    function initCandidateEditProfile() {
        var email = $.sessionStorage.get("email")
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

    $(document).on('click', '#save-details', function (e) {
        e.preventDefault()
        var sessionKey = $.sessionStorage.get('usersession')
        var email = $.sessionStorage.get('email')
        var data = { "sessionKey": sessionKey, "email": email }
        getDataFromForm(data)
        jQuery.ajax({
            url: window.prefix + '/candidate/',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                $('#details-alert-container').html("Your changes have been saved!")
                $('#details-alert-container').removeClass()
                $('#details-alert-container').addClass("alert alert-success")
                initCandidateEditProfile()
            },
            error: function (response) {
                $('#details-alert-container').html(response.message)
                $('#details-alert-container').removeClass()
                $('#details-alert-container').addClass("alert alert-danger")
                initCandidateEditProfile()
            }

        })
    })

    $(document).on('click', '#add-work-exp', function (e) {
        e.preventDefault()
        var workExps = $('.work-exp-container').find('.work-exp')
        var id = $(workExps[workExps.length - 1]).attr('id')
        var num = id.split('-')
        cloneWorkExp(Number(num[1]) + 1)
    })

    $(document).on('click', '#add-education', function (e) {
        e.preventDefault()
        var educations = $('.education-container').find('.education')
        var id = $(educations[educations.length - 1]).attr('id')
        var num = id.split('-')
        cloneEducation(Number(num[1]) + 1)
    })

    $(document).on('click', '.current-job', function () {
        var dateRow = $(this).parent().parent()
        setCurrentJob($(dateRow).find('.end-date-col'), '2999-12-31')
    })

    $(document).on('click', '#save-settings', function (e) {
        e.preventDefault()
        var fullName = $('#candidate-title').html()
        var email = $.sessionStorage.get("email")
        var userType = $.sessionStorage.get("userType")
        var oldPassword = $('#current-pwd').val()
        var newPassword = $('#new-pwd').val()
        var confirmPassword = $('#confirm-new-pwd').val()

        if (newPassword !== confirmPassword) {
            $('#settings-alert-container').html("New Password and Confirm Password should be same.")
            $('#settings-alert-container').removeClass()
            $('#settings-alert-container').addClass('alert alert-danger')
            return
        }

        var data = {
            'fullName': fullName,
            'email': email,
            'oldPassword': oldPassword,
            'password': newPassword,
            'userType': userType
        }
        jQuery.ajax({
            url: window.prefix + '/user/updatePassword',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                $('#settings-alert-container').html("Your changes have been saved!")
                $('#settings-alert-container').removeClass()
                $('#settings-alert-container').addClass('alert alert-success')
                $('#current-pwd').attr('value', '')
                $('#new-pwd').attr('value', '')
                $('#confirm-new-pwd').attr('value', '')
            },
            error: function (response) {
                $('#settings-alert-container').html(response.message)
                $('#settings-alert-container').removeClass()
                $('#settings-alert-container').addClass('alert alert-danger')
            }

        })
    })

    initCandidateEditProfile()

})
