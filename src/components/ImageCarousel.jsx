import { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ImageCarousel.css'

const slides = [
  { 
    id: 1, 
    label: 'Hands-on AI Workshops', 
    desc: 'Interactive exercises introducing neural networks and machine learning logic in a playful way.', 
    tag: 'Interactive AI',
    color: 'amber',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
        <path d="M12 12L2.5 7.5"/>
        <path d="M12 12v10"/>
      </svg>
    )
  },
  { 
    id: 2, 
    label: 'Coding for Young Minds', 
    desc: 'Logic building, block coding, and introductory Python tailored for primary students.', 
    tag: 'No-Code & Python',
    color: 'indigo',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    )
  },
  { 
    id: 3, 
    label: 'Robotics & STEM Building', 
    desc: 'Physical computing, sensor integration, and hands-on hardware engineering kits.', 
    tag: 'Practical STEM',
    color: 'emerald',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="8" rx="2"/>
        <path d="M17 14v7"/>
        <path d="M7 14v7"/>
        <circle cx="9" cy="10" r="1.2"/>
        <circle cx="15" cy="10" r="1.2"/>
      </svg>
    )
  },
  { 
    id: 4, 
    label: 'Classroom Collaboration', 
    desc: 'Team activities fostering problem-solving, group discussions, and peer learning.', 
    tag: 'Teamwork',
    color: 'purple',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  { 
    id: 5, 
    label: 'Teacher Training Sessions', 
    desc: 'Equipping educators with practical AI tools to streamline lesson planning and grading.', 
    tag: 'Faculty Workshops',
    color: 'blue',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    )
  },
  { 
    id: 6, 
    label: 'Showcasing Student Projects', 
    desc: 'Exhibitions celebrating student innovation, working AI prototypes, and solutions.', 
    tag: 'Student Demos',
    color: 'pink',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    )
  },
]

export default function ImageCarousel() {
  const sliderRef = useRef(null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    cssEase: 'cubic-bezier(0.16, 1, 0.3, 1)',
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  }

  return (
    <div className="carousel-wrap">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((s) => (
          <div key={s.id} className="carousel-slide-outer">
            <div className={`carousel-slide-card slide-card--${s.color}`}>
              <div className="carousel-slide-card__header">
                <div className={`carousel-slide-card__icon icon--${s.color}`}>{s.icon}</div>
                <span className="carousel-slide-card__tag">{s.tag}</span>
              </div>
              <div className="carousel-slide-card__body">
                <h3>{s.label}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <button className="carousel-arrow carousel-arrow--prev" onClick={() => sliderRef.current?.slickPrev()} aria-label="Previous Slide">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <button className="carousel-arrow carousel-arrow--next" onClick={() => sliderRef.current?.slickNext()} aria-label="Next Slide">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  )
}
