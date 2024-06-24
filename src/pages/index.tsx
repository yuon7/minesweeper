import { useEffect, useState } from 'react';
import styles from './index.module.css';
const Home = () => {
  const [grade, setGrade] = useState([10, 8, 8]); //ボムの数・縦・横
  const [isStop, setIsStop] = useState(true);
  const [timer, setTimer] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>(
    // 0 -> 未クリック
    // 1 -> 左クリック
    // 2 -> はてな
    // 3 -> 旗
    [...Array(grade[2])].map(() => [...Array(grade[1])].map(() => 0))
  );

  const [bombMap, setBombMap] = useState(
    //-1  -> ボム無し
    // 10 -> ボム有り
    [...Array(grade[2])].map(() => [...Array(grade[1])].map(() => -1))
  );

  const directionList = [
    [1, -1],
    [1, 0],
    [1, 1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
  ];

  const defaultBombs = [...Array(grade[2]).map(() => [...Array(grade[1])].map(() => -1))];
  const defaultUserInputs: 0[][] = [...Array(grade[2])].map(() =>
    [...Array(grade[1])].map(() => 0)
  );

  useEffect(() => {
    if (isStop) {
      return;
    }
    const timerId = setInterval(() => {
      setTimer((c) => c + 1);
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [isStop]);
  // useEffectは発火元->実行したいことをセットで考えよう。

  const checkCoordinate = (X: number, Y: number) => {
    if (X < 0 || X >= grade[1] || Y < 0 || Y >= grade[2]) {
      return true; //縦と横のながさにブーリアン
    }
    return false;
  };

  const checkAround = (board: number[][]) => {
    [...Array(grade[1])].map((_, x) => {
      [...Array(grade[2])].map((_, y) => {
        directionList.map(([a, b]) => {
          const X = a + x;
          const Y = b + y;
          if (!checkCoordinate(X, Y) && board[y][x] === 10 && board[Y][X] !== 10) {
            board[Y][X] += 1;
          }
        });
      });
    });
    setBombMap(board);
  };

  const buryBombs = (x: number, y: number, board: number[][]) => {
    const burying = () => {
      if (board.flat().filter((number) => number === 10).length >= grade[0]) {
        setBombMap(board);
        return;
      }
      const Y = Math.floor(Math.random() * grade[2]);
      const X = Math.floor(Math.random() * grade[1]);
      if (Y === y && X === x) {
        board[Y][X] = -1;
      } else {
        board[Y][X] = 10;
      }
      burying();
    };
    burying();
  };

  const flagCount = grade[0] - userInputs.flat().filter((number) => number === 3).length;

  const isGameClear: boolean =
    userInputs.flat().filter((number) => number === 0).length +
      userInputs.flat().filter((number) => number === 3).length ===
    grade[0];

  const onClick = (x: number, y: number) => {
    const newUserInputs = structuredClone(userInputs);
    const newBombMap = structuredClone(bombMap);

    const fillCell = (x: number, y: number) => {
      if (newUserInputs[y][x] === 0) {
        newUserInputs[y][x] = 1;
      }
      if (newBombMap[y][x] === -1) {
        newBombMap[y][x] = -2;
        directionList.map(([a, b]) => {
          const X = a + x;
          const Y = b + y;
          if (!checkCoordinate(X, Y)) {
            fillCell(X, Y);
          }
        });
      }
    };

    const endGame = () => {
      bombMap.map((row, y) => {
        row.map((number, x) => {
          if (number === 10) {
            newUserInputs[y][x] = 1;
            setUserInputs(newUserInputs);
          }
        });
      });
    };

    // ここからゲーム開始
    if (bombMap.flat().filter((number) => number === 10).length === 0) {
      buryBombs(x, y, newBombMap);
      checkAround(newBombMap);
      setIsStop(false);
    }
    // gameOver
    if (
      (newBombMap[y][x] === 10 && !isGameClear && newUserInputs[y][x] === 0) ||
      newUserInputs[y][x] === 1
    ) {
      endGame();
      setIsStop(true);
      setIsGameOver(true);
      newBombMap[y][x] += 1;
      setBombMap(newBombMap);
    }
    //普通のクリック時の挙動
    if ((!isGameClear && !isGameOver && newUserInputs[y][x] === 0) || newUserInputs[y][x] === 1) {
      fillCell(x, y);
    }
    setUserInputs(newUserInputs);
    setBombMap(newBombMap);
  };
  const onContextMenu = (x: number, y: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newUserInputs = structuredClone(userInputs);
    const num = newUserInputs[y][x];
    if (num === 0 && !isGameClear && !isGameOver) {
      newUserInputs[y][x] = 3; //旗がおいてなければ置く
    } else if (num === 3) {
      newUserInputs[y][x] = 0; //置いてあれば外す
    }
    setUserInputs(newUserInputs);
  };
  useEffect(() => {
    setIsStop(true);
  }, [isGameClear]);

  const reloading = () => {
    setBombMap(defaultBombs);
    setUserInputs(defaultUserInputs);
    setIsStop(true);
    setTimer(0);
    setIsGameOver(false);
  };
  const normal = () => {
    setGrade([10, 9, 9]);
    setIsStop(true);
    setTimer(0);
    reloading();
  };
  const hard = () => {
    setGrade([40, 16, 16]);
    setIsStop(true);
    setTimer(0);
    reloading();
  };
  const expert = () => {
    setGrade([99, 30, 16]);
    setIsStop(true);
    setTimer(0);
    reloading();
  };

  return (
    <div className={styles.container}>
      <div className={styles.levels}>
        <div className={styles.level}>
          <button onClick={normal}>初級</button>
        </div>
        <div className={styles.level}>
          <button onClick={hard}>中級</button>
        </div>
        <div className={styles.level}>
          <button onClick={expert}>上級</button>
        </div>
      </div>
      <div
        className={styles.board}
        style={{
          width: `${grade[1] >= 9 ? 70 + 35.8 * grade[1] : 356.4}px`,
          height: `${200 + 35.8 * grade[2]}px`,
        }}
      >
        <div
          className={styles.top}
          style={{
            width: `${grade[1] >= 9 ? 35.8 * grade[1] : 296.4}px`,
          }}
        >
          <div className={styles.count}>{String(flagCount).padStart(3, '0')}</div>
          <div
            className={styles.face}
            style={{
              backgroundPosition: `${isGameOver ? -520 : isGameClear ? -480 : -440}px 0px`,
            }}
            onClick={() => reloading()}
          />
          <div className={styles.timer}>{String(timer).padStart(3, '0')}</div>
        </div>
        <div
          className={styles.game}
          style={{
            width: `${35.4 * grade[1] + 10}px`,
            height: `${35.4 * grade[2] + 10}px`,
          }}
        >
          <div
            className={styles.boards}
            style={{
              width: `${35 * grade[1]}px`,
              height: `${35 * grade[2]}px`,
            }}
          >
            {userInputs.map((row, y) =>
              row.map((number, x) => (
                <div
                  className={styles.num}
                  style={{
                    backgroundPosition: `${
                      bombMap[y][x] === 11 ? -297 : -29.8 * bombMap[y][x]
                    }px 1.7px`,
                    backgroundColor: `${{ 0: '#c6c6c6', 12: 'red' }[bombMap[y][x] + 1]}`,
                  }}
                  key={`${x}-${y}`}
                >
                  <div
                    className={styles.tile}
                    style={{
                      border: [undefined, '0px'][number],
                      background: ['#c6c6c6', 'transparent'][number],
                    }}
                    key={`${x}-${y}`}
                    onClick={() => onClick(x, y)}
                    onContextMenu={(event) => onContextMenu(x, y, event)}
                  >
                    <div
                      className={styles.flag}
                      style={{
                        backgroundPosition: `${
                          { 0: 30, 1: 30, 2: -184, 3: -207 }[userInputs[y][x]]
                        }px 1.5px`,
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
