import { shufleArr } from "../helpers/shufle";
const SET_CARD_OPEN = "SET_CARD_OPEN";
const SET_LOCAL_TIMER = "SET_LOCAL_TIMER";
const ADD_CARD_TO_OPEN_CARDS = "ADD_CARD_TO_OPEN_CARDS";
const CLOSE_ALL_CARDS = "CLOSE_ALL_CARDS";
const TOOGLE_BLOCKED_INTERFACE = "TOOGLE_BLOCKED_INTERFACE";
const TOOGLE_GAME_STARTED = "TOOGLE_GAME_STARTED";
const ADD_CARD_TO_GUESSED_CARD = "ADD_CARD_TO_GUESSED_CARD";
const SET_TIMER_ID = "SET_TIMER_ID";
const SET_INTERVAL_ID = "SET_INTERVAL_ID";
const RESET_GAME = "RESET_GAME";
const SET_GAME_TIME = "SET_GAME_TIME";

const initialState = {
  gameTimer: 0,
  isInterfaceBlocked: false,
  openedCards: [],
  cardsGuessed: 0,
  isGameStart: false,
  isLocalTimer: false,
  timerId: undefined,
  intervalId: undefined,
  cards: [
    { id: 1, isOpen: false, value: "кот", isOnBoard: true },
    { id: 2, isOpen: false, value: "кот", isOnBoard: true },
    { id: 3, isOpen: false, value: "пёс", isOnBoard: true },
    { id: 4, isOpen: false, value: "пёс", isOnBoard: true },
    { id: 5, isOpen: false, value: "рыба", isOnBoard: true },
    { id: 6, isOpen: false, value: "рыба", isOnBoard: true },
    { id: 7, isOpen: false, value: "динозавр", isOnBoard: true },
    { id: 8, isOpen: false, value: "динозавр", isOnBoard: true },
    { id: 9, isOpen: false, value: "мышь", isOnBoard: true },
    { id: 10, isOpen: false, value: "мышь", isOnBoard: true },
    { id: 11, isOpen: false, value: "птица", isOnBoard: true },
    { id: 12, isOpen: false, value: "птица", isOnBoard: true },
  ],
};

export function mainReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CARD_OPEN: {
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.id === action.payload) card.isOpen = true;
          return card;
        }),
      };
    }
    case SET_LOCAL_TIMER: {
      return {
        ...state,
        isLocalTimer: action.payload,
      };
    }
    case ADD_CARD_TO_OPEN_CARDS: {
      return {
        ...state,
        openedCards: [...state.openedCards, action.payload],
      };
    }
    case CLOSE_ALL_CARDS: {
      return {
        ...state,
        cards: state.cards.map((card) => {
          card.isOpen = false;
          return card;
        }),
        openedCards: [],
      };
    }
    case TOOGLE_BLOCKED_INTERFACE: {
      return {
        ...state,
        isInterfaceBlocked: action.payload,
      };
    }
    case TOOGLE_GAME_STARTED: {
      return {
        ...state,
        isGameStart: action.payload,
      };
    }
    case ADD_CARD_TO_GUESSED_CARD: {
      return {
        ...state,
        cardsGuessed: state.cardsGuessed + 2,
        cards: state.cards.map((card) => {
          if (action.payload.some((id) => id === card.id)) {
            card.isOnBoard = false;
          }
          return card;
        }),
      };
    }
    case SET_GAME_TIME: {
      return {
        ...state,
        gameTimer: action.payload,
      };
    }
    case SET_TIMER_ID: {
      return {
        ...state,
        timerId: action.payload,
      };
    }
    case SET_INTERVAL_ID: {
      return {
        ...state,
        intervalId: action.payload,
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        cardsGuessed: 0,
        gameTimer: 0,
        cards: shufleArr(
          state.cards.map((card) => {
            card.isOnBoard = true;
            return card;
          })
        ),
      };
    }
    default:
      return state;
  }
}

