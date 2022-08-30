const VisualBoard = () => {
  return (
    <div className="bg-amber-600 w-[950px] h-[950px] -z-10 pointer-events-none absolute">
      <div className="
        mt-[25px]
        ml-[25px]
        w-[900px]
        h-[900px]">
        {Array(18).fill(0).map((row, rowIndex) => (
          <div key={`visual row ${rowIndex}`} className="flex w-full h-[50px] box-content border-b-2 first:border-t-2 border-amber-800 mt-[-2px]">
            {Array(18).fill(0).map((cell, cellIndex) => (
              <div key={`visual cell ${cellIndex}, ${rowIndex}`} className={`box-border border-r-2 first:border-l-2 border-amber-800 basis-[${1/18}%] aspect-square`}>
                {[2, 8, 14].includes(rowIndex) && 
                [2, 8, 14].includes(cellIndex) &&
                <div className="relative ml-[40px] mt-[40px] rounded-full bg-amber-800 w-[20px] aspect-square"></div>}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VisualBoard