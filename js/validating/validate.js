//===================== crop validating =======================//

var cropCodePattern = /^CRP-\d{3}$/;

$('#cropCode').on('input', function () {
    var cropCode = $('#cropCode').val();
    var errorMassage = $('.errorMassageId');

    if (!cropCodePattern.test(cropCode)) {
        errorMassage.show();
        errorMassage.text('Invalid Crop Code format. Example: CRP-000');
        $('#cropCode').css({'border': '2px solid red'});
    } else {
        errorMassage.hide();
        $('#cropCode').css({'border': '2px solid green'});
    }
});


// common name validate
function checkCommonNameField(){
    var cropCommonName = $('#cropCommonName').val();
    var cropCommonNamePattern  = /^\s*\S.{2,8}\S\s*$/;
    var errorMassageCommonName = $('.errorMassageCommonName');

    if (!cropCommonNamePattern.test(cropCommonName)){
        errorMassageCommonName.show();
        $('#cropCommonName').css({'border':'2px solid red'});
        errorMassageCommonName.text('Common Name must be between 4 to 10 characters.');
    } else {
        errorMassageCommonName.hide();
        $('#cropCommonName').css('border','2px solid green');
    }
}

// scientific name

$('#cropScientificName').on('input', function () {
    var scientificName = $(this).val();
    var errorMassageScientificName = $('.errorMassageScientificName');

    if (scientificName.length > 15) {
        errorMassageScientificName.show();
        errorMassageScientificName.text('Scientific Name must not exceed 15 characters.');
        $(this).css({'border': '2px solid red'});
    } else {
        errorMassageScientificName.hide();
        $(this).css({'border': '2px solid green'});
    }
});

//category
$('#category').on('input', function () {
    var category = $('#category').val();
    var categoryPattern  = /^\s*\S.{2,8}\S\s*$/;
    var errorMassageCategory = $('.errorMassageCategory');

    if (!categoryPattern.test(category)) {
        errorMassageCategory.show();
        errorMassageCategory.text('Category must not exceed 10 characters.');
        $('#category').css({'border': '2px solid red'});
    } else {
        errorMassageCategory.hide();
        $('#category').css({'border': '2px solid green'});
    }
});

$('#cropSeason').on('input', function () {
    var cropSeason = $(this).val();
    var errorMassageCropSeason = $('.errorMassageCropSeason');
    if (cropSeason.length > 10) {
        errorMassageCropSeason.show();
        errorMassageCropSeason.text('Crop Season must not exceed 10 characters.');
        $(this).css({'border': '2px solid red'});
    } else {
        errorMassageCropSeason.hide();
        $(this).css({'border': '2px solid green'});
    }
});

$('#cropImage').on('change', function () {
    var file = this.files[0];
    var errorMassageImage = $('#cropImagePreview');

    if (file) {
        var fileSizeInMB = file.size / 1024 / 1024; // Convert to MB
        var fileType = file.type;

        if (!fileType.startsWith('image/') || fileSizeInMB > 2) { // Limit size to 2MB
            errorMassageImage.text('Invalid file. Please upload an image less than 2MB.');
            $('#cropImage').css({'border': '2px solid red'});
        } else {
            errorMassageImage.text('');
            $('#cropImage').css({'border': '2px solid green'});
        }
    }
});

// ======================== field validating ==============================//
// Trigger validation on input
$(document).ready(function () {
    $('#fieldCode').on('input', validateFieldCode);
    $('#fieldName').on('input', checkNameField);
    $('#fieldLocation').on('input', validateFieldLocation);
    $('#extentSize').on('input', validateExtentSize);
});

// Validate Field Code
function validateFieldCode() {
    var fieldCode = $('#fieldCode').val();
    var fieldCodePattern = /^FED-\d{3}$/;
    var errorFieldCodeMessage = $('#errorFieldCodeMessage');

    if (!fieldCodePattern.test(fieldCode)) {
        errorFieldCodeMessage.show().text('Field Code must match the format FED-000.');
        $('#fieldCode').css({ 'border': '2px solid red' });
    } else {
        errorFieldCodeMessage.hide();
        $('#fieldCode').css({ 'border': '2px solid green' });
    }
}

