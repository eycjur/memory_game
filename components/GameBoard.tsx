import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@/components/Card';
import { reverseTurn, setIsAITurn } from '@/redux/turnSlice';
import { selectCardById, deselectAllCards, finishCardsById, CardType, initializeCards } from '@/redux/cardsSlice';
import { addScoreHuman, addScoreAI, initializeScore } from '@/redux/scoreSlice';
import { selectCard } from '@/algorithm/aiAgent';

const GameBoard: React.FC = () => {
  const isAITurn: boolean = useSelector((state: any) => state.turn.isAITurn);
  const cards: CardType[] = useSelector((state: any) => state.cards);
  const score: { human: number, ai: number } = useSelector((state: any) => state.score);
  const dispatch = useDispatch();
  const [matchModalVisible, setMatchModalVisible] = useState(false);

  // cardが更新された際に最新の状態を保持するためにrefを使用
  const cardsRef = useRef(cards);

  useEffect(() => {
    if (isAITurn && cardsRef.current.filter(card => !card.finished).length > 0) {
      const play = () => {
        handleCardPress(selectCard(cardsRef.current), true);
        setTimeout(() => {
          handleCardPress(selectCard(cardsRef.current), true);
        }, 500);
      }
      setTimeout(play, 1000);
    }
  }, [isAITurn]);

  const handleCardPress = (card: CardType, playerIsAI: boolean) => {
    console.log("handleCardPress", card, playerIsAI, isAITurn)

    if (playerIsAI !== isAITurn) {
      console.log("It's not your turn");
      return;
    }

    if (cards.filter(c => c.selected).length < 2 && !card.selected && !card.finished) {
      dispatch(selectCardById(card.id))
    }
  };

  useEffect(() => {
    cardsRef.current = cards;

    if (cards.filter(card => card.selected).length === 2) {
      const [firstCard, secondCard] = cards.filter(card => card.selected);
      if (firstCard.image_id === secondCard.image_id) {
        // カードが一致した場合
        dispatch(finishCardsById([firstCard.id, secondCard.id]))
        if (isAITurn) {
          dispatch(addScoreAI(2));
        } else {
          dispatch(addScoreHuman(2));
        }
        // カードをひっくり返すアニメーションで多少ズレが生じるため、モーダル表示も遅らせる
        setTimeout(() => {
          setMatchModalVisible(true);
        }, 200);
        setTimeout(() => {
          setMatchModalVisible(false);
        }, 1000);

        // HACK: AIのターンが連続する場合はターンを切り替えて発火させる
        if (isAITurn) {
          dispatch(reverseTurn());
          setTimeout(() => {
            dispatch(reverseTurn());
          }, 10);
        }
      } else {
        // カードが一致しない場合
        setTimeout(() => {
          dispatch(deselectAllCards());
          dispatch(reverseTurn());
        }, 1000);
      }
    }
  }, [cards]);

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        {isAITurn ? "AI's Turn" : "Player's Turn"}
      </Text>
      <View style={styles.board}>
        {cards.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            onPress={() => handleCardPress(card, false)}
            isFlipped={card.selected || card.finished}
          />
        ))}
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={matchModalVisible}
        >
          <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Matched!</Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={cards.filter(card => card.finished).length === cards.length}
        >
          <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {score.human === score.ai ? "Draw!" : score.human > score.ai ? "You Win!" : "You Lose!"}
            </Text>
            <Pressable
              style={styles.nextButton}
              onPress={() => {
                console.log("Next Game");
                dispatch(initializeScore());
                dispatch(setIsAITurn(false));
                dispatch(initializeCards());
              }}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text>Player: {score.human}</Text>
      <Text>AI: {score.ai}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default GameBoard;
