import { useState } from 'react'
import { initBoard } from './board'
import { BsFillSquareFill, BsFillCheckSquareFill } from 'react-icons/bs'
import BoardVisuals from './components/BoardVisuals'
import BoardFunctions from './components/BoardFunctions'
type History = {
  [key in string]?: number[][];
};

type AppMode = 'playWFirst' | 'playBFirst' | 'white' | 'black' | 'erase'

function App() {
  const [grid, setGrid] = useState<number[][]>(initBoard())
  const [history, setHistory] = useState<History>({1: grid})
  const [turnNumber, setTurnNumber] = useState(1)
  const [mode, setMode] = useState<AppMode>('playBFirst')
  const [showChangeDialog, setShowChangeDialog] = useState(false)
  const [startingPlayer, setStartingPlayer] = useState<'Black' | 'White'>('Black')
  const [clearBoard, setClearBoard] = useState(false)
  const placeStone = (x: number, y: number) => {
    let changed = false
    let newGrid = grid.map((row, rowIndex) => {
      if (rowIndex !== y) {
        return row
      } else {
        return row.map((cell, cellIndex) => {
          if (cellIndex !== x || ((cell !== 0 && (mode !== 'erase')) || (cell === 0 && (mode === 'erase')))) {
            return cell
          } else {
            changed = true
            if (mode === 'playBFirst') return turnNumber % 2 === 0 ? 1 : 2
            if (mode === 'playWFirst') return turnNumber % 2 !== 0 ? 1 : 2
            if (mode === 'black') return 2
            if (mode === 'white') return 1
            if (mode === 'erase') return 0
            return 0
          }
        })
      }
    })
    setGrid(newGrid)
    if (changed && (mode === 'playWFirst' || mode === 'playBFirst')) {
      setTurnNumber(turnNumber + 1)
      const historyCopy = history
      historyCopy[turnNumber + 1] = newGrid
      setHistory(historyCopy)
    }
  }

  const changeMode = (target: 'play' | 'place') => {
    if (target === 'play') {
      if (clearBoard) setGrid(initBoard())
      setTurnNumber(1)
      setHistory({1: grid})
      setMode(startingPlayer === 'Black' ? 'playBFirst' : 'playWFirst')
      setStartingPlayer('Black')
      setClearBoard(false)
      setShowChangeDialog(false)
    } 
  }

  const undo = () => {
    if (turnNumber > 1) {
      let gridOnTurn = history[turnNumber - 1]
      setTurnNumber(turnNumber - 1)
      if (gridOnTurn) {
        setGrid(gridOnTurn)
      }
    }
  }

  return (
    <div className="flex w-screen">
      <div>
        <BoardVisuals/>
        <BoardFunctions grid={grid} placeStone={placeStone} turn={turnNumber} mode={mode}/>
      </div>
      <div className="bg-slate-200 grow flex flex-col justify-start items-center">
        <h1 className="text-xl">Options</h1>
        {(mode === 'playBFirst' || mode === 'playWFirst') && (
        <div>
          <h2 className="text-lg">Play mode options</h2>
          <div className="border-2 border-slate-300 rounded-lg px-2 bg-white">
            <button className="w-full h-full" onClick={undo}>Undo move</button>
          </div>
          <div className="border-2 border-slate-300 rounded-lg px-2 bg-white">
            <button className="w-full h-full" onClick={() => setMode('black')}>Switch to free placement mode</button>
          </div>
        </div>
        )}
        {(mode === 'black' || mode === 'white' || mode === 'erase') &&(
          <div className="flex flex-col items-center">
            <h2 className="text-lg">Placement mode options</h2>
            <div>
              <button onClick={() => setMode('black')} className={`border-y-2 border-l-2 border-slate-300 rounded-l-lg px-2 bg-${mode === 'black' ? 'sky-500' : 'white'}`}>Black</button>
              <button onClick={() => setMode('white')} className={`border-2 border-slate-300 px-2 bg-${mode === 'white' ? 'sky-500' : 'white'}`}>White</button>
              <button onClick={() => setMode('erase')} className={`border-y-2 border-r-2 border-slate-300 rounded-r-lg px-2 bg-${mode === 'erase' ? 'sky-500' : 'white'}`}>Erase</button>
            </div>
            <div className="mt-2">
              <button className="border-2 border-slate-300 rounded-lg px-2 bg-white" onClick={() => setShowChangeDialog(!showChangeDialog)}>{showChangeDialog ? 'Hide dialog' : 'Switch to play mode'}</button>
            </div>
            {showChangeDialog && (
              <div  className="flex flex-col items-center">
                <h2>Starting color:</h2>
                <div>
                  <button onClick={() => setStartingPlayer('Black')} className={`border-2 border-slate-300 rounded-l-lg px-2 bg-${startingPlayer === 'Black' ? 'sky-500' : 'white'}`}>Black</button>
                  <button onClick={() => setStartingPlayer('White')} className={`border-y-2 border-r-2 border-slate-300 rounded-r-lg px-2 bg-${startingPlayer === 'White' ? 'sky-500' : 'white'}`}>White</button>
                </div>
                <div>
                  Clear board on reset: <button onClick={()=>setClearBoard(!clearBoard)}>{clearBoard ? (<BsFillCheckSquareFill />) : (<BsFillSquareFill />)}</button>
                </div>
                <button className="border-2 border-slate-300 rounded-lg px-2 bg-white" onClick={() => changeMode('play')}>Play</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
