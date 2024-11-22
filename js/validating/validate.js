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
