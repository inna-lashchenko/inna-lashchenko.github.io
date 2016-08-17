
window.addEventListener("load", start, false);

function Card(suit, val, name, sign)
{
    this.suit = suit;
    this.val = val;
    this.name = name;
    this.sign = sign;

    this.showCard =function showCard()
    {
        var html="";
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
        var suit, sign, name;
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
                sign = i;
                switch(i)
                {
                    case 1: name= "Ace";
                        sign = "A";
                        break;
                    case 2: name= "two";
                        break;
                    case 3: name= "three";
                        break;
                    case 4: name= "four";
                        break;
                    case 5: name= "five";
                        break;
                    case 6: name= "six";
                        break;
                    case 7: name= "seven";
                        break;
                    case 8: name= "eight";
                        break;
                    case 9: name= "nine";
                        break;
                    case 10: name= "ten";
                        break;
                    case 11: name= "jack";
                        sign = "J";
                        break;
                    case 12: name= "queen";
                        sign = "Q";
                        break;
                    case 13: name= "king";
                        sign = "K";
                        break;
                }
                this.deck[numCards] = new Card(suit, i, name, sign);
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
        var val = 0;
        var tempArr = hand;
        tempArr.sort(function(a,b) { return parseFloat(a.val) - parseFloat(b.val) } );
        for(var i=tempArr.length-1; i>=0; i--)
        {
            var temp = tempArr[i];
            if(temp.val === 1 && val <=10)temp.val = 11;
            else if(temp.val >=10) temp.val = 10;
            val += temp.val;
        }
        return val;
    };

    this.emptyDeck = function emptyDeck()
    {
        if(this.deck.length < 1) return true;
        else return false;
    }

    this.deal = function deal()
    {
        status.innerHTML="";
        this.money--;
        money.innerHTML= "YOUR MONEY: " + this.money+"$";
        dealerHand.innerHTML="<h2>Dealer's Hand:</h2>";
        userHand.innerHTML="<h2>Your Hand:</h2>";
        this.userTotal=0;
        this.dealerTotal=0;
        this.userBust=false;
        this.dealerBust=false;
        hit.setAttribute("style", "");
        stand.setAttribute("style", "");
        dealerScore.setAttribute("style", "");
        this.currentUser = [];
        this.currentDealer = [];
        result.setAttribute("style","visibility:visible");


        for(i=0; i<2; i++)
        {
            if(this.emptyDeck())this.newDeck();
            this.currentUser.push(this.deck.pop());
            userHand.innerHTML+=this.currentUser[i].showCard();
        }
        this.userTotal = this.getValue(this.currentUser);
        userScore.innerHTML=this.userTotal;

        for(i=0; i<2; i++)
        {
            if(this.emptyDeck())this.newDeck();
            this.currentDealer.push(this.deck.pop());
            dealerHand.innerHTML+=this.currentDealer[i].showCard();
        }
        this.dealerTotal = this.getValue(this.currentDealer);
        dealerScore.innerHTML=this.dealerTotal;

        var firstCard = dealerHand.getElementsByClassName("card")[0];
        firstCard.setAttribute("id", "hidden-card");
        var blackjack =true;
        if(this.userTotal === 21 && this.dealerTotal < 21) this.gameOver(blackjack);
        else if(this.dealerTotal === 21) this.gameOver();
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
        document.getElementById("hidden-card").setAttribute("id","");

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

        money.innerHTML="YOUR MONEY: "+this.money+"$";

    }

    this.show = function show()
    {
        for(var i=0; i<this.deck.length; i++)
        {
            this.deck[i].showCard();
        }
    };
}


function play()
{
    var deck1 = new Deck();
    deck1.createDeck();
    deck1.shuffle();
    deck1.deal();
    document.getElementById("hit").addEventListener("click", function(){deck1.hit();},false);
    document.getElementById("stand").addEventListener("click", function(){deck1.stand();},false);
    document.getElementById("replay").addEventListener("click", function(){deck1.deal();}, false);
}


function start()
{
    play();
}

