import { ExternalLink } from 'lucide-react'
import Overlay from './Overlay'

const base = import.meta.env.BASE_URL

/* video can be: a file name next to the cover, a YouTube / Vimeo link, or any direct media URL. */
export function parseVideo(pin) {
  const v = (pin.video || '').trim()
  if (!v) return null
  const yt = v.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/)
  if (yt) return { type: 'embed', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0`, preview: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&mute=1&loop=1&playlist=${yt[1]}&controls=0&modestbranding=1&playsinline=1&rel=0` }
  const vm = v.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vm) return { type: 'embed', src: `https://player.vimeo.com/video/${vm[1]}?autoplay=1`, preview: `https://player.vimeo.com/video/${vm[1]}?background=1&autoplay=1&loop=1&muted=1` }
  const isUrl = /^https?:\/\//i.test(v)
  if (/\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(v) || !isUrl)
    return { type: 'file', src: isUrl ? v : `${base}images/products/${pin.slug}/${v}` }
  return { type: 'link', src: v }
}

export default function ProductModal({ pin, onClose }) {
  const media = pin ? parseVideo(pin) : null
  return (
    <Overlay open={!!pin} onClose={onClose} label={pin?.title || ''} wide={media?.type !== 'file' || pin?.h < 500}>
      {pin && (
        <div className="pm-body !mt-0 !pt-14">
          <h3 className="t-title !text-[clamp(1.4rem,3vw,2.1rem)]">{pin.title}</h3>
          <div className="cert-shot mt-5">
            {media?.type === 'file' && (
              <video className="pm-video" src={media.src} poster={`${base}images/products/${pin.slug}/cover.jpg`} controls autoPlay playsInline preload="metadata" />
            )}
            {media?.type === 'embed' && (
              <div className="pm-embed"><iframe src={media.src} title={pin.title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen /></div>
            )}
            {(!media || media.type === 'link') && (
              <img src={`${base}images/products/${pin.slug}/cover.jpg`} alt={pin.title} />
            )}
          </div>
          {media?.type === 'link' && (
            <a className="btn btn-silver mt-6" href={media.src} target="_blank" rel="noreferrer">Watch video <ExternalLink size={16} /></a>
          )}
        </div>
      )}
    </Overlay>
  )
}
