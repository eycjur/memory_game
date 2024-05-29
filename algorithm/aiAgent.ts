import _ from 'lodash';
import { CardType } from '@/redux/cardsSlice';

export const selectCard = (cards: CardType[]): CardType => {
  if (cards.filter(card => card.selected).length === 0) {
    return selectFirstCard(cards);
  } else {
    return selectSecondCard(cards);
  }
}

const selectFirstCard = (cards: CardType[]): CardType => {
  let availableCards = cards.filter(card => !card.finished && !card.selected);

  // 開かれているカードで重複しているものがある場合は、そのカードを選択する
  let openedCards = availableCards.filter(card => card.opened);
  for (let i = 0; i < openedCards.length; i++) {
    for (let j = i + 1; j < openedCards.length; j++) {
      if (openedCards[i].image_id === openedCards[j].image_id) {
        return openedCards[i];
      }
    }
  }

  // 重複しているカードがない場合は開かれていないカードからランダムに選択する
  let notOpenedCards = availableCards.filter(card => !card.opened);
  return _.sample(notOpenedCards)!;
}

const selectSecondCard = (cards: CardType[]): CardType => {
  let availableCards = cards.filter(card => !card.finished && !card.selected);

  let firstCard = cards.filter(card => card.selected);
  let openedCards = availableCards.filter(card => card.opened);

  // 開かれたことがあるカードで1枚目と同じカードがあれば、そのカードを選択する
  let sameCards = openedCards.filter(card => card.image_id === firstCard[0].image_id);
  if (sameCards.length === 1) {
    return sameCards[0];
  }

  // 開かれたことがあるカードで1枚目と同じカードがない場合
  if (openedCards.length > 0) {
    // 開かれたことがあるカードがある場合は、そのカードから選択する
    return _.sample(openedCards)!;
  } else {
    // 全てのカードが開かれたことがない場合は、ランダムに選択する
    return _.sample(availableCards)!;
  }
}
