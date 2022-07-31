$(function () {
    let isFinished = false;
    let isErrorOccurred = false;

    $("#start").click(function (e) {

        // flag to track if the game is finished or error occurred
        isFinished = false;
        isErrorOccurred = false;

        //reset div color on start button clicked
        $('#status_msg').css("visibility", "hidden");
        $(".boundary").css("background-color", "#eeeeee");

        //if boundary crossed show error message and change the div color
        $("div.boundary").mouseenter(function () {
            if (!isFinished) {
                isErrorOccurred = true;
                $(".boundary").css("background-color", "#f8c452");
                $('#status_msg')
                .text('Sorry! You have lost the game.')
                .css({
                    'visibility': 'visible',
                    'text-align': 'center',
                    'color': 'red'
                });
            }
        });


        //if the curse arrive to end without crossing any forbidden boundry, show success message
        $("#end").mouseenter(function () {
            if (!isErrorOccurred) {
                isFinished = true;
                isErrorOccurred = false;
                $('#status_msg')
                .text('Congratulations! You have won the game. Click S to start the game again.')
                .css({
                    'visibility': 'visible',
                    'text-align': 'center',
                    'color': 'green'
                });
            }
        });

        // check if user try to leave the game area after they start the game
        $("#maze").mouseleave(function () {
            if (!isFinished) {
                $(".boundary").css("background-color", "#f8c452");
                $('#status_msg')
                .text('Sorry! You have lost the game.')
                .css({
                    'visibility': 'visible',
                    'text-align': 'center',
                    'color': 'red'
                });
            }
        });
    });

});