import React from 'react';
import DrawCardContainer from './DrawCardContainer';
import AceCardContainer from './AceCardContainer';
import CardPlayContainer from './CardPlayContainer';

class SolitaireContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCards: [],
            cards: {
                drawPile: {
                    toDraw: [],
                    drawn: []
                },
                inPlay: {
                    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
                },
                ace: {
                    "HEARTS": [], "DIAMONDS": [], "SPADES": [], "CLUBS": []
                }
            }

        }
        this.dealCards = this.dealCards.bind(this)
        this.drawCard = this.drawCard.bind(this)
        this.handleCardClick = this.handleCardClick.bind(this)
        this.playCardFromDrawPile = this.playCardFromDrawPile.bind(this)
    }

    handleCardClick(position) {
        if (position === "drawPile"){
            this.drawCard()  
        } else if (position === "drawn"){
            this.playCardFromDrawPile()
        } else if (position === "inPlay"){

        } else {

        }
    }

    playCardFromDrawPile(){
        
    }

    drawCard() {
        let newCards = this.state.cards
        if (newCards.drawPile.toDraw.length === 0){
            newCards.drawPile.toDraw = newCards.drawPile.drawn
            newCards.drawPile.drawn = []
        } else {
            newCards.drawPile.drawn.push(newCards.drawPile.toDraw.pop())
        }
        this.setState({cards: newCards})
    }

    dealCards() {
        let newAllCards = this.state.allCards
        let newCards = this.state.cards

        for (let card of newAllCards){
            card["hidden"] = true
            if (card.value === "JACK"){
                card.value = "11"
            } else if (card.value === "QUEEN"){
                card.value = "12"
            } else if (card.value === "KING"){
                card.value = "13"
            } else if (card.value === "ACE"){
                card.value = "1"
            }
        }

        for(let i=0; i < 7; i++){
            const numOfCardsToDeal = i + 1;
            let counter = 0;
            while(counter < numOfCardsToDeal){
                newCards.inPlay[`${i}`].push(newAllCards.pop())
                counter++
            }
            newCards.inPlay[`${i}`][newCards.inPlay[`${i}`].length - 1].hidden = false
        }
        newCards.drawPile.toDraw = newAllCards
        this.setState({cards: newCards})
    }

    componentDidMount() {
        const url = "https://deckofcardsapi.com/api/deck/new/draw/?count=52"

        fetch(url)
            .then(res => res.json())
            .then(cards => this.setState({allCards: cards.cards}))
            .catch(err => console.error)
    }

    render() {
        return (
            <div className="game-container">
                <div className="top-bar">
                    <DrawCardContainer cards={this.state.cards.drawPile} onCardClick={this.handleCardClick}></DrawCardContainer>
                    <AceCardContainer cards={this.state.cards.ace} onCardClick={this.handleCardClick}></AceCardContainer>
                </div>
                <CardPlayContainer cards={this.state.cards.inPlay} onCardClick={this.handleCardClick}></CardPlayContainer>
                <button onClick={this.dealCards}>Start Game</button>
            </div>
        )
    }
}

export default SolitaireContainer