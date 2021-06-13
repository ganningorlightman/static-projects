(function() {
    var $start = document.querySelector('#start');
    var $game = document.querySelector('#game');
    var $time = document.querySelector('#time');
    var $result = document.querySelector('#result');
    var $timeHeader = document.querySelector('#time-header');
    var $resultHeader = document.querySelector('#result-header');
    var $gameTime = document.querySelector('#game-time');
    var score = 0;
    var isGameStarted = false;
    var colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED']

    $start.addEventListener('click', startGame);
    $game.addEventListener('click', handleSquareClick);
    $gameTime.addEventListener('input', setGameTime);

    function show($el) {
        $el.classList.remove('hide');
    }
    function hide($el) {
        $el.classList.add('hide');
    }

    function startGame() {
        score = 0;
        isGameStarted = true;
        setGameTime();
        $gameTime.setAttribute('disabled', 'true');
        $game.style.backgroundColor = '#fff';
        hide($start);
        var interval = setInterval(function () {
            var time = parseFloat($time.textContent);
            if (time <= 0) {
                clearInterval(interval);
                endGame();
            } else {
                $time.textContent = (time - 0.1).toFixed(1);
            }
        }, 100)
        renderSquare();
    }

    function endGame() {
        isGameStarted = false;
        $game.innerHTML = '';
        setGameScore();
        $gameTime.removeAttribute('disabled');
        $game.style.backgroundColor = '#ccc';
        show($start);
        hide($timeHeader);
        show($resultHeader);
    }

    function handleSquareClick(event) {
        if (!isGameStarted) {
            return
        }
        if (event.target.dataset.square) {
            score++;
            renderSquare();
        }
    }

    function renderSquare() {
        $game.innerHTML = '';

        var squareSize = getRandom(30, 100);
        var gameSize = $game.getBoundingClientRect();
        var maxTop = gameSize.height - squareSize;
        var maxLeft = gameSize.width - squareSize;
        var $square = document.createElement('div');
        var randomColorIndex = getRandom(0, colors.length);

        $square.style.width = $square.style.height = squareSize + 'px';
        $square.style.position = 'absolute';
        $square.style.backgroundColor = colors[randomColorIndex];
        $square.style.top = getRandom(1, maxTop) + 'px';
        $square.style.left = getRandom(1, maxLeft) + 'px';
        $square.style.cursor = 'pointer';
        $square.setAttribute('data-square', 'true');
        $game.insertAdjacentElement('afterbegin', $square);
    }

    function setGameScore() {
        $result.textContent = score.toString();
    }

    function setGameTime() {
        var time = +$gameTime.value;
        $time.textContent = time.toFixed(1);
        show($timeHeader);
        hide($resultHeader);
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
})();