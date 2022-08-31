const BoardVisuals = () => {
  return (
    <div className="bg-amber-600 aspect-square h-screen -z-10 pointer-events-none absolute">
      <div className="
        mt-[21px]
        ml-[21px]
        w-[756px]
        h-[756px]">
        {Array(18).fill(0).map((row, rowIndex) => (
          <div key={`visual row ${rowIndex}`} className="flex w-full h-[42px] box-content border-b-2 first:border-t-2 border-amber-800 mt-[-2px]">
            {Array(18).fill(0).map((cell, cellIndex) => (
              <div key={`visual cell ${cellIndex}, ${rowIndex}`} className={`box-border border-r-2 first:border-l-2 border-amber-800 basis-[${1/18}%] aspect-square`}>
                {[2, 8, 14].includes(rowIndex) && 
                [2, 8, 14].includes(cellIndex) &&
                <div className="relative ml-[33px] mt-[35px] rounded-full bg-amber-800 w-[16px] aspect-square"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default BoardVisuals