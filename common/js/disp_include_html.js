    function dispInc(){
        var url = './common/inc/header.html';

        $.ajax({
            url: url,
            cache: false
        })
        .then(
            // success
            function (data){
                document.write(data);
            }
        );
    }