// Validate Field Name
function checkNameField() {
    var fieldName = $('#fieldName').val();
    var fieldNamePattern = /^\s*\S.{3,16}\S\s*$/;
    var errorFieldNameMessage = $('#errorFieldNameMessage');

    if (!fieldNamePattern.test(fieldName)) {
        errorFieldNameMessage.show().text('Field Name must be between 5 to 18 characters.');
        $('#fieldName').css({ 'border': '2px solid red' });
    } else {
        errorFieldNameMessage.hide();
        $('#fieldName').css({ 'border': '2px solid green' });
    }
}

// Validate Field Location
function validateFieldLocation() {
    var fieldLocation = $('#fieldLocation').val();
    var locationPattern = /^[A-Za-z\s\-]{1,10}$/; // Letters, spaces, hyphens, max 10 chars
    var errorLocationMessage = $('#errorFieldLocationMessage');

    if (!locationPattern.test(fieldLocation)) {
        errorLocationMessage.show().text('Field Location must only contain letters, spaces, or hyphens (max 10 characters).');
        $('#fieldLocation').css({ 'border': '2px solid red' });
    } else {
        errorLocationMessage.hide();
        $('#fieldLocation').css({ 'border': '2px solid green' });
    }
}

// Validate Extent Size
function validateExtentSize() {
    var extentSize = $('#extentSize').val();
    var extentPattern = /^\d+(\.\d{1,2})?$/; // Numeric value, optional 2 decimal places
    var errorExtentSizeMessage = $('#errorExtentSizeMessage');

    if (!extentPattern.test(extentSize)) {
        errorExtentSizeMessage.show().text('Extent Size must be a number with up to 2 decimal places.');
        $('#extentSize').css({ 'border': '2px solid red' });
    } else {
        errorExtentSizeMessage.hide();
        $('#extentSize').css({ 'border': '2px solid green' });
    }
}

// ============================== vehicle validate =======================//


// Trigger validation on input
$(document).ready(function () {
    $('#vehicleCode').on('input', validateVehicleCode);
    $('#licensePlateNumber').on('input', validateLicensePlate);
    $('#vehicleCategory').on('input', validateCategory);
    $('#fuelType').on('input', validateFuelType);
});

function validateVehicleCode() {
    let vehicleCode = $('#vehicleCode').val();
    let vehicleCodePattern = /^VEH-\d{3}$/;
    let errorVehicleCodeMessage = $('.errorVehicleCodeMessage');

    if (!vehicleCodePattern.test(vehicleCode)) {
        errorVehicleCodeMessage.show().text('Vehicle Code must match the format VEH-000.');
        $('#vehicleCode').css({ 'border': '2px solid red' });
    } else {
        errorVehicleCodeMessage.hide();
        $('#vehicleCode').css({ 'border': '2px solid green' });
    }
}

function validateLicensePlate() {
    let licensePlate = $('#licensePlateNumber').val();
    let licensePlatePattern = /^[A-Z0-9]{1,7}$/; // Alphanumeric, 1 to 7 characters
    let errorLicensePlateMessage = $('.errorLicensePlateMessage');

    if (!licensePlatePattern.test(licensePlate)) {
        errorLicensePlateMessage.show().text('License Plate must be alphanumeric and 1-7 characters long.');
        $('#licensePlateNumber').css({ 'border': '2px solid red' });
    } else {
        errorLicensePlateMessage.hide();
        $('#licensePlateNumber').css({ 'border': '2px solid green' });
    }
}

function validateCategory() {
    let category = $('#vehicleCategory').val();
    let categoryPattern = /^[A-Za-z\s]+$/; // Only alphabetic characters and spaces
    let errorCategoryMessage = $('.errorCategoryMessage');

    if (!categoryPattern.test(category)) {
        errorCategoryMessage.show().text('Vehicle Category must contain only letters and spaces.');
        $('#vehicleCategory').css({ 'border': '2px solid red' });
    } else {
        errorCategoryMessage.hide();
        $('#vehicleCategory').css({ 'border': '2px solid green' });
    }
}

