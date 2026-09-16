import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, Rocket, Presentation, Users, Clock, MapPin, Check } from 'lucide-react'
import './Home.css'
import './Programs.css'

const programs = [
  {
    id: 'explorer',
    grade: 'Grades 3 – 5',
    name: 'AI Explorer Program',
    tagline: 'Where Curiosity Meets Technology',
    text: 'Fun and interactive sessions introducing foundational AI concepts through engaging games, stories, logic puzzles, and hands-on robotics activities.',
    badge: 'Beginner',
    Icon: Gamepad2,
    duration: '12 Sessions',
    format: 'In-School',
    features: [
      'Interactive AI Puzzles & Games',
      'Intro to Machine Learning Stories',
      'Hands-on Robotics Demos',
    ],
  },
  {
    id: 'innovators',
    grade: 'Grades 6 – 8',
    name: 'Young Innovators AI',
    tagline: 'Build Real Solutions with AI',
    text: 'Dive deeper into AI tools, explore generative media, solve real-world problems, and build innovative solutions using no-code platforms.',
    badge: 'Intermediate',
    Icon: Rocket,
    duration: '16 Sessions',
    format: 'In-School',
    features: [
      'No-Code AI App Creation',
      'Generative Media & Prompting',
      'Python Logic Starters',
    ],
  },
  {
    id: 'educators',
    grade: 'Teacher Workshops',
    name: 'AI for Educators',
    tagline: 'Empower Your Classroom with AI',
    text: 'Empowering teachers with practical AI tools, automated lesson planners, and classroom-ready productivity applications to save time.',
    badge: 'Faculty',
    Icon: Presentation,
    duration: '1–2 Days',
    format: 'On-site / Online',
    features: [
      'Automated Lesson Design',
      'AI Classroom Assistants',
      'Student Digital Safety',
    ],
  },
  {
    id: 'parents',
    grade: 'Parent Awareness',
    name: 'Understanding AI',
    tagline: 'Guiding Families in the AI Era',
    text: "Helping parents understand the rapid impact of AI on education and careers, equipping them with guidance to foster safe technology habits.",
    badge: 'Community',
    Icon: Users,
    duration: '2-Hour Seminar',
    format: 'In-School Event',
    features: [
      'Future Career Insights',
      'Screen Time & Safety',
      'Guiding Responsible Tech Use',
    ],
  },
]

export default function Programs() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.anim').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* HERO */}
      <section className="prog-hero section--soft">
        <div className="container prog-hero__inner anim">
          <span className="eyebrow">Comprehensive Curriculum</span>
          <h1 className="prog-hero__heading">
            Our Educational <span className="text-orange">Programs</span>
          </h1>
          <p className="prog-hero__sub">
            Structured, age-appropriate AI and technology programs designed for schools — from curious beginners to young innovators, educators, and parents.
          </p>
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="prog-grid-section section" id="programs-list">
        <div className="container">
          <div className="prog-grid-layout">
            {programs.map((p, index) => (
              <div
                className={`prog-grid-card anim anim--delay-${index % 3}`}
                key={p.id}
              >
                {/* Header */}
                <div className="prog-grid-card__header">
                  <div className="prog-grid-card__icon-wrap">
                    <p.Icon strokeWidth={2.5} size={22} />
                  </div>
                  <div className="prog-grid-card__badges">
                    <span className="prog-grid-card__grade">{p.grade}</span>
                    <span className="prog-grid-card__badge">{p.badge}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="prog-grid-card__content">
                  <h2 className="prog-grid-card__name">{p.name}</h2>
                  <p className="prog-grid-card__tagline">{p.tagline}</p>
                  <p className="prog-grid-card__text">{p.text}</p>

                  <div className="prog-grid-card__meta-pills">
                    <span className="meta-pill"><Clock size={13} strokeWidth={2.5} /> {p.duration}</span>
                    <span className="meta-pill"><MapPin size={13} strokeWidth={2.5} /> {p.format}</span>
                  </div>
                </div>

                <hr className="prog-grid-card__divider" />

                {/* Features */}
                <div className="prog-grid-card__features-wrap">
                  <h3 className="prog-grid-card__features-title">What you'll learn</h3>
                  <ul className="prog-grid-card__features">
                    {p.features.map((f, i) => (
                      <li key={i} className="prog-grid-card__feature-item">
                        <Check className="prog-grid-card__check" size={16} strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="prog-grid-card__actions">
                  <Link to="/contact" className="btn btn--primary btn--full">Book Demo</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-section__glow cta-section__glow--left" />
        <div className="cta-section__glow cta-section__glow--right" />
        <div className="container cta-section__inner anim">
          <span className="eyebrow">Get Started</span>
          <h2>Ready to Bring AI Education to Your School?</h2>
          <p>Contact us today and we will design a program perfectly suited to your students and curriculum.</p>
          <Link to="/contact" className="btn btn--primary btn--shadow">Book a Free Demo Session →</Link>
        </div>
      </section>
    </>
  )
}