import Card from "./Cards.js";

/**
 * Gives the List with the name
 * HA ... Heart Ass
 * HT ... Heart Ten
 * 
 * Details after the name: 
 *  #number; // for example 10, or ass, or queen,...
 *  #symbol; // for example, heart, pic,...
 *  modelPath // the path for each 3D-Object: path: ../Scene/Objects/{Heart}{Ass}Obj.glb
 *  scene // gives the Threejs scene
 *  value //gives the value, for easier calculation
 */
const cardDetails = [
    // Spades
    { name: "SA", number: "ace", symbol: "Spade", modelPath: "../Scene/Objects/SpadeAceObj.glb", value: 14 },
    { name: "S2", number: "2", symbol: "Spade", modelPath: "../Scene/Objects/Spade2Obj.glb", value: 2 },
    { name: "S3", number: "3", symbol: "Spade", modelPath: "../Scene/Objects/Spade3Obj.glb", value: 3 },
    { name: "S4", number: "4", symbol: "Spade", modelPath: "../Scene/Objects/Spade4Obj.glb", value: 4 },
    { name: "S5", number: "5", symbol: "Spade", modelPath: "../Scene/Objects/Spade5Obj.glb", value: 5 },
    { name: "S6", number: "6", symbol: "Spade", modelPath: "../Scene/Objects/Spade6Obj.glb", value: 6 },
    { name: "S7", number: "7", symbol: "Spade", modelPath: "../Scene/Objects/Spade7Obj.glb", value: 7 },
    { name: "S8", number: "8", symbol: "Spade", modelPath: "../Scene/Objects/Spade8Obj.glb", value: 8 },
    { name: "S9", number: "9", symbol: "Spade", modelPath: "../Scene/Objects/Spade9Obj.glb", value: 9 },
    { name: "ST", number: "10", symbol: "Spade", modelPath: "../Scene/Objects/SpadeTenObj.glb", value: 10 },
    { name: "SJ", number: "jack", symbol: "Spade", modelPath: "../Scene/Objects/SpadeJackObj.glb", value: 11 },
    { name: "SQ", number: "queen", symbol: "Spade", modelPath: "../Scene/Objects/SpadeQueenObj.glb", value: 12 },
    { name: "SK", number: "king", symbol: "Spade", modelPath: "../Scene/Objects/SpadeKingObj.glb", value: 13 },
    
    // Hearts
    { name: "HA", number: "ace", symbol: "Heart", modelPath: "../Scene/Objects/HeartAceObj.glb", value: 14 },
    { name: "H2", number: "2", symbol: "Heart", modelPath: "../Scene/Objects/Heart2Obj.glb", value: 2 },
    { name: "H3", number: "3", symbol: "Heart", modelPath: "../Scene/Objects/Heart3Obj.glb", value: 3 },
    { name: "H4", number: "4", symbol: "Heart", modelPath: "../Scene/Objects/Heart4Obj.glb", value: 4 },
    { name: "H5", number: "5", symbol: "Heart", modelPath: "../Scene/Objects/Heart5Obj.glb", value: 5 },
    { name: "H6", number: "6", symbol: "Heart", modelPath: "../Scene/Objects/Heart6Obj.glb", value: 6 },
    { name: "H7", number: "7", symbol: "Heart", modelPath: "../Scene/Objects/Heart7Obj.glb", value: 7 },
    { name: "H8", number: "8", symbol: "Heart", modelPath: "../Scene/Objects/Heart8Obj.glb", value: 8 },
    { name: "H9", number: "9", symbol: "Heart", modelPath: "../Scene/Objects/Heart9Obj.glb", value: 9 },
    { name: "HT", number: "10", symbol: "Heart", modelPath: "../Scene/Objects/HeartTenObj.glb", value: 10 },
    { name: "HJ", number: "jack", symbol: "Heart", modelPath: "../Scene/Objects/HeartJackObj.glb", value: 11 },
    { name: "HQ", number: "queen", symbol: "Heart", modelPath: "../Scene/Objects/HeartQueenObj.glb", value: 12 },
    { name: "HK", number: "king", symbol: "Heart", modelPath: "../Scene/Objects/HeartKingObj.glb", value: 13 },
    
    // Diamonds
    { name: "DA", number: "ace", symbol: "Diamond", modelPath: "../Scene/Objects/DiamondAceObj.glb", value: 14 },
    { name: "D2", number: "2", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond2Obj.glb", value: 2 },
    { name: "D3", number: "3", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond3Obj.glb", value: 3 },
    { name: "D4", number: "4", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond4Obj.glb", value: 4 },
    { name: "D5", number: "5", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond5Obj.glb", value: 5 },
    { name: "D6", number: "6", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond6Obj.glb", value: 6 },
    { name: "D7", number: "7", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond7Obj.glb", value: 7 },
    { name: "D8", number: "8", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond8Obj.glb", value: 8 },
    { name: "D9", number: "9", symbol: "Diamond", modelPath: "../Scene/Objects/Diamond9Obj.glb", value: 9 },
    { name: "DT", number: "10", symbol: "Diamond", modelPath: "../Scene/Objects/DiamondTenObj.glb", value: 10 },
    { name: "DJ", number: "jack", symbol: "Diamond", modelPath: "../Scene/Objects/DiamondJackObj.glb", value: 11 },
    { name: "DQ", number: "queen", symbol: "Diamond", modelPath: "../Scene/Objects/DiamondQueenObj.glb", value: 12 },
    { name: "DK", number: "king", symbol: "Diamond", modelPath: "../Scene/Objects/DiamondKingObj.glb", value: 13 },
    
    // Clubs
    { name: "CA", number: "ace", symbol: "Club", modelPath: "../Scene/Objects/ClubAceObj.glb", value: 14 },
    { name: "C2", number: "2", symbol: "Club", modelPath: "../Scene/Objects/Club2Obj.glb", value: 2 },
    { name: "C3", number: "3", symbol: "Club", modelPath: "../Scene/Objects/Club3Obj.glb", value: 3 },
    { name: "C4", number: "4", symbol: "Club", modelPath: "../Scene/Objects/Club4Obj.glb", value: 4 },
    { name: "C5", number: "5", symbol: "Club", modelPath: "../Scene/Objects/Club5Obj.glb", value: 5 },
    { name: "C6", number: "6", symbol: "Club", modelPath: "../Scene/Objects/Club6Obj.glb", value: 6 },
    { name: "C7", number: "7", symbol: "Club", modelPath: "../Scene/Objects/Club7Obj.glb", value: 7 },
    { name: "C8", number: "8", symbol: "Club", modelPath: "../Scene/Objects/Club8Obj.glb", value: 8 },
    { name: "C9", number: "9", symbol: "Club", modelPath: "../Scene/Objects/Club9Obj.glb", value: 9 },
    { name: "CT", number: "10", symbol: "Club", modelPath: "../Scene/Objects/ClubTenObj.glb", value: 10 },
    { name: "CJ", number: "jack", symbol: "Club", modelPath: "../Scene/Objects/ClubJackObj.glb", value: 11 },
    { name: "CQ", number: "queen", symbol: "Club", modelPath: "../Scene/Objects/ClubQueenObj.glb", value: 12 },
    { name: "CK", number: "king", symbol: "Club", modelPath: "../Scene/Objects/ClubKingObj.glb", value: 13 }
  ];  
  
/**
 * BeforeInit()
 * 
 * Creates the Cards based on a model and the picture of the value
 * After that it generates the Cards
 */  

export function BeforeInit() {
    
}

/**
 * Generate the Card Objects
 */
export function GenerateCards() {
    const cards = [];

    cardDetails.forEach(cardDetail => {
        cards.push(new Card(cardDetail.name, cardDetail.number, cardDetail.symbol, cardDetail.modelPath, scene));
    });
    
    return cards;
}

/**
 * MixCards
 * 
 * Shuffle the cards
 */
export function ShuffleCards(cards) {
    console.log("Before shuffle: ", cards);
    for (let index = cards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
    return cards;
}

export function evaluatePlayerHands(player, communityCards, calculateWin) {
    const playerCopy = JSON.parse(JSON.stringify(player));

    playerCopy.combinations = [];

    player.cards.forEach((card1, index1) => {
        player.cards.forEach((card2, index2) => {
            if (index1 === index2) return;

            const playerCombination = [card1, card2];

            communityCards.forEach((_, communityIndex) => {
                const tempCommunityCards = [...communityCards];
                
                tempCommunityCards[communityIndex] = card2;

                const allCards = [...playerCombination, ...tempCommunityCards].map(card => {
                    const cardDetail = cardDetails.find(detail => detail.name === card);
                    return cardDetail ? { ...cardDetail, model: loadThreeJsCardObject(cardDetail.modelPath) } : card;
                });

                const result = calculateWin(allCards);

                playerCopy.combinations.push({
                    playerCombination,
                    tempCommunityCards,
                    result,
                });
            });
        });
    });

    return playerCopy;
}

function calculateWin(cards) {
    const sortedCards = cards.sort((a, b) => b.value - a.value);

    const groups = sortedCards.reduce((acc, card) => {
        acc[card.number] = acc[card.number] ? [...acc[card.number], card] : [card];
        return acc;
    }, {});

    const isFlush = cards.every(card => card.symbol === cards[0].symbol);
    const isStraight = sortedCards.every((card, index, arr) =>
        index === 0 || card.value === arr[index - 1].value - 1
    );

    const pairs = Object.values(groups).filter(group => group.length === 2);
    const threes = Object.values(groups).filter(group => group.length === 3);
    const fours = Object.values(groups).filter(group => group.length === 4);

    if (isStraight && isFlush) {
        return { rank: "Straight Flush", combination: sortedCards };
    } else if (fours.length) {
        return { rank: "Four of a Kind", combination: fours[0] };
    } else if (threes.length && pairs.length) {
        return { rank: "Full House", combination: [...threes[0], ...pairs[0]] };
    } else if (isFlush) {
        return { rank: "Flush", combination: sortedCards };
    } else if (isStraight) {
        return { rank: "Straight", combination: sortedCards };
    } else if (threes.length) {
        return { rank: "Three of a Kind", combination: threes[0] };
    } else if (pairs.length === 2) {
        return { rank: "Two Pair", combination: [...pairs[0], ...pairs[1]] };
    } else if (pairs.length === 1) {
        return { rank: "One Pair", combination: pairs[0] };
    } else {
        return { rank: "High Card", combination: [sortedCards[0]] };
    }
}



export function handleGame(players, communityCards, calculateWin) {
    players.forEach(player => {
        console.log(`Starting turn for ${player.name}`);

        console.log(`${player.name} has completed their turn.`);

        const evaluatedHand = evaluatePlayerHands(player, communityCards, calculateWin);
        console.log(`Evaluated hand for ${player.name}:`, evaluatedHand);
    });

    const results = players.map(player => evaluatePlayerHands(player, communityCards, calculateWin));
    results.forEach(result => {
        console.log(`${result.name}'s best combination:`, result.combinations);
    });

    console.log("Game handling complete.");
}

export default cardDetails;