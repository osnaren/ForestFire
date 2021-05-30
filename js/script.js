function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var img1 = e.target.result;
            $('#imageResult')
                .attr('src', img1);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});


/*  ==========================================
            SHOW UPLOADED IMAGE NAME
    ========================================== */
var input = document.getElementById('upload');
var infoArea = document.getElementById('upload-label');

input.addEventListener('change', showFileName);

function showFileName(event) {
    document.getElementById('inputimg').style.marginTop = "100px";
    //ii.setAttribute("style","margin-top: 100px;");
    var input = event.srcElement;
    var fileName = input.files[0].name;
    infoArea.textContent = 'File name: ' + fileName;
}

var	wrapper = $( "#button-wrapper" );

$( ".submit" ).click(function() {
    if(wrapper.not( ".checked" )) {
        wrapper.addClass( "checked" );
        setTimeout(function(){
            wrapper.removeClass( "checked" );
        }, 8000);
    }
});
