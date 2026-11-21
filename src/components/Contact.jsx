import { useRef, useState } from 'react'
import { Mail, Github, Linkedin, Clock, ArrowUpRight, Check } from 'lucide-react'
import FlowBg from './FlowBg'
import { Magnetic, Rv, SectionLabel } from './fx'
import { profileLinks } from '../data/content'
import { useScene } from '../hooks/useScroll'

const EMAIL = 'tristanbalane@gmail.com'
const ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`

/* Simple rate limit in the browser */
const MIN_GAP = 60 * 1000 // at least 60 seconds between messages
const MAX_PER_HOUR = 3 // at most 3 messages per hour
const HOUR = 60 * 60 * 1000
const STORE_KEY = 'contact_sends'

function readSends() {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]')
    return list.filter((t) => Date.now() - t < HOUR)
  } catch {
    return []
  }
}

function saveSends(list) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(list))
  } catch {
    /* storage blocked: the server limit still applies */
  }
}

function waitText(ms) {
  const s = Math.ceil(ms / 1000)
  if (s < 90) return `${s} seconds`
  return `${Math.ceil(s / 60)} minutes`
}

function Row({ icon, label, value, href }) {
  const inner = (
    <>
      <span className="w-11 h-11 rounded-2xl grid place-items-center bg-white/[.06] text-silver shrink-0">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[12.5px] text-ink-soft">{label}</span>
        <span className="block text-[15px] truncate">{value}</span>
      </span>
      {href && <ArrowUpRight size={16} className="ml-auto text-ink-soft group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
    </>
  )
  const cls = 'group flex items-center gap-4 py-4 border-b border-white/[.08] last:border-0'
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={cls}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

function Field({ id, label, value, onChange, type = 'text', area, required, maxLength }) {
  const P = area ? 'textarea' : 'input'
  return (
    <div className="fld">
      <P id={id} type={area ? undefined : type} value={value} onChange={(e) => onChange(e.target.value)} placeholder=" " required={required} rows={area ? 4 : undefined} maxLength={maxLength} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  useScene(ref)
  const hp = useRef(null) // honeypot: real visitors never see or fill it
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [note, setNote] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const set = (k) => (v) => setForm({ ...form, [k]: v })

  function finish() {
    setStatus('success')
    setTimeout(() => {
      setStatus('idle')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 2400)
  }

  async function submit(e) {
    e.preventDefault()
    if (status === 'loading') return
    setNote('')

    // Bots fill the hidden field. Pretend it worked, send nothing.
    if (hp.current?.value) {
      setStatus('loading')
      setTimeout(finish, 800)
      return
    }

    const sends = readSends()
    const last = sends[sends.length - 1]
    if (last && Date.now() - last < MIN_GAP) {
      setStatus('error')
      setNote(`Please wait ${waitText(MIN_GAP - (Date.now() - last))} before sending another message.`)
      return
    }
    if (sends.length >= MAX_PER_HOUR) {
      setStatus('error')
      setNote(`You've sent a few messages already. Please try again in ${waitText(HOUR - (Date.now() - sends[0]))}.`)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: form.subject ? `[Portfolio] ${form.subject}` : `[Portfolio] New message from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (res.ok && String(data.success) === 'true') {
        saveSends([...sends, Date.now()])
        finish()
      } else {
        console.error('FormSubmit response:', res.status, data)
        setStatus('error')
        setNote(data?.message || `Something went wrong. Please try again or email me at ${EMAIL}.`)
      }
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
      setNote(`Couldn't send the message. Please try again or email me at ${EMAIL}.`)
    }
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden pt-28 sm:pt-44 pb-24 sm:pb-32" aria-label="Contact">
      <div className="contact-bg" aria-hidden="true">
        <FlowBg mirror />
      </div>
      <div className="contact-fade" />

      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10">
        <Rv className="text-center">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="t-hero mt-6 silver-text !text-[clamp(3rem,10vw,9rem)]">
            Let’s build
            <br />
            something.
          </h2>
          <p className="t-lede mt-7 max-w-[44ch] mx-auto">Have a messy spreadsheet, a leaky process, or a big idea? I reply within 24 hours.</p>
          <div className="mt-10">
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="btn btn-silver !h-14 !px-8 !text-base">
                <Mail size={18} /> {EMAIL}
              </a>
            </Magnetic>
          </div>
        </Rv>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 mt-20 sm:mt-28">
          <Rv dir="l">
            <div className="panel glass p-6 sm:p-8 h-full">
              <h3 className="text-xl mb-2">Reach me directly</h3>
              <Row icon={<Mail size={19} />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
              <Row icon={<Github size={19} />} label="GitHub" value="github.com/intxred" href={profileLinks.github} />
              <Row icon={<Linkedin size={19} />} label="LinkedIn" value="linkedin.com/in/tristan-jared-balane" href={profileLinks.linkedin} />
              <Row icon={<Clock size={19} />} label="Response time" value="Within 24 hours, any inquiry" />
            </div>
          </Rv>
          <Rv dir="r" d={80}>
            <form onSubmit={submit} className="panel glass p-6 sm:p-8 space-y-3.5">
              <h3 className="text-xl mb-2">Send a message</h3>

              {/* honeypot */}
              <input
                ref={hp}
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />

              <div className="grid sm:grid-cols-2 gap-3.5">
                <Field id="fname" label="Your name" value={form.name} onChange={set('name')} required maxLength={80} />
                <Field id="femail" type="email" label="Email address" value={form.email} onChange={set('email')} required maxLength={120} />
              </div>
              <Field id="fsubject" label="Subject" value={form.subject} onChange={set('subject')} maxLength={120} />
              <Field id="fmsg" area label="Tell me about your project" value={form.message} onChange={set('message')} required maxLength={4000} />
              <button
                type="submit"
                className={`btn w-full !h-14 cursor-pointer ${status === 'success' ? 'btn-line' : 'btn-silver'}`}
                disabled={status === 'loading'}
              >
                {status === 'loading' && <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black" style={{ animation: 'spin .7s linear infinite' }} />}
                {status === 'success' && <Check size={18} />}
                {status === 'loading' ? 'Sending…' : status === 'success' ? 'Message sent' : 'Send message'}
              </button>
              <p className="t-mono text-center !text-[11.5px]" role="status">
                {status === 'success' ? 'Thanks — I’ll get back to you soon.' : note || 'I reply within 24 hours.'}
              </p>
            </form>
          </Rv>
        </div>
      </div>
    </section>
  )
}