function validateFuelType() {
    let fuelType = $('#fuelType').val();
    let fuelTypePattern = /^[A-Za-z\s]+$/; // Only alphabetic characters and spaces
    let errorFuelTypeMessage = $('.errorFuelTypeMessage');

    if (!fuelTypePattern.test(fuelType)) {
        errorFuelTypeMessage.show().text('Fuel Type must contain only letters and spaces.');
        $('#fuelType').css({ 'border': '2px solid red' });
    } else {
        errorFuelTypeMessage.hide();
        $('#fuelType').css({ 'border': '2px solid green' });
    }
}

// ================================ staff validate ===========================================//

// Trigger validation on input
$(document).ready(function () {
    $('#id').on('input', validateStaffId);
    $('#firstName').on('input', validateStaffFirstName);
    $('#lastName').on('input', validateStaffLastName);
    $('#contactNo').on('input', validateContactNo);
    $('#email').on('input', validateEmail);
    $('#dob').on('input', validateDOB);
    $('#designation').on('input', validateDesignation);
});

function validateStaffId() {
    let id = $('#id').val();
    let staffIdPattern = /^STF-\d{3}$/;
    let errorStaffIdMessage = $('.errorStaffIdMessage');

    if (!staffIdPattern.test(id)) {
        errorStaffIdMessage.show().text('Staff id must match the format STF-000.');
        $('#id').css({ 'border': '2px solid red' });
    } else {
        errorStaffIdMessage.hide();
        $('#id').css({ 'border': '2px solid green' });
    }
}

function validateStaffFirstName() {
    let firstName = $('#firstName').val();
    let staffFirstNamePattern = /^\s*\S.{2,8}\S\s*$/;
    let errorStaffFirstNameMessage = $('.errorStaffNameMessage');

    if (!staffFirstNamePattern.test(firstName)) {
        errorStaffFirstNameMessage.show().text('First Name must be between 4 to 10 characters.');
        $('#firstName').css({ 'border': '2px solid red' });
    } else {
        errorStaffFirstNameMessage.hide();
        $('#firstName').css({ 'border': '2px solid green' });
    }
}

function validateStaffLastName() {
    let lastName = $('#lastName').val();
    let staffLastNamePattern = /^\s*\S.{2,8}\S\s*$/;
    let errorStaffLastNameMessage = $('.errorStaffLastNameMessage');

    if (!staffLastNamePattern.test(lastName)) {
        errorStaffLastNameMessage.show().text('Last Name must be between 4 to 10 characters.');
        $('#lastName').css({ 'border': '2px solid red' });
    } else {
        errorStaffLastNameMessage.hide();
        $('#lastName').css({ 'border': '2px solid green' });
    }
}

function validateContactNo() {
    let contactNo = $('#contactNo').val();
    let contactNoPattern = /^[0-9]{10}$/;  // Assuming contact number should be 10 digits
    let errorContactNoMessage = $('.errorContactNoMessage');

    if (!contactNoPattern.test(contactNo)) {
        errorContactNoMessage.show().text('Contact number must be 10 digits.');
        $('#contactNo').css({ 'border': '2px solid red' });
    } else {
        errorContactNoMessage.hide();
        $('#contactNo').css({ 'border': '2px solid green' });
    }
}

function validateEmail() {
    let email = $('#email').val();
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Simple email regex
    let errorEmailMessage = $('.errorEmailMessage');

    if (!emailPattern.test(email)) {
        errorEmailMessage.show().text('Please enter a valid email address.');
        $('#email').css({ 'border': '2px solid red' });
    } else {
        errorEmailMessage.hide();
        $('#email').css({ 'border': '2px solid green' });
    }
}

