import './Testimonials.css';

// Placeholder quotes — swap these for real feedback from schools, teachers
// and parents once you have some collected. Keep the same shape:
// { quote, name, role, color }
const testimonials = [
  {
    quote:
      "Deepantra Infotech's AI Explorer sessions were exactly what our students needed. The hands-on approach kept every child engaged from start to finish.",
    name: 'School Principal',
    role: 'Partner School',
    color: 'blue',
  },
  {
    quote:
      "The AI for Educators workshop gave our teaching staff real, practical confidence with AI tools — not just theory. We use what we learned every week now.",
    name: 'Faculty Coordinator',
    role: 'Partner School',
    color: 'purple',
  },
  {
    quote:
      "Understanding AI helped me guide my child's use of technology at home so much better. Clear, honest, and genuinely useful for parents.",
    name: 'Parent',
    role: 'Program Participant',
    color: 'green',
  },
]

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <h2 className="section__title">What People Are Saying</h2>
        <div className="grid grid--3">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name + t.role}>
              <span className="testimonial-card__quote-mark">&ldquo;</span>
              <p className="testimonial-card__text">{t.quote}</p>
              <div className="testimonial-card__person">
                <span className={`testimonial-card__avatar testimonial-card__avatar--${t.color}`}>
                  {getInitials(t.name)}
                </span>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}