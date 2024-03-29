/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying){
            // 1. Random number
            var dice = dice = Math.floor(Math.random() * 6 )+ 1;    
            // console.log(dice); To check two 6 count appear or not
            // 2. Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png'

            // 3. update the round score if the rolled number was not a 1
            if(dice == 6 && lastDice == 6){
                // player looses global score
                scores[activePlayer] == '0';
                document.querySelector('#score-' + activePlayer).textContent = '0';
                nextPlayer();
            }else if(dice !== 1){
                //add score
                roundScore += dice;
                document.querySelector("#current-" + activePlayer ).textContent = roundScore;
            }else{
            // next player
            nextPlayer();
            }
            lastDice = dice;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore; 
        
        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        //check if player win the game
        // Set the target score
        var targetScore = document.getElementById('target').value;
        // console.log(targetScore);
        // Idenitify if 0 or null or empty field
        var winningScore;
        if(targetScore){
            winningScore = targetScore; // if true (score exist then store into the winningscore)
        }else {
            winningScore = 20; // if false (score not exist in text field then by default 20)
        }
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }else{
        //next player
        nextPlayer();
        }
    }
});

function nextPlayer() {
        //next player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        //set score value 0 when dice count 1
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        //change the backgound color on dice count 1
        document.querySelector('.player-0-panel').classList.toggle('active');    
        document.querySelector('.player-1-panel').classList.toggle('active');    

        // display none for the dice image when dice counter 1
        document.querySelector('.dice').style.display = 'none';
}

// for new game
document.querySelector('.btn-new').addEventListener('click', init);
 
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Hide dice initially
    document.querySelector('.dice').style.display = 'none';
    // set score and global score 0 initially
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add ('active');
}





// document.querySelector("#current-" + activePlayer ).textContent = dice;
// var x = document.querySelector('#score-1').textContent
// console.log(x);

/*
2 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

*/