function validateDOB() {
    let dob = $('#dob').val();
    let errorDOBMessage = $('.errorDOBMessage');

    if (!dob) {
        errorDOBMessage.show().text('Date of Birth is required.');
        $('#dob').css({ 'border': '2px solid red' });
    } else {
        errorDOBMessage.hide();
        $('#dob').css({ 'border': '2px solid green' });
    }
}

function validateDesignation() {
    let designation = $('#designation').val();
    let errorDesignationMessage = $('.errorDesignationMessage');

    if (designation.length < 2 || designation.length > 10) {
        errorDesignationMessage.show().text('Designation should be between 2 and 10 characters.');
        $('#designation').css({ 'border': '2px solid red' });
    } else {
        errorDesignationMessage.hide();
        $('#designation').css({ 'border': '2px solid green' });
    }
}

// validate addredd //
$(document).ready(function () {
    $('#addressLine1').on('input', validateAddressL1Line);
    $('#addressLine2').on('input', validateAddressL2Line)
    $('#addressLine3').on('input', validateAddressL3Line);
    $('#addressLine4').on('input', validateAddressL4Line);
    $('#addressLine5').on('input', validateAddressL5Line);


});

function validateAddressL1Line() {
    let addressLine = $('#addressLine1').val();
    let errorAddressL1Message = $('.errorAddressL1Massage');
    let addressLinePattern = /^[a-zA-Z0-9\s.,-]{10}$/;

    if (!addressLinePattern.test(addressLine)) {
        $(errorAddressL1Message).show().text("Address can only contain letters, numbers should be between  10 characters");
        $('#addressLine1').css("border", "2px solid red");
    } else {
        $(errorAddressL1Message).hide();
        $('#addressLine1').css("border", "2px solid green");
    }
}

function validateAddressL2Line() {
    let addressLine = $('#addressLine2').val();
    let errorAddressL2Message = $('.errorAddressL2Message');
    let addressLinePattern = /^[a-zA-Z0-9\s.,-]{10}$/;

    if (!addressLinePattern.test(addressLine)) {
        $(errorAddressL2Message).show().text("Address can only contain letters, numbers should be between  10 characters");
        $('#addressLine2').css("border", "2px solid red");
    } else {
        $(errorAddressL2Message).hide();
        $('#addressLine2').css("border", "2px solid green");
    }
}

function validateAddressL3Line() {
    let addressLine = $('#addressLine3').val();
    let errorAddressL3Message = $('.errorAddressL3Message');
    let addressLinePattern = /^[a-zA-Z0-9\s.,-]{10}$/;

    if (!addressLinePattern.test(addressLine)) {
        $(errorAddressL3Message).show().text("Address can only contain letters, numbers should be between  10 characters");
        $('#addressLine3').css("border", "2px solid red");
    } else {
        $(errorAddressL3Message).hide();
        $('#addressLine3').css("border", "2px solid green");
    }
}

function validateAddressL4Line() {
    let addressLine = $('#addressLine4').val();
    let errorAddressL4Message = $('.errorAddressL4Message');
    let addressLinePattern = /^[a-zA-Z0-9\s.,-]{10}$/;

    if (!addressLinePattern.test(addressLine)) {
        $(errorAddressL4Message).show().text("Address can only contain letters, numbers should be between  10 characters");
        $('#addressLine4').css("border", "2px solid red");
    } else {
        $(errorAddressL4Message).hide();
        $('#addressLine4').css("border", "2px solid green");
    }
}
function validateAddressL5Line() {
    let addressLine = $('#addressLine5').val();
    let errorAddressL5Message = $('.errorAddressL5Message');
    let addressLinePattern = /^[a-zA-Z0-9\s.,-]{10}$/;

    if (!addressLinePattern.test(addressLine)) {
        $(errorAddressL5Message).show().text("Address can only contain letters, numbers should be between  10 characters");
        $('#addressLine5').css("border", "2px solid red");
    } else {
        $(errorAddressL5Message).hide();
        $('#addressLine5').css("border", "2px solid green");
    }
}

// ============================ equipment validate ===========================//

