import './Chatbot.css';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X } from 'lucide-react';
import { api } from '../api/client.js';
import { useAuth } from '../context/AuthContext.jsx';

// Self-contained FAQ knowledge base — no backend/API key required.
const knowledgeBase = [
  {
    keywords: ['program', 'course', 'courses', 'ai explorer', 'young innovator', 'curriculum', 'grade', 'class'],
    reply:
      "We offer four programs: AI Explorer Program (Grades 3–5), Young Innovators AI (Grades 6–8), AI for Educators (teacher workshops), and Understanding AI (parent awareness sessions). Want details on a specific one?",
  },
  {
    keywords: ['it service', 'saas', 'paas', 'iaas', 'cloud'],
    reply:
      "Besides AI training, we also provide IT services — SaaS, PaaS and IaaS cloud solutions — built around your organization's needs. Check the About Us page for the full list.",
  },
  {
    keywords: ['website', 'web development', 'web app', 'app development'],
    reply:
      "Yes, we build custom website and web-application development projects for schools, colleges and businesses. Share your requirements on the Contact page and our team will reach out.",
  },
  {
    keywords: ['lms', 'learning management'],
    reply:
      "We build Learning Management Systems (LMS) for schools and colleges to manage courses, content and student progress. Get in touch to discuss your institution's needs.",
  },
  {
    keywords: ['ai implementation', 'implement ai', 'adopt ai', 'business ai'],
    reply:
      "We help businesses design and deploy practical AI solutions and integrate them into real workflows — not just theory. Head to Contact to book a consultation.",
  },
  {
    keywords: ['founder', 'sudeep', 'ceo', 'who started', 'owner'],
    reply:
      "Deepantra Infotech was founded by Sudeep Chowhan L. You can read more about our story and mission on the About Us page.",
  },
  {
    keywords: ['fee', 'fees', 'price', 'cost', 'pricing', 'charge'],
    reply:
      "Pricing depends on the program and school size — we tailor a proposal after understanding your requirements. Book a free demo and we'll share a customized quote.",
  },
  {
    keywords: ['demo', 'trial', 'free session'],
    reply:
      "We offer a free demo session for schools, conducted online or offline. You can request one right from the Contact page.",
  },
  {
    keywords: ['contact', 'phone', 'number', 'email', 'reach', 'call'],
    reply:
      "You can reach us at +91 98455 32045 or deepantrainfotech@gmail.com — or just fill out the form on our Contact page.",
  },
  {
    keywords: ['location', 'address', 'where are you', 'based'],
    reply:
      "We work with schools and colleges directly — reach out through the Contact page and we'll coordinate a session at your location or online.",
  },
  {
    keywords: ['hands-on', 'hands on', 'practical', 'live tool'],
    reply:
      "All our programs include hands-on experience with live AI tools — students and teachers work with real platforms, not just slides.",
  },
  {
    keywords: ['who are you', 'what is deepantra', 'about company', 'about you', 'company'],
    reply:
      "Deepantra Infotech is an AI education and IT services company. We run AI training programs for schools and colleges, and also offer SaaS/PaaS/IaaS cloud services, AI implementation, website development and LMS solutions.",
  },
  {
    keywords: ['sign up', 'signup', 'register', 'login', 'account'],
    reply:
      "You can create an account using the Sign Up link in the navigation bar, or log in if you already have one.",
  },
  {
    keywords: ['teacher', 'educator', 'workshop'],
    reply:
      "Our AI for Educators workshop empowers teachers with AI knowledge and classroom-ready tools so they can confidently guide student learning.",
  },
  {
    keywords: ['parent'],
    reply:
      "Our Understanding AI program helps parents understand the impact of AI and guide their children's use of it responsibly at home.",
  },
]

const fallbackReply =
  "I'm not fully sure about that one — but our team can help directly. Please reach out via the Contact page or call +91 98455 32045, and we'll clear up any doubts."

const suggestedQuestions = [
  'What programs do you offer?',
  'What IT services do you provide?',
  'How do I book a free demo?',
  'Who is the founder?',
]

function findReply(userText) {
  const text = userText.toLowerCase()
  let best = null
  let bestScore = 0
  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce(
      (acc, kw) => (text.includes(kw) ? acc + 1 : acc),
      0
    )
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }
  return best ? best.reply : fallbackReply
}

/**
 * Extended Chatbot — now supports assignment hint mode.
 *
 * Props:
 *  assignmentContext: { assignmentId, questionText, wrongAnswer }
 *    When provided (typically from an assignment page), the chatbot
 *    can request a hint from the backend instead of using the FAQ KB.
 */
export default function Chatbot({ assignmentContext }) {
  const { token } = useAuth()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: assignmentContext
        ? "Stuck on a question? Ask me for a hint and I'll nudge you toward the right concept — without giving away the answer."
        : "Hi! I'm the Deepantra Infotech assistant. Ask me about our AI programs, IT services, or how to book a free demo.",
    },
  ])
  const [input, setInput] = useState('')
  const [hintLoading, setHintLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }])
    setInput('')

    // Hint mode: if assignment context is provided and user asks for help
    const isHintRequest = assignmentContext && token && (
      trimmed.toLowerCase().includes('hint') ||
      trimmed.toLowerCase().includes('help') ||
      trimmed.toLowerCase().includes('stuck') ||
      trimmed.toLowerCase().includes('explain') ||
      trimmed.toLowerCase().includes('why')
    )

    if (isHintRequest) {
      setHintLoading(true)
      try {
        const res = await api.getHint(
          assignmentContext.assignmentId,
          {
            questionText: assignmentContext.questionText || trimmed,
            wrongAnswer: assignmentContext.wrongAnswer || '',
          },
          token
        )
        setMessages((prev) => [...prev, { from: 'bot', text: res.hint || 'Think carefully about the core concept being tested. Re-read the question slowly.' }])
      } catch {
        setMessages((prev) => [...prev, { from: 'bot', text: 'I couldn\'t generate a hint right now. Try re-reading the question and thinking about the key concept.' }])
      } finally {
        setHintLoading(false)
      }
      return
    }

    // Regular FAQ mode
    const botReply = findReply(trimmed)
    setMessages((prev) => [...prev, { from: 'bot', text: botReply }])
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  const hints = assignmentContext
    ? ['Give me a hint', 'Why is my answer wrong?', 'Explain the concept']
    : suggestedQuestions

  return (
    <div className="chatbot">
      {open && (
        <div className="chatbot__panel" role="dialog" aria-label="Deepantra Infotech assistant">
          <div className="chatbot__header">
            <span>{assignmentContext ? '💡 Assignment Hint' : 'Deepantra Assistant'}</span>
            <button
              className="chatbot__close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot__messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chatbot__bubble chatbot__bubble--${m.from}`}>
                {m.text}
              </div>
            ))}
            {hintLoading && (
              <div className="chatbot__bubble chatbot__bubble--bot">Thinking…</div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="chatbot__suggestions">
              {hints.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} type="button">
                  {q}
                </button>
              ))}
            </div>
          )}

          <p className="chatbot__hint">
            Need a human? Visit <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>.
          </p>

          <form className="chatbot__input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={assignmentContext ? 'Ask for a hint…' : 'Ask about our courses…'}
              aria-label="Type your question"
              disabled={hintLoading}
            />
            <button type="submit" className="chatbot__send" aria-label="Send message" disabled={hintLoading}>
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        className="chatbot__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        {open ? <X size={24} strokeWidth={2.2} /> : <MessageSquare size={24} strokeWidth={2.2} />}
      </button>
    </div>
  )
}
