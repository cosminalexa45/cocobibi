var VI_GoogleRecaptchaJsLoaded = false;

function WaitUntil(predicate, callback, checkInterval) {
    if (checkInterval === undefined) {
        checkInterval = 100;
    }

    const interval = setInterval(() => {
        if (predicate()) {
            clearInterval(interval);
            callback();
        }
    }, checkInterval);
}

document.addEventListener("DOMContentLoaded", () => {
    SetPlaceholders();
    DeleteAndBetweendMotherFatherIFNeedsForGroom();
    DeleteAndBetweendMotherFatherIFNeedsForBride();
    AdjustTopOnBannerVisibility();
});

function AdjustTopOnBannerVisibility() {
    const pBanner = document.getElementById('purchase-reminder-banner');
    if (pBanner && pBanner.style.display !== 'none') {
        const secondContainer = document.getElementById('second-content');
        const bannerHeight = pBanner.offsetHeight; // Get the height of the banner
        secondContainer.style.marginBottom = `calc(2rem + ${bannerHeight}px)`;
        secondContainer.style.marginTop = `calc(0rem + ${bannerHeight/2}px)`;
    }
}    

function getSafeValue(key) {
    if (EventParams[key] === null || EventParams[key] === undefined) {
        return EventParamsDefault[key];
    }
    return EventParams[key];
}

