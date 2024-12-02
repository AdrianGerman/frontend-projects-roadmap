const Timer = ({ time, session }) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (time % 60).toString().padStart(2, "0")

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold">{session}</h2>
      <div className="text-5xl font-mono mt-2">
        {minutes}:{seconds}
      </div>
    </div>
  )
}

export default Timer
