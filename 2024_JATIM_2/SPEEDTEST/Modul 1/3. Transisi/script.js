document.addEventListener('DOMContentLoaded', function() {
    function setupTransition(){
        const boxContainer = document.querySelector('.box-container');
        const x = 5;
        const y = 3;
        const boxList = document.querySelectorAll('.box');
        const boxWidth = boxContainer.offsetWidth / x;
        const boxHeight = boxContainer.offsetHeight / y;
        boxList.forEach(function (box, index) {
            box.style.width = boxWidth + 'px';
            box.style.height = boxHeight + 'px';
            const columnIndex = (index % x) + 1;
            const rowIndex = Math.floor(index / x) + 1;
            box.style.gridColumn = columnIndex;
            box.style.gridRow = rowIndex;
            const delay = (index + 1)

            box.style.animation = '1s ease-out ' + delay + 's forwards disappear';
        });
    }

    function clearAnimation(){
        const boxList = document.querySelectorAll('.box');
        boxList.forEach(function (box) {
            box.style.animation = '';
        });
    }

    window.addEventListener('resize', function() {
        clearAnimation();
        setupTransition();
    });
    setupTransition();
});