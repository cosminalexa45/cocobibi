const VI_ConfirmationFormModel = {
    locale: "ro",
    
    elements: [
        {
            type: "text",
            name: "guestName",
            title: "Nume și Prenume",
            description: "Numele și prenumele dumneavoastră.",
            isRequired: true,
            placeholder: "Andrei Popescu"
        },

        {
            type: "text",
            name: "guestEmailAddress",
            title: "Adresa de e-mail",
            description: "Adresa dumneavoastră de e-mail.",
            isRequired: true,
            inputType: "email",
            placeholder: "andrei.popescu@gmail.com"
        },

        {
            type: "boolean",
            name: "guestResponse",
            title: "Răspuns",
            description: "În cazul în care refuzați să participați la eveniment, selectați \"Nu Particip\".",
            defaultValue: "true",
            isRequired: true,
            labelTrue: "Particip",
            labelFalse: "Nu Particip",
            swapOrder: true
        },

        {
            name: "civilWeddingResponse",
            visible: false
        },

        {
            name: "religiousWeddingResponse",
            visible: false
        },

        {
            name: "partyResponse",
            visible: false
        },

        {
            type: "boolean",
            name: "guestHasPartner",
            visibleIf: "({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true)",
            title: "Veți fi însoțit/ă la acest eveniment?",
            defaultValue: "true",
            isRequired: true,
            labelTrue: "Da",
            labelFalse: "Nu",
            swapOrder: true
        },

        {
            type: "text",
            name: "guestPartnerName",
            visibleIf: "({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true) and {guestHasPartner} = true",
            title: "Nume și Prenume partener",
            description: "Numele și prenumele persoanei care vă va însoți la eveniment.\n",
            isRequired: true,
            placeholder: "Andrei Popescu"
        },

        {
            type: "boolean",
            name: "guestHasKids",
            visibleIf: "({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true)",
            title: "Veți veni însoțit/ă de copii?",
            defaultValue: "false",
            isRequired: true,
            labelTrue: "Da",
            labelFalse: "Nu",
            swapOrder: true
        },

        {
            type: "text",
            name: "guestKidsCount",
            visibleIf: "{guestHasKids} = true and ({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true)",
            title: "Cu câți copii veți veni la acest eveniment?",
            defaultValue: 0,
            requiredIf: "{guestHasKids} = true",
            inputType: "number",
            min: 0,
            max: 66,
            step: 1
        },

        {
            name: "guestFoodMenu",
            visible: false
        },

        {
            name: "guestNeedsBooking",
            visible: false
        },

        {
            name: "guestPhoneNumber",
            visible: false
        },

        {
            type: "comment",
            name: "guestMessage",
            title: "Mesaj",
            placeholder: "Venim cu mare plăcere!"
        },
        {
            type: "html",
            name: "info",
            html: '<div id="confirmation-form-grecaptcha"></div><script>function RenderConfirmationCaptcha() { grecaptcha.render("confirmation-form-grecaptcha", { "sitekey" : "6LehxwUqAAAAAML1krECSprBU7iUjebmLaknUui3" }); };  WaitUntil(() => { return VI_GoogleRecaptchaJsLoaded === true; }, () => RenderConfirmationCaptcha(), 1000);</script>'
        }
    ],

    showPrevButton: false,
    showTitle: false,
    showPageTitles: false,
    showQuestionNumbers: "off",
    completeText: {
        ro: "Trimite"
    }
};

