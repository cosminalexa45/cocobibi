const EventParamsDefault = {
    "eventInviteTemplateId": "1",
    "eventDate": "2025-07-07",
    "eventName": "",

    // "brideFirstName": "Nume Mireasă",
    // "brideLastName": "Prenume Mireasă",

    // "groomFirstName": "Nume Mire",
    // "groomLastName": "Prenume Mire",

    // "brideFatherFirstName": "Nume Mamă Mireasă",
    // "brideFatherLastName": "Prenume Mamă Mireasă",

    // "brideMotherFirstName": "Nume Tată Mireasă",
    // "brideMotherLastName": "Prenume Tată Mireasă",

    // "groomMotherFirstName": "Nume Mamă Mire",
    // "groomMotherLastName": "Prenume Mamă Mire",

    // "groomFatherFirstName": "Nume Tată Mire",
    // "groomFatherLastName": "Prenume Tată Mire",

    // "godMotherFirstName": "Nume Nașă",
    // "godMotherLastName": "Prenume Nașă",

    // "godFatherFirstName": "Nume Naș",
    // "godFatherLastName": "Prenume Naș",

    "brideFirstName": "",
    "brideLastName": "",

    "groomFirstName": "",
    "groomLastName": "",

    "brideFatherFirstName": "",
    "brideFatherLastName": "",

    "brideMotherFirstName": "",
    "brideMotherLastName": "",

    "groomMotherFirstName": "",
    "groomMotherLastName": "",

    "groomFatherFirstName": "",
    "groomFatherLastName": "",

    "godMotherFirstName": "",
    "godMotherLastName": "",

    "godFatherFirstName": "",
    "godFatherLastName": "",

    "civilWeddingCountry": "",
    "civilWeddingCity": "",
    // "civilWeddingAddress": "Strada Victoriei",
    // "civilWeddingLocationName": "Strada Locației Cununiei Civile",
    "civilWeddingAddress": "",
    "civilWeddingLocationName": "",
    "civilWeddingDateTime": null,

    "religiousWeddingCountry": "",
    "religiousWeddingCity": "",
    // "religiousWeddingAddress": "Strada Locației Cununiei Religioase",
    // "religiousWeddingLocationName": "Nume Locație Cununie Religiosă",
    "religiousWeddingAddress": "",
    "religiousWeddingLocationName":  "",
    "religiousWeddingDateTime": null,

    "partyCountry": "",
    "partyCity": "",
    // "partyAddress": "Strada Locație Petrecere",
    // "partyLocationName": "Nume Locație Petrecere",
    "partyAddress":  "",
    "partyLocationName":  "",
    "partyDateTime": null,

    "eventGuid": "b19ec654-2383-4f82-bea2-4f2ea0466dfe",

    "enableConfirmations": false,
    "isLocked" : false,
    "isDemo": false,

    "isCivilWeddingEnabled": false,
    "isReligiousWeddingEnabled": false,
    "isPartyEnabled": true,
};

var IsBackButtonShown = false;
document.addEventListener('DOMContentLoaded', () => {
    CheckInvitationStatus();
    ShowBackButtonIfNeeded();
});