$(document).ready(function () {
    $('#equipmentId').on('input', validateEquipmentId);
    $('#equipmentName').on('input', validateEquipmentName);
    $('#type').on('input', validateEquipmentType);
});

function  validateEquipmentId(){
    let id = $('#equipmentId').val();
    let equipmentIdPattern = /^EPT-\d{3}$/;
    let errorEquipmentIdMessage = $('.errorEquipmentIdMessage');

    if (!equipmentIdPattern.test(id)) {
        errorEquipmentIdMessage.show().text('Equipment id must match the format EPT-000.');
        $('#id').css({ 'border': '2px solid red' });
    } else {
        errorEquipmentIdMessage.hide();
        $('#id').css({'border': '2px solid green'});
    }
}

function validateEquipmentName(){
    var equipmentName = $('#equipmentName').val();
    var equipmentNamePattern  = /^\s*\S.{2,8}\S\s*$/;
    var errorMassageEquipmentName = $('.errorMassageEquipmentName');

    if (!equipmentNamePattern.test(equipmentName)){
        errorMassageEquipmentName.show();
        $('#equipmentName').css({'border':'2px solid red'});
        errorMassageEquipmentName.text('Equipment Name must be between 4 to 10 characters.');
    } else {
        errorMassageEquipmentName.hide();
        $('#equipmentName').css('border','2px solid green');
    }
}

function validateEquipmentType(){
    var equipmentType = $('#type').val();
    var equipmentTypePattern  = /^\s*\S.{2,8}\S\s*$/;
    var errorMassageEquipmentType = $('.errorMassageEquipmentType');

    if (!equipmentTypePattern.test(equipmentType)){
        errorMassageEquipmentType.show();
        $('#type').css({'border':'2px solid red'});
        errorMassageEquipmentType.text('Equipment Type must be between 4 to 10 characters.');
    } else {
        errorMassageEquipmentType.hide();
        $('#type').css('border','2px solid green');
    }
}

// ======================== log validate ===============================//
$(document).ready(function () {
    $('#logCode1').on('input', validateMonitoLogCode);
    $('#logDetails').on('input', validateLogDetails);

});

function  validateMonitoLogCode(){
    let id = $('#logCode1').val();
    let logCodePattern = /^LOG-\d{3}$/;
    let errorLogCodeMessage = $('.errorMonitoLogCodeMessage');

    if (!logCodePattern.test(id)) {
        errorLogCodeMessage.show().text('Monito Log Code must match the format LOG-000.');
        $('#logCode1').css({ 'border': '2px solid red' });
    } else {
        errorLogCodeMessage.hide();
        $('#logCode1').css({'border': '2px solid green'});
    }
}

function  validateLogDetails(){
    let designation = $('#logDetails').val();
    let errorDetailsMessage = $('.errorLogDetailsMessage');

    if (designation.length < 10 || designation.length > 20) {
        errorDetailsMessage.show().text('Log Details should be between 2 and 10 characters.');
        $('#logDetails').css({ 'border': '2px solid red' });
    } else {
        errorDetailsMessage.hide();
        $('#logDetails').css({ 'border': '2px solid green' });
    }
}

// ==================================== field log validate =========================//

$(document).ready(function () {
    $('#logCode').on('input', validateLogCode);
    $('#description1').on('input', validateLogDescription);
    $('#workFieldsCount1').on('input', validateLogWorkFieldsCount);
    $('#logDetails1').on('input', validateMonitoLogDetails);


});

function  validateLogCode(){
    let id = $('#logCode').val();
    let logCodePattern = /^LOG-\d{3}$/;
    let errorLogCodeMessage = $('.errorLogCodeMessage');

    if (!logCodePattern.test(id)) {
        errorLogCodeMessage.show().text('Log Code must match the format LOG-000.');
        $('#logCode').css({ 'border': '2px solid red' });
    } else {
        errorLogCodeMessage.hide();
        $('#logCode').css({'border': '2px solid green'});
    }
}

