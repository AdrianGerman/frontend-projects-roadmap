import { create } from "zustand"

const useQuiz = create((set) => ({
  score: 0,
  currentQuestionIndex: 0,
  timeLeft: 60,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      timeLeft: 60
    })),
  resetQuiz: () =>
    set((state) => ({ timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 })),
  decrementTime: () =>
    set((state) => ({ timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0 }))
}))

export default useQuiz
