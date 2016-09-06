
window.addEventListener("load", start, false);

function start()
{
    newGame();
}

function newGame()
{
    var deck1 = new Deck();
    deck1.createDeck();
    deck1.shuffle();
    deck1.deal();
    document.getElementById("hit").addEventListener("click", function(){deck1.hit();},false);
    document.getElementById("stand").addEventListener("click", function(){deck1.stand();},false);
    document.getElementById("replay").addEventListener("click", function(){deck1.deal();}, false);
}


function Card(suit, val, sign)
{
    this.suit = suit;
    this.val = val;
    this.sign = sign;
}

Card.prototype.showCard =function showCard()
{
    var html="", suit_text="";

    switch(this.suit)
    {
        case "hearts": suit_text = "&hearts;";
            break;
        case "diamonds": suit_text = "&diams;";
            break;
        case "spades": suit_text = "&spades;";
            break;
        case "clubs": suit_text = "&clubs;";
            break;
    }
    html="<div class='card " + this.suit + "'><div class='card-value'>" + this.sign + "</div><div class='suit'>" + suit_text + "</div><div class='main-number'>"+this.sign +"</div><div class='invert card-value'>"+this.sign+"</div><div class='invert suit'>"+suit_text+"</div></div>";
        return html;
}


function Deck()
{
    this.deck = [];
    this.money = 100;
    var userHand = document.getElementById("user-hand");
    var dealerHand = document.getElementById("dealer-hand");
    var userScore = document.getElementById("user-score");
    var dealerScore = document.getElementById("dealer-score");
    var status = document.getElementById("game-status");
    var moneyDiv = document.getElementById("money");
    var bust = document.getElementById("bust");
    var result = document.getElementById("result");

    this.newDeck = function newDeck()
    {
        this.createDeck();
        this.shuffle();

    }

    this.createDeck = function createDeck()
    {
        var numCards=0;
        var suit, sign;
        for(var k=1; k<=4; k++)
        {
            switch(k)
            {
                case 1: suit ="hearts";
                    break;
                case 2: suit ="diamonds";
                    break;
                case 3: suit ="spades";
                    break;
                case 4: suit ="clubs";
                    break;
            }

            for(var i=1; i<=13; i++)
            {
                switch(i)
                {
                    case 1: sign = "A";
                        break;
                    case 11: sign = "J";
                        break;
                    case 12: sign = "Q";
                        break;
                    case 13: sign = "K";
                        break;
                    default: sign = i;
                        break;
                }
                this.deck[numCards] = new Card(suit, i, sign);
                numCards++;
            }
        }
    }

    this.shuffle = function shuffle()
    {
        var randomDeck = [];
        var empty = false;
        while(!empty)
        {
            var randomIndex = Math.floor(Math.random()*this.deck.length);
            randomDeck.push(this.deck[randomIndex]);
            this.deck.splice(randomIndex, 1);
            if(this.deck.length <=0) empty = true;
        }
        for(var i=0; i<randomDeck.length; i++)
        {
            this.deck[i] = randomDeck[i];
        }
    };


    this.getValue = function getValue(hand)
    {
        console.log(hand);
        var result=0, aces=0, temp=0;
        for(var i=0; i<hand.length; i++){
            if(hand[i].val>=10){temp=10;}
            else if(hand[i].val==1){temp=11; aces++;}
            else temp=hand[i].val;
            result+=temp;
        }
        if(result>21&&aces>0){
            do{
                result=result-10;
                aces--;
            }
            while(result>21&&aces>0)
        }

        return result;
    };

    this.emptyDeck = function emptyDeck()
    {
        if(this.deck.length < 1) return true;
        else return false;
    }

    this.deal = function deal()
    {
        if(this.money<=0){
            result.innerHTML="OUT OF MONEY";
            hit.setAttribute("style", "visibility:hidden;");
            stand.setAttribute("style", "visibility:hidden;");
            replay.setAttribute("style", "visibility:hidden;");
        }
        else {
            this.money--;
            status.innerHTML = "";
            moneyDiv.innerHTML = "YOUR MONEY: " + this.money + "$";
            dealerHand.innerHTML = "<h2>Dealer's Hand:</h2>";
            userHand.innerHTML = "<h2>Your Hand:</h2>";
            this.userTotal = 0;
            this.dealerTotal = 0;
            this.userBust = false;
            this.dealerBust = false;
            hit.setAttribute("style", "");
            stand.setAttribute("style", "");
            dealerScore.setAttribute("style", "");
            this.currentUser = [];
            this.currentDealer = [];
            result.setAttribute("style", "visibility:visible");


            for (var i = 0; i < 2; i++) {
                if (this.emptyDeck())this.newDeck();
                this.currentUser.push(this.deck.pop());
                userHand.innerHTML += this.currentUser[i].showCard();
            }
            this.userTotal = this.getValue(this.currentUser);
            userScore.innerHTML = this.userTotal;

            for (var i = 0; i < 2; i++) {
                if (this.emptyDeck())this.newDeck();
                this.currentDealer.push(this.deck.pop());
                dealerHand.innerHTML += this.currentDealer[i].showCard();
            }
            this.dealerTotal = this.getValue(this.currentDealer);
            dealerScore.innerHTML = this.dealerTotal;


            var blackjack = true;
            if (this.userTotal === 21 && this.dealerTotal < 21) this.gameOver(blackjack);
            else if (this.dealerTotal === 21) this.gameOver();
        }
    };

    this.hit = function hit()
    {
        if(this.emptyDeck())this.newDeck();
        this.currentUser.push(this.deck.pop());
        userHand.innerHTML+=this.currentUser[this.currentUser.length-1].showCard();
        this.userTotal = this.getValue(this.currentUser);
        userScore.innerHTML=this.userTotal;
        if(this.userTotal >21)
        {
            bust.innerHTML+=" <span style='color:red; font-weight: bold;'>YOU BUSTED</span>";
            result.setAttribute("style","visibility:hidden");
            bust.setAttribute("style","visibility:visible");
            this.userBust = true;
            this.gameOver();
        }
    };

    this.stand = function stand()
    {
        while(this.dealerTotal < 17)
        {
            if(this.emptyDeck())this.newDeck();
            this.currentDealer.push(this.deck.pop());
            dealerHand.innerHTML+=this.currentDealer[this.currentDealer.length-1].showCard();
            this.dealerTotal = this.getValue(this.currentDealer);
            dealerScore.innerHTML=this.dealerTotal;
            if(this.dealerTotal > 21)
            {
                this.dealerBust = true;
            }
        }
        this.gameOver();
    }

    this.gameOver = function gameOver(blackjack)
    {


        hit.setAttribute("style", "visibility:hidden;");
        stand.setAttribute("style", "visibility:hidden;");

        if(blackjack)
        {
            this.money +=3;
            result.setAttribute("style","visibility:hidden");
            status.innerHTML ="YOU GOT BLACKJACK";


        }

        else if(this.userTotal > this.dealerTotal && this.userBust === false || this.dealerBust ===true)
        {

            this.money+=2;
            result.setAttribute("style","visibility:hidden");
            status.innerHTML ="YOU WIN!";
        }
        else if(this.userTotal === this.dealerTotal && this.userBust === false)
        {

            this.money++;
            result.setAttribute("style","visibility:hidden");
            status.innerHTML="TIE";

        }

        else {result.setAttribute("style","visibility:hidden");
            status.innerHTML="YOU LOSE!";}


    }

    this.show = function show()
    {
        for(var i=0; i<this.deck.length; i++)
        {
            this.deck[i].showCard();
        }
    };
}



