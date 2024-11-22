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

