import { useState } from 'react'
import { initBoard } from './board'
import VisualBoard from './components/VisualBoard'
function App() {
  const [grid, setGrid] = useState(initBoard())
  const [history, setHistory] = useState([grid])
  const placeStone = (x: number, y: number, color: 'white' | 'black') => {
    setGrid(grid.map((row, rowIndex) => {
      if (rowIndex !== y) {
        return row
      } else {
        return row.map((cell, cellIndex) => {
          if (cellIndex !== x) {
            return cell
          } else {
            return color === 'white' ? 1 : 2
          }
        })
      }
    }))
  }
  return (
    <div className="w-full">
      <VisualBoard/>
      <div className="z-10">
        {grid.map((row, rowIndex) => (
          <div 
            key={`board row ${rowIndex}`}
            className="flex h-[50px]"
            >
            {row.map((cell, cellIndex) => (
              <div 
                key={`board cell (${cellIndex}, ${rowIndex})`}
                className={`basis-[${1/19}%] aspect-square`}
                >
                <button 
                  onClick={() => placeStone(cellIndex, rowIndex, 'black')}
                  className="h-full w-full"
                  >
                    {cell === 2 ?  (
                      <div className="bg-black rounded-full w-full h-full z-20"></div>
                    ) : (cell === 1 ? (
                      <div className="bg-white rounded-full w-full h-full z-20"></div>
                    ) : 
                      <div>
                      </div>)}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
