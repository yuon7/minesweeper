import { useState } from 'react';
import styles from './index.module.css';
const Home = () => {
  //cellの下地参照ボード
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    //0 未クリック
    //1 左クリック
    //2 はてな
    //3 旗
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const newUserInputs = JSON.parse(JSON.stringify(userInputs));
  const board: number[][] = [
    //-1 ->石
    //0 ->空白セル
    //1~8 ->数字セル
    //9 ->石＋はてな
    //10 ->石＋旗
    //11 ->ボムセル
    //12 ->赤ボム
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const [bombMap, setBombMap] = useState([
    //以下はボムの場所を決める際のボード
    //0 ボムなし
    //1 ボムあり
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const directionList = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  const checkAround = (x: number, y: number) => {
    let countBombs = 0;
    for (const direction of directionList) {
      if (
        board[y + direction[0]] !== undefined &&
        bombMap[y + direction[0]][x + direction[1]] === 1
      ) {
        countBombs += 1;
      }
    }
    board[y][x] = countBombs;
    if (countBombs === 0) {
      for (const direction of directionList) {
        if (
          board[y + direction[0]] !== undefined &&
          (board[y + direction[0]][x + direction[1]] === -1 ||
            board[y + direction[0]][x + direction[1]] === 9 ||
            board[y + direction[0]][x + direction[1]] === 10)
        ) {
          checkAround(x + direction[1], y + direction[0]);
        }
      }
    }
  };

  const newBombMap = JSON.parse(JSON.stringify(bombMap));
  let y_bomb_count = -1;
  for (const one_row_bombMap of bombMap) {
    y_bomb_count += 1;
    console.log(y_bomb_count);
    let x_bomb_count = -1;
    for (const one_bombMap of one_row_bombMap) {
      x_bomb_count += 1;
      if (one_bombMap === 1) {
        board[y_bomb_count][x_bomb_count] = 11;
      }
    }
  }
  let y_user_count = -1;
  for (const one_row_userInputs of userInputs) {
    y_user_count = 1;
    const x_user_count = -1;
    for (const one_userInputs of one_row_userInputs) {
      if (one_userInputs === 2) {
        board[y_user_count][x_user_count] = 9;
      } else if (one_userInputs === 3) {
        board[y_user_count][x_user_count] = 10;
      } else if (one_userInputs === 1) {
        checkAround;
      }
    }
  }
  console.table(board);

  const clickCell = (x: number, y: number) => {
    newUserInputs[y][x] = 1;
    console.table(newUserInputs);
    setUserInputs(newUserInputs);
    const setBombRandom = () => {
      const a = Math.floor(Math.random() * 9);
      const b = Math.floor(Math.random() * 9);
      if (newBombMap[b][a] === 0) {
        newBombMap[b][a] = 1;
      } else {
        setBombRandom();
      }
    };
    if (newBombMap.some((row: number[]) => row.includes(1))) {
      //
    } else {
      console.log(x, y);
      newBombMap[y][x] = 1;
      for (let count = 1; count < 11; count += 1) {
        setBombRandom();
      }

      newBombMap[y][x] = 0;
    }
    console.table(newBombMap);
    setBombMap(newBombMap);
    //以下はボムの場所を決める際のボード
    //0 ボムあり
    //1 ボムなし

    //const bombCount = 10;
    //const

    console.log(x, y);
    //const bombMap = JSON.parse(JSON.stringify(userInputs));
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {userInputs.map((row, y) =>
          row.map((cell, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}}`}
              onClick={() => clickCell(x, y)}
              style={{ backgroundPosition: -30 * cell + 30 }}
            >
              <div className={styles.stone} />
              {/* {bombMap[y][x]} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
