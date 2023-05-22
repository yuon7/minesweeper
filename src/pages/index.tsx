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

  const newBombMap = JSON.parse(JSON.stringify(bombMap));
  let y_count = -1;
  let x_count = -1;
  for (const one_row_bombMap of bombMap) {
    y_count += 1;
    console.log('jjjj', y_count);
    for (const one_bombMap of one_row_bombMap) {
      x_count += 1;
      if (one_bombMap === 1) {
        board[y_count][x_count] = 11;
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

  //-1 ->石
  //0 ->画像なしセル
  //1~8 ->数字セル
  //9 ->石＋はてな
  //10 ->石＋旗
  //11 ->ボムセル
  //12 ->赤ボム
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
