import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import InterviewTranscript from '../components/InterviewTranscript'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
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
                    Prep smarter than <span className="highlight">last time.</span>
                </h1>
                <p className="landing-page__sub">
                    Create an account to save every report, track your match score over time,
                    and pick up your prep plan exactly where you left off.
                </p>

                <InterviewTranscript />
            </section>

            <section className="landing-page__form-panel">
                <div className="auth-card">
                    <h1>Register</h1>
                    <p className="auth-card__sub">Takes less than a minute.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                onChange={(e) => { setUsername(e.target.value) }}
                                type="text" id="username" name='username' placeholder='Choose a username' />
                        </div>
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
                            {loading ? 'Creating account…' : 'Register'}
                        </button>
                    </form>

                    <p className="auth-card__footer">Already have an account? <Link to={"/login"}>Login</Link></p>
                </div>
            </section>
        </main>
    )
}

export default Register