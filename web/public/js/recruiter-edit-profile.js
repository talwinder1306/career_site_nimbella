$(document).ready(function () {

    $('.selectpicker').selectpicker();

    var jobDescBlank = {
        "role": "",
        "description": "",
        "location": "",
        "qualification": "",
        "skillsNeeded": "",
        "status": "",
        "company": "",
        "experienceRange": "",
        "expectations": "",
        "postedOn": ""

    }

    function setName(fullName) {
        $("#recruiter-title").html(fullName)
        $("#full-name").attr("value", fullName)
    }

    function setEmail(email) {
        $("#recruiter-title-email").html(email)
        $("#recruiter-email").attr("value", email)
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
        $("#skills-req").selectpicker('val', skills)
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




    function setJobDescObjectToForm(i, jobDesc) {
        $('#job-' + i).find('.company').attr('value', jobDesc.company)
        $('#job-' + i).find('.role').attr('value', jobDesc.role)
        $('#job-' + i).find('.description').html(jobDesc.description)
        $('#job-' + i).find('.location').attr('value', jobDesc.location)
        $('#job-' + i).find('.min-experience').attr('value', jobDesc.experienceRange)
        $('#job-' + i).find('.qualification').attr('value', jobDesc.qualification)
        $('#job-' + i).find('.expectation').attr('value', jobDesc.expectations)
        setSkills(jobDesc.skillsNeeded)


    }

    function cloneJobDesc(id) {
        var jobDescClone = $('#job-desc-frame').clone()
        $(jobDescClone).attr('id', 'job-' + id)
        $(jobDescClone).appendTo(".job-desc-container")

        //clear values for the newly cloned work exp
        setJobDescObjectToForm(id, jobDescBlank)
        $(jobDescClone).removeClass('d-none')
    }

    function setJobDesc(jobDesc) {
        var i = 0
        for (i; i < jobDesc.length; i++) {
            if (i > 0) {
                cloneJobDesc(i)
            }
            setJobDescObjectToForm(i, jobDesc[i])

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
        setJobDesc(response.jobApplication)

    }

    function getName() {
        return $("#full-name").val()
    }

    function getBio() {
        return $("#bio").val()
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

    function initRecruiterEditProfile() {
        var email = $.sessionStorage.get("email")
        var session = $.sessionStorage.get("usersession")
        jQuery.ajax({
            url: window.prefix + '/recruiter/' + email + "?sessionKey=" + session,
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
            url: window.prefix + '/recruiter/',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                $('#details-alert-container').html("Your changes have been saved!")
                $('#details-alert-container').removeClass()
                $('#details-alert-container').addClass("alert alert-success")
                initrecruiterEditProfile()
            },
            error: function (response) {
                $('#details-alert-container').html(response.message)
                $('#details-alert-container').removeClass()
                $('#details-alert-container').addClass("alert alert-danger")
                initrecruiterEditProfile()
            }

        })
    })

    $(document).on('click', '#add-job', function (e) {
        e.preventDefault()
        var jobDesc = $('.job-container').find('.job-desc')
        var id = $(jobDesc[jobDesc.length - 1]).attr('id')
        var num = (id === undefined) ? [0, 0] : id.split('-')
        cloneJobDesc(Number(num[1]) + 1)
    })

    $(document).on('click', '#save-settings', function (e) {
        e.preventDefault()
        var fullName = $('#recruiter-title').html()
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

    initRecruiterEditProfile()

})
