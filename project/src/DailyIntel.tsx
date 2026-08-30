import { useState, useEffect, useCallback } from 'react'
import { supabase, type DailyIntelQuestion } from './lib/supabase'

interface DailyIntelProps {
  embedded?: boolean
}

type GameState = 'loading' | 'question' | 'answered' | 'no-question'
type View = 'today' | 'history'

interface AnsweredRecord {
  user_answer: boolean
  correct: boolean
}

export default function DailyIntel({ embedded = false }: DailyIntelProps) {
  const [gameState, setGameState] = useState<GameState>('loading')
  const [view, setView] = useState<View>('today')
  const [question, setQuestion] = useState<DailyIntelQuestion | null>(null)
  const [historyQuestions, setHistoryQuestions] = useState<DailyIntelQuestion[]>([])
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null)
  const [isCorrect, setIsCorrect] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<DailyIntelQuestion | null>(null)

  const loadLocalStats = useCallback(() => {
    const savedStreak = localStorage.getItem('di_streak')
    const savedBest = localStorage.getItem('di_best_streak')
    const savedTotal = localStorage.getItem('di_total')
    const savedCorrect = localStorage.getItem('di_correct')
    const lastAnswerDate = localStorage.getItem('di_last_answer_date')
    const today = new Date().toISOString().split('T')[0]

    let currentStreak = savedStreak ? parseInt(savedStreak) : 0
    if (lastAnswerDate && lastAnswerDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
      if (lastAnswerDate !== yesterday) {
        currentStreak = 0
      }
    }
    setStreak(currentStreak)
    setBestStreak(savedBest ? parseInt(savedBest) : 0)
    setTotalAnswered(savedTotal ? parseInt(savedTotal) : 0)
    const correctCount = savedCorrect ? parseInt(savedCorrect) : 0
    setAccuracy(savedTotal ? Math.round((correctCount / parseInt(savedTotal)) * 100) : 0)
  }, [])

  const checkAlreadyAnswered = useCallback((qId: string) => {
    const answeredKey = `di_answered_${qId}`
    const saved = localStorage.getItem(answeredKey)
    if (saved) {
      const parsed: AnsweredRecord = JSON.parse(saved)
      setUserAnswer(parsed.user_answer)
      setIsCorrect(parsed.correct)
      setGameState('answered')
      return true
    }
    return false
  }, [])

  const fetchQuestion = useCallback(async () => {
    setGameState('loading')
    loadLocalStats()

    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('daily_intel_questions')
      .select('*')
      .lte('publish_date', today)
      .order('publish_date', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) {
      setGameState('no-question')
      return
    }

    setQuestion(data)
    if (!checkAlreadyAnswered(data.id)) {
      setGameState('question')
    }
  }, [loadLocalStats, checkAlreadyAnswered])

  const fetchHistory = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('daily_intel_questions')
      .select('*')
      .lt('publish_date', today)
      .order('publish_date', { ascending: false })
      .limit(20)

    if (!error && data) {
      setHistoryQuestions(data)
    }
  }, [])

  useEffect(() => {
    fetchQuestion()
  }, [fetchQuestion])

  useEffect(() => {
    if (view === 'history') {
      fetchHistory()
    }
  }, [view, fetchHistory])

  const handleAnswer = async (answer: boolean) => {
    if (!question || submitting) return
    setSubmitting(true)
    setUserAnswer(answer)
    const correct = answer === question.answer
    setIsCorrect(correct)

    const today = new Date().toISOString().split('T')[0]
    const lastAnswerDate = localStorage.getItem('di_last_answer_date')
    let newStreak = streak

    if (correct) {
      if (lastAnswerDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        if (lastAnswerDate === yesterday) {
          newStreak = streak + 1
        } else {
          newStreak = 1
        }
      }
    } else {
      newStreak = 0
    }

    setStreak(newStreak)
    localStorage.setItem('di_streak', String(newStreak))
    localStorage.setItem('di_last_answer_date', today)

    const newTotal = totalAnswered + 1
    const savedCorrect = localStorage.getItem('di_correct')
    const correctCount = (savedCorrect ? parseInt(savedCorrect) : 0) + (correct ? 1 : 0)
    localStorage.setItem('di_total', String(newTotal))
    localStorage.setItem('di_correct', String(correctCount))
    setTotalAnswered(newTotal)
    setAccuracy(Math.round((correctCount / newTotal) * 100))

    if (newStreak > bestStreak) {
      setBestStreak(newStreak)
      localStorage.setItem('di_best_streak', String(newStreak))
    }

    const answeredKey = `di_answered_${question.id}`
    localStorage.setItem(answeredKey, JSON.stringify({ user_answer: answer, correct }))

    const { data: sessionData } = await supabase.auth.getSession()
    if (sessionData.session) {
      await supabase.from('daily_intel_answers').insert({
        question_id: question.id,
        user_answer: answer,
        correct,
        streak: newStreak,
      })
    }

    setSubmitting(false)
    setGameState('answered')
  }

  const getAnsweredRecord = (qId: string): AnsweredRecord | null => {
    const saved = localStorage.getItem(`di_answered_${qId}`)
    return saved ? JSON.parse(saved) : null
  }

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // --- Loading state ---
  if (gameState === 'loading') {
    return (
      <div className={`vault-corner border border-concrete-700 bg-concrete-900 ${embedded ? 'p-6' : 'p-8'}`}>
        <div className="flex items-center gap-3 font-mono text-sm text-concrete-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-vault-300" />
          <span className="tracking-wider">DECRYPTING SIGNAL...</span>
        </div>
      </div>
    )
  }

  // --- No question available ---
  if (gameState === 'no-question' && view === 'today') {
    return (
      <div className={`vault-corner border border-concrete-700 bg-concrete-900 ${embedded ? 'p-6' : 'p-8'}`}>
        <div className="text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-concrete-600">NO SIGNAL TODAY</div>
          <p className="mb-6 font-mono text-sm text-concrete-400">Today's intel briefing has not been deployed yet. Check back shortly.</p>
          <button
            onClick={() => { setView('history'); fetchHistory() }}
            className="border-2 border-concrete-600 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-concrete-300 transition-all hover:border-vault-200 hover:text-vault-200"
          >
            Browse Archive
          </button>
        </div>
      </div>
    )
  }

  // --- History view ---
  if (view === 'history') {
    if (selectedHistoryItem) {
      const record = getAnsweredRecord(selectedHistoryItem.id)
      return (
        <div className={`vault-corner border border-concrete-700 bg-concrete-900 ${embedded ? 'p-6' : 'p-8'}`}>
          <button
            onClick={() => setSelectedHistoryItem(null)}
            className="mb-4 font-mono text-xs text-concrete-500 hover:text-vault-300"
          >
            ← ARCHIVE
          </button>
          <div className="mb-4 flex items-center gap-2">
            <span className="border border-vault-500/50 bg-vault-900/20 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
              {selectedHistoryItem.category}
            </span>
            <span className="font-mono text-xs text-concrete-600">{formatDate(selectedHistoryItem.publish_date)}</span>
          </div>
          <p className="mb-6 font-display text-lg font-bold leading-snug text-concrete-100">
            {selectedHistoryItem.statement}
          </p>
          {record ? (
            <div className="mb-4 border-l-4 p-4" style={{ borderColor: record.correct ? '#facc15' : '#c2410c', backgroundColor: record.correct ? 'rgba(250,204,21,0.08)' : 'rgba(194,65,12,0.08)' }}>
              <div className="mb-2 flex items-center gap-2">
                <span className="font-display text-lg font-bold" style={{ color: record.correct ? '#facc15' : '#e2580c' }}>
                  {record.correct ? '✓ CORRECT' : '✗ INCORRECT'}
                </span>
                <span className="font-mono text-xs text-concrete-500">
                  You answered: {record.user_answer ? 'Documented' : 'Disinformation'}
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-4 border-l-4 border-concrete-600 bg-concrete-800/30 p-4">
              <p className="font-mono text-xs text-concrete-500">Not answered</p>
            </div>
          )}
          <div className="mb-4 border-l-2 border-vault-200/40 bg-vault-900/10 px-4 py-3">
            <p className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
              Answer: {selectedHistoryItem.answer ? 'Documented' : 'Disinformation'}
            </p>
            <p className="font-mono text-xs leading-relaxed text-concrete-300">{selectedHistoryItem.explanation}</p>
          </div>
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-concrete-600">
            <span className="uppercase">Source:</span>
            <span>{selectedHistoryItem.source}</span>
          </div>
        </div>
      )
    }

    return (
      <div className={`vault-corner border border-concrete-700 bg-concrete-900 ${embedded ? 'p-6' : 'p-8'}`}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vault-200" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-vault-300">Archive</span>
          </div>
          <button
            onClick={() => setView('today')}
            className="font-mono text-xs text-concrete-500 hover:text-vault-300"
          >
            ← TODAY
          </button>
        </div>
        <div className="space-y-0 border border-concrete-700">
          {historyQuestions.length === 0 && (
            <div className="px-5 py-8 text-center font-mono text-xs text-concrete-600">No archived signals.</div>
          )}
          {historyQuestions.map((q, idx) => {
            const record = getAnsweredRecord(q.id)
            return (
              <button
                key={q.id}
                onClick={() => setSelectedHistoryItem(q)}
                className="group flex w-full items-start gap-3 border-b border-concrete-700 px-4 py-4 text-left transition-colors last:border-b-0 hover:bg-concrete-800/50"
              >
                <span className="mt-0.5 shrink-0 font-mono text-xs text-concrete-600">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="border border-vault-500/50 bg-vault-900/20 px-1.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
                      {q.category}
                    </span>
                    <span className="font-mono text-xs text-concrete-600">{formatDate(q.publish_date)}</span>
                    {record && (
                      <span className="font-mono text-xs font-bold" style={{ color: record.correct ? '#facc15' : '#e2580c' }}>
                        {record.correct ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs leading-relaxed text-concrete-400 group-hover:text-concrete-200">{q.statement}</p>
                </div>
                <span className="mt-0.5 shrink-0 font-mono text-xs text-vault-300 opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // --- Today's question view ---
  return (
    <div className={`vault-corner border border-concrete-700 bg-concrete-900 ${embedded ? 'p-6' : 'p-8'}`}>
      {/* Stats bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-concrete-700 pb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase text-concrete-500">Streak</span>
            <span className="font-display text-xl font-bold text-vault-200">{streak}</span>
          </div>
          <div className="h-6 w-px bg-concrete-700" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase text-concrete-500">Best</span>
            <span className="font-display text-xl font-bold text-concrete-300">{bestStreak}</span>
          </div>
          <div className="h-6 w-px bg-concrete-700" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase text-concrete-500">Accuracy</span>
            <span className="font-display text-xl font-bold text-concrete-300">{accuracy}%</span>
          </div>
        </div>
        {totalAnswered > 0 && (
          <span className="font-mono text-xs text-concrete-600">[{totalAnswered} ANSWERED]</span>
        )}
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-vault-200" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-vault-300">Daily Intel</span>
          {question && (
            <>
              <span className="border border-vault-500/50 bg-vault-900/20 px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider text-vault-300">
                {question.category}
              </span>
              <span className="font-mono text-xs text-concrete-600">{formatDate(question.publish_date)}</span>
            </>
          )}
        </div>
        <p className="font-display text-lg font-bold leading-snug text-concrete-100">
          {question?.statement}
        </p>
      </div>

      {/* Answer buttons */}
      {gameState === 'question' && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleAnswer(true)}
            disabled={submitting}
            className="group border-2 border-concrete-600 bg-concrete-950 py-4 font-mono text-sm font-bold uppercase tracking-wider text-concrete-300 transition-all hover:border-vault-200 hover:bg-vault-900/20 hover:text-vault-200 hover:shadow-[0_0_20px_rgba(250,204,21,0.15)] disabled:opacity-50"
          >
            <span className="mb-1 block text-2xl transition-transform group-hover:scale-110">✓</span>
            Documented
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={submitting}
            className="group border-2 border-concrete-600 bg-concrete-950 py-4 font-mono text-sm font-bold uppercase tracking-wider text-concrete-300 transition-all hover:border-rust-500 hover:bg-rust-900/20 hover:text-rust-400 hover:shadow-[0_0_20px_rgba(194,65,12,0.15)] disabled:opacity-50"
          >
            <span className="mb-1 block text-2xl transition-transform group-hover:scale-110">✗</span>
            Disinformation
          </button>
        </div>
      )}

      {/* Result */}
      {gameState === 'answered' && question && (
        <div className="animate-fade-in">
          <div className={`mb-4 border-l-4 p-4 ${isCorrect ? 'border-vault-200 bg-vault-900/20' : 'border-rust-500 bg-rust-900/20'}`}>
            <div className="mb-2 flex items-center gap-2">
              <span className={`font-display text-2xl font-bold ${isCorrect ? 'text-vault-200' : 'text-rust-400'}`}>
                {isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
              </span>
              {isCorrect && streak > 1 && (
                <span className="font-mono text-xs text-vault-300">{streak} DAY STREAK</span>
              )}
            </div>
            <p className="font-mono text-sm leading-relaxed text-concrete-300">
              {question.answer ? 'This statement is DOCUMENTED — verified from public records.' : 'This statement is DISINFORMATION — false or unproven.'}
            </p>
          </div>

          <div className="mb-4 border-l-2 border-vault-200/40 bg-vault-900/10 px-4 py-3">
            <p className="font-mono text-xs leading-relaxed text-concrete-300">{question.explanation}</p>
          </div>

          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-concrete-600">
            <span className="uppercase">Source:</span>
            <span>{question.source}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setView('history')}
              className="border-2 border-vault-200/50 bg-vault-900/10 px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-vault-200 transition-all hover:border-vault-200 hover:bg-vault-900/20"
            >
              Browse Archive
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
