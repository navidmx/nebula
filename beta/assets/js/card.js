$('form').card({
    form: '#card-form',
    container: '#card-display',
    formSelectors: {
        numberInput: '.field-card-number',
        expiryInput: '.field-card-expiry',
        cvcInput: '.field-card-cvc',
        nameInput: '.field-card-name'
    },
    width: 300,
    placeholders: {
        number: '•••• •••• •••• ••••',
        name: 'Full Name',
        expiry: 'MM/YY',
        cvc: '•••'
    }
});