function SetPlaceholders() {
    function isStringNullOrEmpty(str) {
        return !str;
    }

    function hideGodparents() {
        var gpp = document.getElementById("godparents-section");
        if(gpp !== null && gpp != undefined){
            gpp.style.display = 'none';
        }

        var gppa = document.getElementById("godparents-section-and");
        if(gppa !== null && gppa != undefined){
            gppa.style.display = 'none';
        }
    }


    function hasMultipleGodParentsPairs() {
        return document.getElementById('godparents-pairs') != null;
    }

    function isEmptyOrWhitespace(str) {
        return !str || str.trim().length === 0;
    }

    function isEmptyValue(key) {
        var val = getSafeValue(key);
        if (val === null || val === undefined) {
            return true;
        }

        if (isEmptyOrWhitespace(val)) {
            return true;
        }

        return false;
    }

    function setPointsIfNullValue(element) {
        if (element === null || element === undefined) {
            return;
        }

        if (element.innerHTML === null || element.innerHTML === "" || isEmptyOrWhitespace(element.innerHTML)) {
            element.innerHTML = '...';
        }
    }

    function isEmptyElementInnerHtmlValue(element) {
        if (element === null || element === undefined || element.innerHTML === undefined) {
            return false;
        }

        if (element.innerHTML === null || element.innerHTML === "" || isEmptyOrWhitespace(element.innerHTML)) {
            return true;
        }

        return false;
    }

    const elementIdToValueMap = {
        
        'invitation-title': (element) => {

            var evtName = getSafeValue('eventName');
            if (evtName === null || evtName === undefined || evtName === '' || evtName.trim() === '') {

                var bride = getSafeValue('brideFirstName');
                var groom = getSafeValue('groomFirstName');
            
                if (bride === null || bride === undefined || bride === '' || bride.trim() === '') {
                    element.innerHTML = `Invitație Nuntă - vainvit.ro`;
                    return;
                }
            
                if (groom === null || groom === undefined || groom === '' || groom.trim() === '') {
                    element.innerHTML = `Invitație Nuntă - vainvit.ro`;
                    return;
                }
            
                element.innerHTML = `Invitație - ${getSafeValue('brideFirstName')} & ${getSafeValue('groomFirstName')} - vainvit.ro`;
            
            } else {
            
                var bride = getSafeValue('brideFirstName');
                var groom = getSafeValue('groomFirstName');
            
                var eventWords = evtName.trim().split(/\s+/);
            
                if (bride === null || bride === undefined || bride === '' || bride.trim() === '') {
                    if (eventWords.length > 5) {
                        element.innerHTML = `Invitație Nuntă - vainvit.ro`;
                    }else{
                        element.innerHTML = `Invitație - ${getSafeValue('eventName')} - vainvit.ro`;
                    }
                    return;
                }
            
                if (groom === null || groom === undefined || groom === '' || groom.trim() === '') {
                    if (eventWords.length > 5) {
                        element.innerHTML = `Invitație Nuntă - vainvit.ro`;
                    }else{
                        element.innerHTML = `Invitație - ${getSafeValue('eventName')} - vainvit.ro`;
                    }
                    return;
                }  
                
                if (eventWords.length > 5) {
                    element.innerHTML = `Invitație - ${getSafeValue('brideFirstName')} & ${getSafeValue('groomFirstName')} - vainvit.ro`;
                }else{
                    element.innerHTML = `Invitație - ${getSafeValue('eventName')} - ${getSafeValue('brideFirstName')} & ${getSafeValue('groomFirstName')} - vainvit.ro`;
                }
            }       
        },
        
        "event-name": (element) => {
            if(element === undefined || element === null){
                return;
            }

            var evtName = getSafeValue('eventName');
            if(evtName === null || evtName === undefined || evtName === '' || evtName.trim() === ''){
                element.innerHTML = "Numele Evenimentului...";
                return;
            }
            element.innerHTML = evtName;
        },

        "event-name-cont": (element) => {
            if(element === undefined || element === null){
                return;
            }

            var evtName = getSafeValue('eventName');
            if(evtName === null || evtName === undefined || evtName === '' || evtName.trim() === ''){
                element.style.display = "none";
                return;
            }
        },

        "intro-text-p": (element) => {
            if(element === undefined || element === null){
                return;
            }

            var evtName = getSafeValue('eventName');
            if(evtName === null || evtName === undefined || evtName === '' || evtName.trim() === ''){
                element.style.display = "none";
                return;
            }
        },

        "event-name-id": (element) => {
            if(element === undefined || element === null){
                return;
            }

            var evtName = getSafeValue('eventName');
            if(evtName === null || evtName === undefined || evtName === '' || evtName.trim() === ''){
                return;
            }
            element.innerHTML = evtName;
        },
        
        "bride-firstname": (element) => {
            if(isEmptyValue('brideFirstName')){
                element.innerHTML = "Mireasă...";
                return;
            }

            element.innerHTML = getSafeValue('brideFirstName');
        },

        "groom-firstname": (element) => {
            if(isEmptyValue('groomFirstName')){
                element.innerHTML = "Mire...";
                return;
            }
            element.innerHTML = getSafeValue('groomFirstName');
        },

        "confirm-until": (element) => {
            if(element === null || element === undefined){
                return;
            }
            
            if (!getSafeValue('confirmationDeadline')) {
                var container = document.getElementById("confirm-until-text");
                if (container !== undefined && container !== null) {
                    container.style.display = 'none';
                }
                return;
            }

            const momentDate = moment(getSafeValue('confirmationDeadline'), "YYYY-MM-DDThh:mm");
            if (momentDate._isValid === false) {
                var container = document.getElementById("confirm-until-text");
                if (container !== undefined && container !== null) {
                    container.style.display = 'none';
                }
                return;
            }
            const civilWeddingDateTime = momentDate.toDate();

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = new Intl.DateTimeFormat('ro-RO', options).format(civilWeddingDateTime);

            element.innerHTML = dateString + "!";
        },

        'godparents-pairs': (element) => {
            if (element == null) {
                return;
            }

            const pairs = getSafeValue('godParents');
            if (pairs === undefined || pairs === null) {
                element.innerHTML = '';
                return;
            }

            element.innerHTML = '';

            function joinGodParentsNames(names, separator) {
                const filteredStrings = names.filter(str => str);

                return filteredStrings.join(separator);
            }

            function getGodParentsElement(godMotherName, godFatherName) {
                const godParentsContainer = document.createElement('p');

                godParentsContainer.style.margin = '0';

                var godParentsNamesStr = joinGodParentsNames([
                    godMotherName, godFatherName
                ], " și ");

                godParentsContainer.innerText = DeleteAndBetween_GOD_MotherFatherIFNeeds(godParentsNamesStr);                         
                return godParentsContainer;
            }

            function getGodParentsPairSeparator() {
                const separator = document.createElement('span');

                separator.style.display = 'block';
                separator.style.margin = '-2px';
                separator.style.fontSize = '1rem';
                separator.style.opacity = 0.8;
                separator.style.color = "rgb(177, 132, 76)";
                separator.style.lineHeight = 'normal';
                separator.style.fontFamily = "'Times New Roman'";

                separator.innerText = '&';

                return separator;
            }

            var lastSeparator = null;
            for (var i = 0; i < pairs.length; ++i) {
                const godParentsPair = pairs[i];
                const godParentsElement = getGodParentsElement(godParentsPair.godMotherName, godParentsPair.godFatherName);

                var innerhtmlGodParents = godParentsElement.innerHTML;
                if(innerhtmlGodParents !== "" && innerhtmlGodParents.trim() !== "")
                {
                    if(lastSeparator !== null && lastSeparator !== undefined)
                        lastSeparator.innerText = "&";
                    element.appendChild(godParentsElement);
                }
                else
                {
                    if(lastSeparator !== null && lastSeparator !== undefined)
                        lastSeparator.innerText = "";
                    continue;  
                }

                if (i + 1 >= pairs.length) {
                    continue;
                }

                var separator = getGodParentsPairSeparator();
                lastSeparator = separator;
                element.appendChild(separator);
            }

            if(element.innerHTML === ""){
                hideGodparents();
                return;
            }
            else
            {
                const godparentsPairs = document.getElementById("godparents-pairs");
                const paragraphs = godparentsPairs.getElementsByTagName("p");
                var hasText = false;
                for (var p of paragraphs) 
                {
                    if(p === null || p=== undefined)
                    {
                        continue;
                    }

                    if (p.textContent.trim() !== "") {
                        hasText = true;
                        break;
                    }
                }

                if (!hasText) {
                   hideGodparents();
                   return;
                }
            }
        },

        "party-date": (element) => {
            if (!getSafeValue('partyDateTime')) { 
                element.innerHTML = "Data și ora ...";
                return;
            }

            const momentDate = moment(getSafeValue
                ('partyDateTime'), "YYYY-MM-DDThh:mm");
            if (momentDate._isValid === false){ 
                element.innerHTML = "Data și ora ...";
                return;
            }
            const partyDateTime = momentDate.toDate();
    
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = new Intl.DateTimeFormat('ro-RO', options).format(partyDateTime);
            const hours = partyDateTime.getHours().toString().padStart(2, '0');
            const minutes = partyDateTime.getMinutes().toString().padStart(2, '0');

            element.innerHTML = dateString + ', ' + `${hours}:${minutes}`;
        },

        "civil-date": (element) => {
            if (!getSafeValue('civilWeddingDateTime')) { 
                element.innerHTML = "Data și ora ...";
                return;
            }

            const momentDate = moment(getSafeValue
                ('civilWeddingDateTime'), "YYYY-MM-DDThh:mm");
            if (momentDate._isValid === false){ 
                element.innerHTML = "Data și ora ...";
                return;
            }
            const partyDateTime = momentDate.toDate();
    
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = new Intl.DateTimeFormat('ro-RO', options).format(partyDateTime);
            const hours = partyDateTime.getHours().toString().padStart(2, '0');
            const minutes = partyDateTime.getMinutes().toString().padStart(2, '0');

            element.innerHTML =  dateString + ', ' + `${hours}:${minutes}`;
        },

        "reli-date": (element) => {
            if (!getSafeValue('religiousWeddingDateTime')) { 
                element.innerHTML = "Data și ora ...";
                return;
            }

            const momentDate = moment(getSafeValue
                ('religiousWeddingDateTime'), "YYYY-MM-DDThh:mm");
            if (momentDate._isValid === false){ 
                element.innerHTML = "Data și ora ...";
                return;
            }
            const partyDateTime = momentDate.toDate();
    
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const dateString = new Intl.DateTimeFormat('ro-RO', options).format(partyDateTime);
            const hours = partyDateTime.getHours().toString().padStart(2, '0');
            const minutes = partyDateTime.getMinutes().toString().padStart(2, '0');

            element.innerHTML =  dateString + ', ' + `${hours}:${minutes}`;
        },

        "bride-mother-name": (element) => {
            if (getSafeValue('brideMotherLastName') == getSafeValue('brideFatherLastName')) {
                element.innerHTML = getSafeValue('brideMotherFirstName');
            } else {
                element.innerHTML = getSafeValue('brideMotherFirstName') + ' ' + getSafeValue('brideMotherLastName');
            }
        },
    
        "bride-father-name": (element) => {
            element.innerHTML = getSafeValue('brideFatherFirstName') + ' ' + getSafeValue('brideFatherLastName');
        },
    
        "groom-mother-name": (element) => {
            if (getSafeValue('groomMotherLastName') == getSafeValue('groomFatherLastName')) {
                element.innerHTML = getSafeValue('groomMotherFirstName');
            } else {
                element.innerHTML = getSafeValue('groomMotherFirstName') + ' ' + getSafeValue('groomMotherLastName');
            }
        },
    
        "groom-father-name": (element) => {
            element.innerHTML = getSafeValue('groomFatherFirstName') + ' ' + getSafeValue('groomFatherLastName');         
        },

        "day-of-week": (element) => {
            var mainDate = GetEventMainDate();
            if(mainDate === null){
                element.innerHTML = 'Zi...';
                return;
            }

            const d = new Date(mainDate); 
            if (d._isValid === false) {
                element.innerHTML = 'Zi...';
                return;
            }

            var day = getDayOfWeek(d);
            if (day === null || day === undefined) {
                element.innerHTML = "Zi...";
                return;
            }

            element.innerHTML = day;
        },

        "day-of-month": (element) => {
            var mainDate = GetEventMainDate();
            if(mainDate === null){
                element.innerHTML = '0';
                return;
            }

            const d = new Date(mainDate); 
            if (d._isValid === false) {
                element.innerHTML = '0';
                return;
            }

            var day = getDayOfMonth(d);
            if (day === null || day === undefined) {
                element.innerHTML = '0';
                return;
            }
            element.innerHTML = day;
        },

        "month": (element) => {
            var mainDate = GetEventMainDate();
            if(mainDate === null){
                element.innerHTML = 'Lună...';
                return;
            }

            const d = new Date(mainDate); 
            if (d._isValid === false) {
                element.innerHTML = 'Lună...';
                return;
            }

            var day = getDayAndMonth(d);
            if (day === null || day === undefined) {
                element.innerHTML = "Lună...";
                return;
            }
            element.innerHTML = day;
        },

        "time-party": (element) => {
            var mainDate = GetEventMainDate();
            if(mainDate === null){
                element.innerHTML = '00:00';
                return;
            }

            const d = new Date(mainDate); 
            if (d._isValid === false) {
                element.innerHTML = '00:00';
                return;
            }

            var day = getFormattedTime(d);
            if (day === null || day === undefined) {
                element.innerHTML = "00:00";
                return;
            }
            element.innerHTML = "ora " + day;
        },

        "button-confirm-id-container": (element) => {
            if (getSafeValue('isConfirmationPanelEnabled') === false) {
                element.style.display = "none";
                return;
            }
        },

        "party-location-address": (element) => {
            const fullAddressElements = [];

            if (!isStringNullOrEmpty(getSafeValue('partyAddress'))) {
                fullAddressElements.push(getSafeValue('partyAddress'));
            }

            if (!isStringNullOrEmpty(getSafeValue('partyCity'))) {
                fullAddressElements.push(getSafeValue('partyCity'));
            }

            if (!isStringNullOrEmpty(getSafeValue('partyCountry'))) {
                fullAddressElements.push(getSafeValue('partyCountry'));
            }

            if (fullAddressElements.length === 0) {
                element.style.display = 'none';
                return;
            }
    
            const fullAddressFiltered = fullAddressElements.filter((v, i) => { return v.trim() !== ''; });
            if (fullAddressFiltered === null || fullAddressFiltered === undefined || fullAddressFiltered.length === 0) {
                element.style.display = 'none';
                return;
            }
    
            var fullAddress = fullAddressFiltered.reduce((previousVal, currentVal, currentIndex, []) => { return `${previousVal}, ${currentVal}`; });
            var fullAddressTrim = fullAddress.trim();
            if(fullAddressTrim === ""){
                element.style.display = 'none';
                return;
            }
    
            element.innerHTML = '<i class="ti-location-pin"></i> ' + fullAddress;
        },

        "party-location-name": (element) => {
            if (!getSafeValue('partyLocationName')) {
                element.innerHTML = 'Nume Locație ...';
                return;
            }
            element.innerHTML = getSafeValue('partyLocationName');
        },

        "civil-wedding-location-address": (element) => {
            const fullAddressElements = [];
    
            if (!isStringNullOrEmpty(getSafeValue('civilWeddingAddress'))) {
                fullAddressElements.push(getSafeValue('civilWeddingAddress'));
            }
    
            if (!isStringNullOrEmpty(getSafeValue('civilWeddingCity'))) {
                fullAddressElements.push(getSafeValue('civilWeddingCity'));
            }
    
            if (!isStringNullOrEmpty(getSafeValue('civilWeddingCountry'))) {
                fullAddressElements.push(getSafeValue('civilWeddingCountry'));
            }
    
            if (fullAddressElements.length === 0) {
                element.style.display = 'none';
                return;
            }
    
            const fullAddressFiltered = fullAddressElements.filter((v, i) => { return v.trim() !== ''; });
            if (fullAddressFiltered === null || fullAddressFiltered === undefined || fullAddressFiltered.length === 0) {
                element.style.display = 'none';
                return;
            }
    
            var fullAddress = fullAddressFiltered.reduce((previousVal, currentVal, currentIndex, []) => { return `${previousVal}, ${currentVal}`; });
            var fullAddressTrim = fullAddress.trim();
            if(fullAddressTrim === ""){
                element.style.display = 'none';
                return;
            }

            element.innerHTML = '<i class="ti-location-pin"></i> ' + fullAddress;
        },
    
        "civil-wedding-location-name": (element) => {
            if (!getSafeValue('civilWeddingLocationName')) {
                element.innerHTML = 'Nume Locație ...';
                return;
            }
    
            element.innerHTML = getSafeValue('civilWeddingLocationName');
        },

        "religious-wedding-location-address": (element) => {
            const fullAddressElements = [];
    
            if (!isStringNullOrEmpty(getSafeValue('religiousWeddingAddress'))) {
                fullAddressElements.push(getSafeValue('religiousWeddingAddress'));
            }
    
            if (!isStringNullOrEmpty(getSafeValue('religiousWeddingCity'))) {
                fullAddressElements.push(getSafeValue('religiousWeddingCity'));
            }
    
            if (!isStringNullOrEmpty(getSafeValue('religiousWeddingCountry'))) {
                fullAddressElements.push(getSafeValue('religiousWeddingCountry'));
            }

            if (fullAddressElements.length === 0) {
                element.style.display = 'none';
                return;
            }
    
            const fullAddressFiltered = fullAddressElements.filter((v, i) => { return v.trim() !== ''; });
            if (fullAddressFiltered === null || fullAddressFiltered === undefined || fullAddressFiltered.length === 0) {
                element.style.display = 'none';
                return;
            }
    
            var fullAddress = fullAddressFiltered.reduce((previousVal, currentVal, currentIndex, []) => { return `${previousVal}, ${currentVal}`; });
            var fullAddressTrim = fullAddress.trim();
            if(fullAddressTrim === ""){
                element.style.display = 'none';
                return;
            }
    
            element.innerHTML =  '<i class="ti-location-pin"></i> ' + fullAddress;
        },
    
        "religious-wedding-location-name": (element) => {
            if (!getSafeValue('religiousWeddingLocationName')) {
                element.innerHTML = 'Nume Locație ...';
                return;
            }
    
            element.innerHTML = getSafeValue('religiousWeddingLocationName');
        },

        "div-location-main": (element) => {
            if (getSafeValue('isPartyEnabled') === false) {
                element.style.display = 'none';
            }
        },

        "div-location-main-civil": (element) => {
            if (getSafeValue('isCivilWeddingEnabled') === false) {
                element.style.display = 'none';
            }
        },

        "div-location-main-reli": (element) => {
            if (getSafeValue('isReligiousWeddingEnabled') === false) {
                element.style.display = 'none';
            }
        },
    
    };

    Object.entries(elementIdToValueMap).forEach(([elementId, setValue]) => {
        const element = document.getElementById(elementId);
        setValue(element);
    });

    const momentDate = moment(EventParams.partyDateTime, "YYYY-MM-DDThh:mm");
    EventDateTime = momentDate.toDate().getTime();
}

