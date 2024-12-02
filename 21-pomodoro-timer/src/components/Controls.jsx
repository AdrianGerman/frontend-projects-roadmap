const Controls = ({ onStartStop, onReset, isRunning }) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        className="px-4 py-2 bg-purple-900 text-white rounded transform transition duration-300 hover:bg-purple-950 hover:scale-105"
        onClick={onStartStop}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded transform transition duration-300 hover:bg-red-600 hover:scale-105"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  )
}

export default Controls
