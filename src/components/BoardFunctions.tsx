const BoardFunctions = ({grid, placeStone, turn, mode}: {grid: number[][], placeStone: (a: number, b: number) => void, turn: number, mode: string}) => {
  const show = (mode === 'black' || (mode === 'playBFirst' && turn % 2 === 1) || (mode === 'playWFirst' && turn % 2 === 0)) ? 'black' : (mode === 'erase' ? 'transparent' : 'white')
  return (
  <div className="z-10">
    {grid.map((row, rowIndex) => (
      <div 
        key={`board row ${rowIndex}`}
        className="flex h-[42px]"
        >
        {row.map((cell, cellIndex) => (
          <div 
            key={`board cell (${cellIndex}, ${rowIndex})`}
            className={`basis-[${1/19}%] aspect-square`}
            >
            <button 
              onClick={() => placeStone(cellIndex, rowIndex)}
              className="h-full w-full"
              >
                {cell === 2 ?  (
                  <div className="bg-black rounded-full w-full h-full z-20"></div>
                ) : (cell === 1 ? (
                  <div className="bg-white rounded-full w-full h-full z-20"></div>
                ) : (
                  <div className={`hover:bg-${show} rounded-full w-full h-full z-20 opacity-70`}></div>
                ))}
            </button>
          </div>
        ))}
      </div>
    ))}
  </div>)
}

export default BoardFunctions