function getDayOfWeek(datetime) {
    const date = new Date(datetime);
    const daysOfWeek = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  }
  

  function getDayAndMonth(datetime) {
    const date = new Date(datetime);
    
    const months = [
      "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", 
      "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
    ];
    
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];

    return `${month}`;
  }
  

  function getDayOfMonth(datetime) {
    const date = new Date(datetime);
 
    const dayOfMonth = date.getDate();
    return dayOfMonth;
  }

  function getFormattedTime(datetime) {
    const date = new Date(datetime); 
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes}`;
  }


  function DeleteAndBetweendMotherFatherIFNeedsForBride(){
    var m = document.getElementById("bride-mother-name");
    var f = document.getElementById("bride-father-name");

    if(f === undefined || f === null){
        return;
    }

    if(m === undefined || m === null){
        return;
    }

    if(m.innerHTML.trim() === "" && f.innerHTML.trim() === "" ){
        m.innerHTML = "...";
        f.innerHTML = "...";
        return;
    }
    
    if(m.innerHTML.trim() === "" || f.innerHTML.trim() === "" ){
        var and = document.getElementById("bride-parents-and");
        if(and !== null && and !== undefined){
            and.style.display = "none";
        } 
    }
}

function DeleteAndBetweendMotherFatherIFNeedsForGroom(){
    var m = document.getElementById("groom-mother-name");
    var f = document.getElementById("groom-father-name");

    if(f === undefined || f === null){
        return;
    }

    if(m === undefined || m === null){
        return;
    }

    if(m.innerHTML.trim() === "" && f.innerHTML.trim() === "" ){
        m.innerHTML = "...";
        f.innerHTML = "...";
        return;
    }
    
    if(m.innerHTML.trim() === "" || f.innerHTML.trim() === "" ){
        var and = document.getElementById("groom-parents-and");
        if(and !== null && and !== undefined){
            and.style.display = "none";
        } 
    }
}

function DeleteAndBetween_GOD_MotherFatherIFNeeds(godParentsNamesStr){
    try {               
        if (godParentsNamesStr !== null && godParentsNamesStr !== undefined) {
    
            if (godParentsNamesStr.trim() === "și") {
                return ""; 
            } else {
                // Trim whitespace for checking
                let godParentsNamesStrTrimmed = godParentsNamesStr.trim();
    
                // Check if the string ends with "și" and remove it if so
                if (godParentsNamesStrTrimmed.endsWith("și") && godParentsNamesStrTrimmed.length > 2) {
                    godParentsNamesStr = godParentsNamesStrTrimmed.slice(0, -2).trim();
                } 
                // Check if the string starts with "și" and remove it if so
                else if (godParentsNamesStrTrimmed.startsWith("și") && godParentsNamesStrTrimmed.length > 2) {
                    godParentsNamesStr = godParentsNamesStrTrimmed.slice(2).trim();
                }
            } 
        }
    } 
    catch (error) {   
    }  
    return godParentsNamesStr; 
} 

function GetEventMainDate(){
    var isPartyDateTimeEmpty = false;
    var partyEnabled = getSafeValue('isPartyEnabled');
    var partyDateTime = getSafeValue('partyDateTime');
    if(partyEnabled === false){
        isPartyDateTimeEmpty = true;
    }else{
         if(partyDateTime === "" 
            || partyDateTime === undefined 
            || partyDateTime === null){
            isPartyDateTimeEmpty = true;
        }
    }

    var isReligiousCeremonyDateTimeEmpty = false;
    var reliEnabled = getSafeValue('isReligiousWeddingEnabled');
    var religiousCeremonyDateTime = getSafeValue('religiousWeddingDateTime');
    if(reliEnabled === false){
        isReligiousCeremonyDateTimeEmpty = true;
    }else{
        if(religiousCeremonyDateTime === "" 
            || religiousCeremonyDateTime === undefined 
            || religiousCeremonyDateTime === null){
            isReligiousCeremonyDateTimeEmpty = true;
        }
    }

    var isCivilCeremonyDateTimeEmpty = false;
    var civilEnabled = getSafeValue('isCivilWeddingEnabled');
    var civilCeremonyDateTime = getSafeValue('civilWeddingDateTime');
    if(civilEnabled === false){
        isCivilCeremonyDateTimeEmpty = true;
    }else{
        if(civilCeremonyDateTime === "" 
            || civilCeremonyDateTime === undefined 
            || civilCeremonyDateTime === null){
                isCivilCeremonyDateTimeEmpty = true;
        }
    }

    if(isPartyDateTimeEmpty === false){
            return partyDateTime;
        }else if(isReligiousCeremonyDateTimeEmpty === false){
            return religiousCeremonyDateTime;
        }else if(isCivilCeremonyDateTimeEmpty === false){
            return civilCeremonyDateTime;
        }

        return null;
}