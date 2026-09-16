import './AboutUs.css';

const services = [
  {
    icon: '🎓',
    color: 'blue',
    title: 'AI Training Programs',
    text: 'Hands-on AI education programs for schools and colleges — from primary students to educators and parents.',
  },
  {
    icon: '☁️',
    color: 'yellow',
    title: 'SaaS, PaaS & IaaS',
    text: 'End-to-end cloud service solutions — Software, Platform and Infrastructure as a Service — built around your needs.',
  },
  {
    icon: '🤖',
    color: 'green',
    title: 'AI Implementation',
    text: 'We design and deploy practical AI solutions for businesses, helping teams adopt AI into real workflows.',
  },
  {
    icon: '💻',
    color: 'purple',
    title: 'Website Development',
    text: 'Custom, modern website and web-application development projects tailored to your organization.',
  },
  {
    icon: '📚',
    color: 'blue',
    title: 'LMS for Schools & Colleges',
    text: 'Learning Management Systems built for schools and colleges to manage courses, content and student progress.',
  },
  {
    icon: '🛠️',
    color: 'yellow',
    title: 'Hands-on Live Tools',
    text: 'Every learner gets real, hands-on experience with live AI tools and platforms — not just theory.',
  },
  {
    icon: '🎯',
    color: 'green',
    title: 'Placement & Interview Preparation',
    text: 'Interview-ready training with mock interviews, resume building and pre-placement support for students completing our programs.',
  },
  {
    icon: '📜',
    color: 'purple',
    title: 'Certified Training Programs',
    text: 'Industry-recognized certifications that validate skills in AI and emerging technologies for students and working professionals.',
  },
]

const missionVision = [
  {
    icon: '🎯',
    color: 'blue',
    title: 'Our Mission',
    text: 'We believe AI literacy should not stop at the classroom. Our goal is to help schools, colleges and businesses build the technology and skills they need for an AI-driven future — through training, IT services, and tools built for real, hands-on learning.',
  },
  {
    icon: '🔭',
    color: 'purple',
    title: 'Our Vision',
    text: "To become the most trusted technology and AI education partner for institutions across India — shaping a generation of students and professionals who are confident, skilled and future-ready.",
  },
]

export default function AboutUs() {
  return (
    <>
      {/* INTRO */}
      <section className="section about-hero">
        <div className="container">
          <div className="section__header">
            <h1 className="section__title">About Us</h1>
            <p className="section__sub about-hero__lead">
              Deepantra Infotech is more than an AI training company. Alongside our AI education
              programs for schools, we build complete technology solutions — from cloud
              infrastructure to custom software — helping institutions and businesses embrace
              AI-driven growth.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section--soft about-offer">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">What We Offer</h2>
          </div>
          <div className="grid grid--4">
            {services.map((s) => (
              <div className="card" key={s.title}>
                <div className={`card__icon card__icon--${s.color}`}>{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section mission-vision">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Mission &amp; Vision</h2>
          </div>
          <div className="mv-grid">
            {missionVision.map((m) => (
              <div className={`mv-card mv-card--${m.color}`} key={m.title}>
                <div className={`mv-card__icon card__icon--${m.color}`}>{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section section--soft founder">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title founder__title">Meet Our Founder</h2>
          </div>
          <div className="founder__inner">
            <div className="founder__photo-wrap">
              <img
                src="/assets/team/sudeep-chowhan.jpeg"
                alt="Sudeep Chowhan L, Founder of Deepantra Infotech"
                className="founder__photo"
              />
            </div>
            <div className="founder__content">
              <blockquote className="founder__quote">
                "We started Deepantra Infotech to make sure AI education and real technology
                solutions reach every school and college, not just big cities. Our mission is to
                build future-ready minds through hands-on learning and practical AI
                implementation."
              </blockquote>
              <p className="founder__name">— Sudeep Chowhan L</p>
              <p className="founder__role">Founder, Deepantra Infotech</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}