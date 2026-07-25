import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import InterviewTranscript from '../components/InterviewTranscript'

const FEATURES = [
    'resume + job description → interview report',
    'technical & behavioral questions, with model answers',
    'skill gaps ranked by severity',
    'day-by-day prep plan',
]

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    return (
        <main className="landing-page">
            <section className="landing-page__hero">
                <div className="landing-page__brand">
                    <span className="landing-page__brand-mark">&gt;_</span>
                    Interview Prep
                </div>

                <p className="landing-page__eyebrow">AI Mock Interview Coach</p>
                <h1 className="landing-page__title">
                    Walk in already <span className="highlight">interviewed.</span>
                </h1>
                <p className="landing-page__sub">
                    Upload your resume and the job post. Get the exact questions, the gaps to close,
                    and a day-by-day plan before the recruiter calls back.
                </p>

                <InterviewTranscript />

                <ul className="landing-page__features">
                    {FEATURES.map((f, i) => (
                        <li key={i}>
                            <span className="landing-page__feature-prompt">$</span> {f}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="landing-page__form-panel">
                <div className="auth-card">
                    <h1>Login</h1>
                    <p className="auth-card__sub">Pick up where you left off.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" id="email" name='email' placeholder='you@example.com' />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" id="password" name='password' placeholder='••••••••' />
                        </div>
                        <button className='button primary-button' disabled={loading}>
                            {loading ? 'Logging in…' : 'Login'}
                        </button>
                    </form>

                    <p className="auth-card__footer">Don't have an account? <Link to={"/register"}>Register</Link></p>
                </div>
            </section>
        </main>
    )
}

export default Login