import './WhatsAppButton.css';

// Update this if the business WhatsApp number changes — must be the full
// number with country code, digits only (no +, spaces or dashes).
const WHATSAPP_NUMBER = '919845532045'
const DEFAULT_MESSAGE = "Hi! I'd like to know more about Deepantra Infotech's AI programs."

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-btn"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.91-2.19-.24-.58-.48-.5-.66-.5-.17-.01-.36-.01-.56-.01-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.42 0 1.43 1.04 2.82 1.19 3.01.15.19 2.05 3.13 4.96 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.11.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z" />
        <path d="M12.02 2C6.5 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.08-1.33A9.96 9.96 0 0012.02 22C17.53 22 22 17.52 22 12S17.53 2 12.02 2zm0 18.1c-1.62 0-3.15-.44-4.46-1.21l-.32-.19-3.02.79.81-2.94-.21-.31A8.07 8.07 0 013.93 12c0-4.46 3.63-8.08 8.09-8.08 4.46 0 8.08 3.62 8.08 8.08 0 4.46-3.62 8.1-8.08 8.1z" />
      </svg>
    </a>
  )
}