function CustomizeConfirmationFormModel() {
    if (EventParams === undefined || EventParams === null) {
        console.log('EventParams is null or undefined!');
        
        return;
    }

    const guestFoodMenuElement = {
        type: "radiogroup",
        name: "guestFoodMenu",
        title: "Preferințe meniu",
        choices: [
            {
                value: "1",
                text: "Meniu Normal",
                visibleIf: "{guestHasPartner} = false"
            },

            {
                value: "2",
                text: "Meniu Vegetarian",
                visibleIf: "{guestHasPartner} = false"
            },

            {
                value: "3",
                text: "2x Meniu Normal",
                visibleIf: "{guestHasPartner} = true"
            },

            {
                value: "4",
                text: "2x Meniu Vegetarian",
                visibleIf: "{guestHasPartner} = true"
            },

            {
                value: "5",
                text: "1x Meniu Normal, 1x Meniu Vegetarian",
                visibleIf: "{guestHasPartner} = true"
            }
        ],
        defaultValue: '3',
        allowClear: false,
        visibleIf: "({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true)"
    };

    const guestNeedsBookingElement = {
        type: "radiogroup",
        name: "guestNeedsBooking",
        title: "Aveți nevoie de cazare?",
        choices: [
            {
                value: "0",
                text: "Nu"
            },

            {
                value: "1",
                text: "Da"
            }
        ],
        allowClear: false,
        defaultValue: "0",
        renderAs: "checkbox",
        visibleIf: "({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true)"
    };

    const guestPhoneNumberElement = {
        type: "text",
        name: "guestPhoneNumber",
        title: "Număr de telefon",
        description: "Ne puteți lăsa numărul de telefon pe care să vă contactăm dacă este nevoie.",
        inputType: "tel",
        placeholder: "0755 123 123",
        visibleIf: "({guestResponse} = true or {civilWeddingResponse} = true or {religiousWeddingResponse} = true or {partyResponse} = true)"
    };

    function GetValueOrDefault(value, defaultValue) {
        return (value !== undefined && value !== null) ? value : defaultValue;
    }

    function RemoveFormElementByName(formModel, name) {
        formModel.elements = formModel.elements.filter(element => element.name !== name);
    }

    function ReplaceElementByName(formModel, name, newElement) {
        const index = formModel.elements.findIndex(element => element.name === name);
        if (index !== -1) {
            formModel.elements[index] = newElement;
        }
    }

    const hasSingleResponse = GetValueOrDefault(EventParams.hasSingleResponse, true);
    if (hasSingleResponse === false) {
        const hasCivilWeddingResponseEnabled = GetValueOrDefault(EventParams.hasCivilWeddingResponseEnabled, false);
        const hasReligiousWeddingResponseEnabled = GetValueOrDefault(EventParams.hasReligiousWeddingResponseEnabled, false);
        const hasPartyResponseEnabled = GetValueOrDefault(EventParams.hasPartyResponseEnabled, false);

        RemoveFormElementByName(VI_ConfirmationFormModel, 'guestResponse');

        if (hasCivilWeddingResponseEnabled) {
            const civilWeddingResponseElement = {
                type: "boolean",
                name: "civilWeddingResponse",
                title: "Participați la Cununia Civilă?",
                defaultValue: "true",
                isRequired: true,
                labelTrue: "Particip",
                labelFalse: "Nu Particip",
                swapOrder: true
            };

            ReplaceElementByName(VI_ConfirmationFormModel, 'civilWeddingResponse', civilWeddingResponseElement);
        }

        if (hasReligiousWeddingResponseEnabled) {
            const religiousWeddingResponseElement = {
                type: "boolean",
                name: "religiousWeddingResponse",
                title: "Participați la Cununia Religioasă?",
                defaultValue: "true",
                isRequired: true,
                labelTrue: "Particip",
                labelFalse: "Nu Particip",
                swapOrder: true
            };

            ReplaceElementByName(VI_ConfirmationFormModel, 'religiousWeddingResponse', religiousWeddingResponseElement);
        }

        if (hasPartyResponseEnabled) {
            const partyReponseElement = {
                type: "boolean",
                name: "partyResponse",
                title: "Participați la Petrecere?",
                defaultValue: "true",
                isRequired: true,
                labelTrue: "Particip",
                labelFalse: "Nu Particip",
                swapOrder: true
            };

            ReplaceElementByName(VI_ConfirmationFormModel, 'partyResponse', partyReponseElement);
        }
    }
    else {
        RemoveFormElementByName(VI_ConfirmationFormModel, 'civilWeddingResponse');
        RemoveFormElementByName(VI_ConfirmationFormModel, 'religiousWeddingResponse');
        RemoveFormElementByName(VI_ConfirmationFormModel, 'partyResponse');
    }

    const isGuestKidsCountSectionEnabled = GetValueOrDefault(EventParams.isKidsSectionEnabled, true);
    const isFoodMenuSectionEnabled = GetValueOrDefault(EventParams.isFoodMenuSectionEnabled, false);
    const isBookingSectionEnabled = GetValueOrDefault(EventParams.isBookingSectionEnabled, false);
    const isGuestPhoneSectionEnabled = GetValueOrDefault(EventParams.isGuestPhoneSectionEnabled, true);

    if (isGuestKidsCountSectionEnabled === false) {
        RemoveFormElementByName(VI_ConfirmationFormModel, 'guestHasKids');
        RemoveFormElementByName(VI_ConfirmationFormModel, 'guestKidsCount');
    } else {

    }

    // Food Menu
    if (isFoodMenuSectionEnabled === false) {
        RemoveFormElementByName(VI_ConfirmationFormModel, 'guestFoodMenu');
    } else {
        const isMuslimFoodMenuEnabled = GetValueOrDefault(EventParams.isMuslimFoodMenuEnabled, false);

        // 6 = Meniu Musulman
        // 7 = 1x Meniu Normal, 1x Meniu Musulman
        // 8 = 1x Meniu Vegetarian, 1x Meniu Musulman
        // 9 = 2x Meniu Musulman
        if (isMuslimFoodMenuEnabled === true)
        {
            guestFoodMenuElement.choices.splice(2, 0, {
                value: "6",
                text: "Meniu Musulman",
                visibleIf: "{guestHasPartner} = false"
            });

            // guestFoodMenuElement.choices.push({
            //     value: "6",
            //     text: "Meniu Musulman",
            //     visibleIf: "{guestHasPartner} = false"
            // });

            guestFoodMenuElement.choices.splice(5, 0, {
                value: "7",
                text: "2x Meniu Musulman",
                visibleIf: "{guestHasPartner} = true"
            });
    
            // guestFoodMenuElement.choices.push({
            //     value: "7",
            //     text: "2x Meniu Musulman",
            //     visibleIf: "{guestHasPartner} = true"
            // });
    
            guestFoodMenuElement.choices.push({
                value: "8",
                text: "1x Meniu Normal, 1x Meniu Musulman",
                visibleIf: "{guestHasPartner} = true"
            });
    
            guestFoodMenuElement.choices.push({
                value: "9",
                text: "1x Meniu Vegetarian, 1x Meniu Musulman",
                visibleIf: "{guestHasPartner} = true"
            });
        }

        ReplaceElementByName(VI_ConfirmationFormModel, 'guestFoodMenu', guestFoodMenuElement);
    }

    if (isBookingSectionEnabled === false) {
        RemoveFormElementByName(VI_ConfirmationFormModel, 'guestNeedsBooking');
    } else {
        ReplaceElementByName(VI_ConfirmationFormModel, 'guestNeedsBooking', guestNeedsBookingElement);
    }

    if (isGuestPhoneSectionEnabled === false) {
        RemoveFormElementByName(VI_ConfirmationFormModel, 'guestPhoneNumber');
    } else {
        ReplaceElementByName(VI_ConfirmationFormModel, 'guestPhoneNumber', guestPhoneNumberElement);
    }
}