function validateLogWorkFieldsCount() {
    let workFieldCount = $('#workFieldsCount1').val();
    let fieldsCountPattern = /^[0-9]{2,3}$/;
    let errorFieldsCountMessage = $('.errorMonitoLogWordCountMessage');

    if (!fieldsCountPattern.test(workFieldCount)) {
        errorFieldsCountMessage.show().text('Field Work Count must be a numeric value with up to 2 digits.');
        $('#workFieldsCount1').css({ 'border': '2px solid red' });
    } else {
        errorFieldsCountMessage.hide();
        $('#workFieldsCount1').css({ 'border': '2px solid green' });
    }
}

function  validateLogDescription(){
    let designation = $('#description1').val();
    let errorDetailsMessage = $('.errorMonitoLogDescriptionMessage');

    if (designation.length < 10 || designation.length > 50) {
        errorDetailsMessage.show().text('Log gDescription should be between 10 and 30 characters.');
        $('#description1').css({ 'border': '2px solid red' });
    } else {
        errorDetailsMessage.hide();
        $('#description1').css({ 'border': '2px solid green' });
    }
}

function  validateMonitoLogDetails(){
    let details = $('#logDetails1').val();
    let errorDetailsMessage = $('.errorLogDetailsMessage');

    if (details.length < 10 || details.length > 40) {
        errorDetailsMessage.show().text('Log Details should be between 2 and 10 characters.');
        $('#logDetails1').css({ 'border': '2px solid red' });
    } else {
        errorDetailsMessage.hide();
        $('#logDetails1').css({ 'border': '2px solid green' });
    }
}

// ======================== staff log validate ================================//

$(document).ready(function () {
    $('#logCode1').on('input', validateStaffLogCode);
    $('#workDescription').on('input', validateLogWorkDescriptionDescription);
    $('#workStaffCount').on('input', validateLogWorkStaffCount);
    $('#staffDescription').on('input', validateMonitoLogStaffDescription);
});

function  validateStaffLogCode(){
    let id = $('#logCode1').val();
    let logCodePattern = /^LOG-\d{3}$/;
    let errorLogCodeMessage = $('.errorStaffLogCodeMessage');

    if (!logCodePattern.test(id)) {
        errorLogCodeMessage.show().text('Log Code must match the format LOG-000.');
        $('#logCode1').css({ 'border': '2px solid red' });
    } else {
        errorLogCodeMessage.hide();
        $('#logCode1').css({'border': '2px solid green'});
    }
}

function validateLogWorkStaffCount() {
    let workStaffCount = $('#workStaffCount').val();
    let staffCountPattern = /^[0-9]{2,3}$/;
    let errorStaffCountMessage = $('.errorMonitoLogStaffWordCountMessage');

    if (!staffCountPattern.test(workStaffCount)) {
        errorStaffCountMessage.show().text('Staff Work Count must be a numeric value with up to 2 digits.');
        $('#workStaffCount').css({ 'border': '2px solid red' });
    } else {
        errorStaffCountMessage.hide();
        $('#workStaffCount').css({ 'border': '2px solid green' });
    }
}

function  validateLogWorkDescriptionDescription(){
    let designation = $('#workDescription').val();
    let errorDetailsMessage = $('.errorMonitoLogWorkDescriptionMessage');

    if (designation.length < 10 || designation.length > 50) {
        errorDetailsMessage.show().text(' Description should be between 10 and 50 characters.');
        $('#workDescription').css({ 'border': '2px solid red' });
    } else {
        errorDetailsMessage.hide();
        $('#workDescription').css({ 'border': '2px solid green' });
    }
}

function  validateMonitoLogStaffDescription(){
    let details = $('#staffDescription').val();
    let errorDetailsMessage = $('.errorLogStaffDetailsMessage');

    if (details.length < 10 || details.length > 40) {
        errorDetailsMessage.show().text('Log Staff Details should be between 10 and 40 characters.');
        $('#staffDescription').css({ 'border': '2px solid red' });
    } else {
        errorDetailsMessage.hide();
        $('#staffDescription').css({ 'border': '2px solid green' });
    }
}