// actions
export const setLocalTimerAC = (bool) => {
  return {
    type: SET_LOCAL_TIMER,
    payload: bool,
  };
};

export const setCardOpenAC = (id) => {
  return {
    type: SET_CARD_OPEN,
    payload: id,
  };
};

export const addCardToOpenedCardsAC = (data) => {
  return {
    type: ADD_CARD_TO_OPEN_CARDS,
    payload: data,
  };
};

export const closeAllCardsAC = () => {
  return {
    type: CLOSE_ALL_CARDS,
  };
};

export const toogleIsBlockedInterfaceAC = (bool) => {
  return {
    type: TOOGLE_BLOCKED_INTERFACE,
    payload: bool,
  };
};

export const toggleIsGameStartedAC = (bool) => {
  return {
    type: TOOGLE_GAME_STARTED,
    payload: bool,
  };
};

export const addCardToGuessedCardsAC = (id1, id2) => {
  return {
    type: ADD_CARD_TO_GUESSED_CARD,
    payload: [id1, id2],
  };
};

const setTimerIdAC = (id) => {
  return {
    type: SET_TIMER_ID,
    payload: id,
  };
};

const setIntervalIdAC = (id) => {
  return {
    type: SET_INTERVAL_ID,
    payload: id,
  };
};

const setGameTimeAC = (seconds) => {
  return {
    type: SET_GAME_TIME,
    payload: seconds,
  };
};

const closeAllCardsThunk = () => {
  return (dispatch) => {
    dispatch(toogleIsBlockedInterfaceAC(true));
    setTimeout(() => {
      dispatch(closeAllCardsAC());
      dispatch(toogleIsBlockedInterfaceAC(false));
    }, 1000);
  };
};

const addCardsToGuessedThunk = (id1, id2) => {
  return (dispatch) => {
    dispatch(toogleIsBlockedInterfaceAC(true));
    setTimeout(() => {
      dispatch(addCardToGuessedCardsAC(id1, id2));
      dispatch(toogleIsBlockedInterfaceAC(false));
    }, 1000);
  };
};

const resetGame = () => {
  return {
    type: RESET_GAME,
  };
};

export const endGame = () => {
  return (dispatch, getState) => {
    let {intervalId, gameTimer} = getState().mainReducer;
    dispatch(toggleIsGameStartedAC(false));
    clearInterval(intervalId);

    let times = JSON.parse(localStorage.getItem("times")) || [];
    times.push(gameTimer);
    localStorage.setItem("times", JSON.stringify(times))
  };
};

export let setCardOpen = (id, value) => {
  return (dispatch, getState) => {
    dispatch(setCardOpenAC(id));
    let { openedCards, isLocalTimer, cardsGuessed } = getState().mainReducer;
    if (!isLocalTimer) {
      dispatch(setLocalTimerAC(true));
      let timerId = setTimeout(() => {
        // время вышло :()
        dispatch(setLocalTimerAC(false));
        dispatch(closeAllCardsAC());
      }, 3000);
      dispatch(setTimerIdAC(timerId));
    }
    if (openedCards.length === 1) {
      if (openedCards[0].value === value) {
        dispatch(addCardsToGuessedThunk(openedCards[0].id, id));
        if (cardsGuessed === 14) dispatch(endGame());
      } else {
        // dispatch(setLocalTimerAC(false));
      }
      dispatch(closeAllCardsThunk());
      dispatch(setLocalTimerAC(false));
      window.clearTimeout(getState().mainReducer.timerId);
    } else {
      dispatch(addCardToOpenedCardsAC({ id, value }));
    }
  };
};

export const startGame = () => {
  return (dispatch, getState) => {
    dispatch(toggleIsGameStartedAC(true));
    dispatch(resetGame());
    let gameTimer = getState().mainReducer.gameTimer;
    let intervalId = setInterval(() => {
      gameTimer++;
      dispatch(setGameTimeAC(gameTimer));
    }, 1000);
    dispatch(setIntervalIdAC(intervalId));
  };
};
