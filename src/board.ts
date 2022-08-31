const initBoard = () => {
  return Array(19).fill(0).map(() => [...Array(19).fill(0)])
}

export {
  initBoard,
}