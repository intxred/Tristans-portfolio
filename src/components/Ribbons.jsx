import RibbonCanvas from './RibbonCanvas'

/* Ribbon artwork for the laptop screen wallpaper (drawn, not an image). */
export default function Ribbons({ variant = 'hero', className = '' }) {
  return <RibbonCanvas className={className} style={{ transform: variant === 'contact' ? 'scaleX(-1)' : undefined }} />
}
