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

  const checkAround = (y: number, x: number) => {
    let countBombs = 0;
    for (const direction of directionList) {
      if (
        board[y + direction[0]] !== undefined &&
        board[x + direction[1]] !== undefined &&
        bombMap[y + direction[0]][x + direction[1]] === 1
      ) {
        countBombs += 1;
      }
    }
    board[y][x] = countBombs;
    // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    if (countBombs === 0) {
      for (const direction of directionList) {
        if (
          board[y + direction[0]] !== undefined &&
          (board[y + direction[0]][x + direction[1]] === -1 ||
            board[y + direction[0]][x + direction[1]] === 9 ||
            board[y + direction[0]][x + direction[1]] === 10)
        ) {
          checkAround(y + direction[0], x + direction[1]);
        }
      }
    }
  };

  const newBombMap = JSON.parse(JSON.stringify(bombMap));
  // let y_bomb_count = -1;
  // for (const one_row_bombMap of bombMap) {
  //   y_bomb_count += 1;
  //   console.log(y_bomb_count);
  //   let x_bomb_count = -1;
  //   for (const one_bombMap of one_row_bombMap) {
  //     x_bomb_count += 1;
  //     if (one_bombMap === 1) {
  //       board[y_bomb_count][x_bomb_count] = 11;
  //     }s
  //   }
  // }

  const newUserInputs = JSON.parse(JSON.stringify(userInputs));
  let y_user_count = -1;
  for (const one_row_userInputs of userInputs) {
    y_user_count += 1;
    let x_user_count = -1;
    for (const one_userInputs of one_row_userInputs) {
      x_user_count += 1;
      if (one_userInputs === 2) {
        board[y_user_count][x_user_count] = 9;
      } else if (one_userInputs === 3) {
        board[y_user_count][x_user_count] = 10;
      } else if (one_userInputs === 1 && bombMap[y_user_count][x_user_count] === 0) {
        checkAround(y_user_count, x_user_count);
      }
    }
  }

  const clickCell = (y: number, x: number) => {
    if (!bombMap.some((row, y) => row.some((bomb, x) => bomb === 1 && userInputs[y][x] === 1))) {
      newUserInputs[y][x] = 1;
      setUserInputs(newUserInputs);

      //ボムをランダムに配置する再起関数
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
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (newBombMap[y + i] !== undefined) {
              newBombMap[y + i][x + j] = 1;
            }
          }
        }
        for (let count = 1; count < 11; count += 1) {
          setBombRandom();
        }
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            if (newBombMap[y + i] !== undefined) {
              newBombMap[y + i][x + j] = 0;
            }
          }
        }
      }
    }
    //以下はボムの場所を決める際のボード
    //0 ボムあり
    //1 ボムなし

    //const bombCount = 10;
    //const

    // console.log(x, y);
    //const bombMap = JSON.parse(JSON.stringify(userInputs));

    setBombMap(newBombMap);
  };

  console.log('newBombMap');
  console.table(newBombMap);

  console.log('board');
  console.table(board);

  console.log('newUserInputs');
  console.table(newUserInputs);
  if (bombMap.some((row, y) => row.some((bomb, x) => bomb === 1 && userInputs[y][x] === 1))) {
    for (let n = 0; n < 9; n++) {
      for (let m = 0; m < 9; m++) {
        if (bombMap[n][m] === 1) {
          board[n][m] = 11;
          if (userInputs[n][m] === 1) {
            board[n][m] = 111;
          }
        }
      }
    }
  }

  const onRightClick = (x: number, y: number) => {
    switch (userInputs[y][x]) {
      case 0:
        newUserInputs[y][x] = 2;
        board[y][x] = 9;
        break;
      case 2:
        newUserInputs[y][x] = 3;
        board[y][x] = 10;
        break;
      case 3:
        newUserInputs[y][x] = 0;
        board[y][x] = -1;
        break;
    }
    setUserInputs(newUserInputs);
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBorder}>
        <div
          className={styles.cell}
          style={
            {
              // width: 60,
              // height: 60,
              // backgroundSize: 900,
              // backgroundPosition: game === 0 ? -710 : -773,
            }
          }
        />
      </div>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}}`}
              onClick={() => clickCell(y, x)}
              onContextMenu={(e) => {
                e.preventDefault();
                onRightClick(x, y);
              }}
              style={{
                backgroundPosition: -30 * (cell % 100) + 30,
                backgroundColor: cell === 111 ? '#f00' : '#0000',
              }}
            >
              {cell === -1 && <div className={styles.stone} />}
              {/* {bombMap[y][x]} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
