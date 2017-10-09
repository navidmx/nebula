/*
    TEMPORARY master password
    This will later be stored in the user's browser cache once they have logged in
*/
var masterPass = "test123";

firebase.initializeApp({
    apiKey: "AIzaSyAsmBe8yNPFczltqyfVC-QG3VlJ_se0NzQ",
    authDomain: "nebula-terminal.firebaseapp.com",
    databaseURL: "https://nebula-terminal.firebaseio.com",
    projectId: "nebula-terminal",
    storageBucket: "nebula-terminal.appspot.com",
    messagingSenderId: "742319310357"
});

var database = firebase.database();

//Pull the current user's encrypted master password (in SHA256)
database.ref('users/fake-uid/pass').on('value', function (snapshot) {
    var masterPassEnc = snapshot.val();
});

//On home page, load current list of apps from assets/apps.js
function loadApps() {
    for (var i = 0; i < current_apps.length; i++) {
        $("#apps").append(
            '<div class="col-md-4">' +
            '<a href="apps/' + current_apps[i].file + '/index.html">' +
            '<h2>' + current_apps[i].name.toUpperCase() + '</h2>' +
            '<p>' + current_apps[i].desc + '</p>' +
            '</a>' +
            '</div>'
        );
    }
}

refreshStorage();

//Handle field submitting in Password Manager
function submitField(type) {
    //Submitting a username/email and password combination
    if (type == "user") {
        database.ref('users/fake-uid/password-manager').push().set({
            type: "user",
            id: $('.field-identifier').val(),
            values: {
                //Encrypt all of the user's info (except ID) with their masterPass
                username: GibberishAES.enc($('.field-username').val(), masterPass),
                password: GibberishAES.enc($('.field-password').val(), masterPass)
            }
        });
    }
    if (type == "credit") {
        database.ref('users/fake-uid/password-manager').push().set({
            type: "credit",
            id: $('.field-card-identifier').val(),
            values: {
                name: GibberishAES.enc($('.field-card-name').val(), masterPass),
                number: GibberishAES.enc($('.field-card-number').val(), masterPass),
                expiry: GibberishAES.enc($('.field-card-expiry').val(), masterPass),
                cvc: GibberishAES.enc($('.field-card-cvc').val(), masterPass)
            }
        });
    }
    //Reset current board before updating data
    $("#stored-info").html("<hr>");
    refreshStorage();
}

function refreshStorage() {
    //Loop through data in branch password-manager and pull all the necessary info
    database.ref('users/fake-uid/password-manager').on('value', function (snapshot) {
        for (var key in snapshot.val()) {
            var fieldVals = '';
            //Detect what type of data was stored, and add fields appropriately
            if (snapshot.val()[key].type == "user") {
                fieldVals =
                    '<div class="field-label">' +
                    '<p class="field-label-name">Username</p>' +
                    //Notice that info is decrypted from here on, using the master password
                    '<p>' + GibberishAES.dec(snapshot.val()[key].values.username, masterPass) + '</p>' +
                    '</div>' +
                    '<div class="field-label">' +
                    '<p class="field-label-name">Password</p>' +
                    '<p>' + GibberishAES.dec(snapshot.val()[key].values.password, masterPass) + '</p>' +
                    '</div>';
            } else if (snapshot.val()[key].type == "credit") {
                fieldVals =
                    '<div class="field-label">' +
                    '<p class="field-label-name">Name on Card</p>' +
                    '<p>' + GibberishAES.dec(snapshot.val()[key].values.name, masterPass) + '</p>' +
                    '</div>' +
                    '<div class="field-label">' +
                    '<p class="field-label-name">Number</p>' +
                    '<p>' + GibberishAES.dec(snapshot.val()[key].values.number, masterPass) + '</p>' +
                    '</div>' +
                    '<div class="field-label">' +
                    '<p class="field-label-name">CVC</p>' +
                    '<p>' + GibberishAES.dec(snapshot.val()[key].values.cvc, masterPass) + '</p>' +
                    '</div>' +
                    '<div class="field-label">' +
                    '<p class="field-label-name">Expiry</p>' +
                    '<p>' + GibberishAES.dec(snapshot.val()[key].values.expiry, masterPass) + '</p>' +
                    '</div>';
            }
            $("#stored-info").append(
                '<div class="col-md-4">' +
                '<div class="card">' +
                '<div class="card-header">' +
                snapshot.val()[key].id.toUpperCase() +
                '</div>' +
                '<div class="card-block">' +
                fieldVals +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        }
    });
}

//function createAddressField() {
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//
//    var x = document.createElement("P");
//    var t = document.createTextNode("Address:");
//    x.appendChild(t);
//    document.body.appendChild(x);
//
//    var z = document.createElement("INPUT");
//    z.setAttribute("type", "text");
//    z.setAttribute("placeholder", "Address");
//    z.setAttribute("style", "float: left;");
//    z.setAttribute("style", "display: inline;");
//    z.setAttribute("style", "width: 30%;");
//    document.body.appendChild(z);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//
//    var x = document.createElement("INPUT");
//    x.setAttribute("type", "text");
//    x.setAttribute("placeholder", "City");
//    x.setAttribute("style", "float: left;");
//    x.setAttribute("style", "display: inline;");
//    x.setAttribute("style", "width: 3%;");
//    document.body.appendChild(x);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//
//    var x = document.createElement("INPUT");
//    x.setAttribute("type", "text");
//    x.setAttribute("placeholder", "State");
//    x.setAttribute("style", "float: left;");
//    x.setAttribute("style", "display: inline;");
//    x.setAttribute("style", "width: 10%;");
//    document.body.appendChild(x);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//
//    var x = document.createElement("INPUT");
//    x.setAttribute("type", "text");
//    x.setAttribute("placeholder", "ZIP");
//    x.setAttribute("style", "display: inline;");
//    x.setAttribute("style", "width: 4.67%;");
//    document.body.appendChild(x);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//}
//
//function createSecurityField() {
//
//    var x = document.createElement("P");
//    var t = document.createTextNode("Question:");
//    x.appendChild(t);
//    document.body.appendChild(x);
//
//    var z = document.createElement("INPUT");
//    z.setAttribute("type", "text");
//    z.setAttribute("placeholder", "Question");
//    z.setAttribute("style", "float: left;");
//    z.setAttribute("style", "display: inline;");
//    document.body.appendChild(z);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//
//    var x = document.createElement("P");
//    var t = document.createTextNode("Answer:");
//    x.appendChild(t);
//    document.body.appendChild(x);
//
//    var x = document.createElement("INPUT");
//    x.setAttribute("type", "text");
//    x.setAttribute("placeholder", "Answer");
//    x.setAttribute("style", "float: left;");
//    x.setAttribute("style", "display: inline;");
//    x.setAttribute("style", "-webkit-text-security: disc;");
//    document.body.appendChild(x);
//
//    var y = document.createElement("BR");
//    y.setAttribute("style", "display: inline;");
//    document.body.appendChild(y);
//}
