import React, { useState, useEffect } from 'react'

const TRANSCRIPT = [
    { tag: 'Q01', kind: 'q', text: 'Tell me about a time you shipped under a tight deadline.' },
    { tag: 'A01', kind: 'a', text: 'Led a 3-person team to ship the checkout redesign two days early by cutting scope, not quality.' },
]

const FULL_TEXT = TRANSCRIPT.map(line => line.text).join('')

const InterviewTranscript = () => {
    const [ charCount, setCharCount ] = useState(0)
    const [ scoreRevealed, setScoreRevealed ] = useState(false)

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (prefersReducedMotion) {
            setCharCount(FULL_TEXT.length)
            setScoreRevealed(true)
            return
        }

        const interval = setInterval(() => {
            setCharCount(c => {
                if (c >= FULL_TEXT.length) {
                    clearInterval(interval)
                    setTimeout(() => setScoreRevealed(true), 250)
                    return c
                }
                return c + 1
            })
        }, 16)

        return () => clearInterval(interval)
    }, [])

    let consumed = 0

    return (
        <div className="transcript" aria-hidden="true">
            <div className="transcript__header">
                <span className="transcript__dot" />
                <span className="transcript__dot" />
                <span className="transcript__dot" />
                <span className="transcript__label">interview_report.json</span>
            </div>

            <div className="transcript__body">
                {TRANSCRIPT.map((line, i) => {
                    const start = consumed
                    const end = start + line.text.length
                    consumed = end
                    const visible = Math.max(0, Math.min(line.text.length, charCount - start))
                    const shown = line.text.slice(0, visible)
                    const lineActive = charCount > start && charCount <= end

                    return (
                        <p key={i} className={`transcript__line transcript__line--${line.kind}`}>
                            <span className="transcript__tag">{line.tag}</span>
                            <span className="transcript__text">
                                {shown}
                                {lineActive && <span className="transcript__cursor" />}
                            </span>
                        </p>
                    )
                })}
            </div>

            <div className={`transcript__score ${scoreRevealed ? 'transcript__score--revealed' : ''}`}>
                <svg viewBox="0 0 64 64" className="score-ring">
                    <circle className="score-ring__track" cx="32" cy="32" r="27" />
                    <circle className="score-ring__fill" cx="32" cy="32" r="27" />
                </svg>
                <div className="transcript__score-text">
                    <span className="transcript__score-value">92%</span>
                    <span className="transcript__score-label">match score</span>
                </div>
            </div>
        </div>
    )
}

export default InterviewTranscript