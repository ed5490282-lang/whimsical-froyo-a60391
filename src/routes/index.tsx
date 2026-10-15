import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── Data ───────────────────────────────────────────────────────────────────

const SERVICES = {
  'Services Principaux': [
    { name: 'Carte Grise', price: 300, desc: 'Immatriculation standard de votre véhicule', features: ['Traitement SIV officiel', 'Certificat provisoire inclus', 'Envoi sous 5–7 jours ouvrés'] },
    { name: 'Changement de Titulaire', price: 125, desc: "Transfert de propriété lors d'un achat/vente", features: ['Prise en charge complète', 'Vérification des documents', 'Suivi de dossier'] },
    { name: "Changement d'Adresse", price: 95, desc: "Mise à jour de l'adresse sur la carte grise", features: ['Simple et rapide', 'Valable sur tout le territoire', 'Sans déplacement'] },
    { name: 'Duplicata Carte Grise', price: 115, desc: "Remplacement d'un document perdu ou volé", features: ['Déclaration de perte prise en charge', 'Nouveau document officiel', 'Traitement prioritaire'] },
    { name: 'Correction Carte Grise', price: 105, desc: 'Rectification d\'une erreur sur votre document', features: ['Correction de toutes erreurs', 'Vérification complète', 'Nouveau document émis'] },
    { name: 'Ajout Cotitulaire', price: 110, desc: 'Ajouter un co-titulaire sur la carte grise', features: ['Procédure officielle SIV', 'Documents requis fournis', 'Traitement sécurisé'] },
    { name: 'Retrait Cotitulaire', price: 110, desc: 'Retirer un co-titulaire de la carte grise', features: ['Procédure officielle SIV', 'Accord des parties requis', 'Traitement sécurisé'] },
  ],
  'Documents Temporaires': [
    { name: "Déclaration d'Achat", price: 110, desc: 'Document provisoire valable 1 mois après achat', features: ['Validité 1 mois', 'Circulation autorisée', 'Accompagne le dossier CG'] },
    { name: 'Déclaration de Cession', price: 85, desc: 'Certificat officiel de vente de véhicule', features: ['Décharge de responsabilité', 'Format officiel', 'Envoi rapide'] },
    { name: 'CPI (Certificat Provisoire)', price: 120, desc: "Certificat provisoire d'immatriculation", features: ['Valable sur tout le territoire', 'Délivré rapidement', 'En attente de la CG définitive'] },
    { name: 'Immatriculation WW', price: 145, desc: "Plaques d'immatriculation provisoires", features: ['Validité limitée', 'Pour convoyage', 'Document officiel'] },
  ],
  'Documents Administratifs': [
    { name: 'Certificat de Non-Gage', price: 30, desc: "Attestation d'absence de gage ou opposition", features: ['Délivré sous 24h', 'Format officiel', 'Valide pour toute transaction'] },
    { name: "Fiche d'Identification", price: 150, desc: 'Document technique pour le contrôle technique', features: ['Informations techniques complètes', 'Format officiel', 'Accepté partout'] },
    { name: 'Quitus Fiscal', price: 95, desc: 'Preuve de paiement TVA pour véhicule importé', features: ['Import UE et hors UE', 'Document fiscal officiel', 'Requis pour immatriculation'] },
    { name: 'Certificat de Conformité', price: 450, desc: 'Attestation de conformité aux normes UE', features: ['Valable dans toute l\'UE', 'Basé sur VIN', 'Nécessaire pour immatriculation'] },
  ],
  'Services Spécialisés': [
    { name: 'Véhicule Importé', price: 600, desc: "Immatriculation d'un véhicule étranger en France", features: ['Import UE et hors UE', 'Expertise complète', 'Prise en charge totale'] },
    { name: 'Carte Grise Collection', price: 350, desc: 'Immatriculation de véhicules de plus de 30 ans', features: ['Statut collection officiel', 'Avantages fiscaux', 'Traitement spécialisé'] },
    { name: 'Passage Société ↔ Particulier', price: 130, desc: 'Changement de statut de propriétaire', features: ['Société vers particulier', 'Particulier vers société', 'Procédure complète'] },
    { name: "Levée d'Opposition / Véhicule Gagé", price: 500, desc: "Déblocage d'un véhicule sous opposition", features: ['Analyse du dossier', 'Procédure officielle', 'Résolution rapide'] },
    { name: 'Écrasement SIV', price: 250, desc: 'Correction de données erronées dans le SIV', features: ['Correction base nationale', 'Dossier complet pris en charge', 'Expertise requise'] },
    { name: 'Assurance au Tiers', price: 70, desc: 'Couverture responsabilité civile immédiate', features: ['Activation immédiate', 'Attestation fournie', 'Prix fixe garanti'] },
    { name: "Suspension d'Immatriculation", price: 500, desc: 'Suspension temporaire du certificat', features: ['Pour véhicule non roulant', "Économies sur l'assurance", 'Réactivation possible'] },
    { name: 'Retrait de Circulation', price: 700, desc: "Retrait définitif d'un véhicule de la route", features: ['Véhicule épave ou hors service', 'Procédure officielle', 'Attestation fournie'] },
  ],
}

const TESTIMONIALS = [
  { initials: 'MR', name: 'Marc R.', service: 'Changement de Titulaire', time: 'Il y a 3 jours', text: 'Dossier traité en moins de 5 jours ouvrés. Tout s\'est passé en ligne sans le moindre déplacement. Je recommande vivement ce service pour sa réactivité et son sérieux.' },
  { initials: 'SD', name: 'Sarah D.', service: 'Carte Grise', time: 'Il y a 1 semaine', text: 'J\'ai pu rouler dès l\'achat de mon véhicule grâce au certificat provisoire. Le service est vraiment professionnel et les délais annoncés sont respectés.' },
  { initials: 'KM', name: 'Karim M.', service: 'Véhicule Importé', time: 'Il y a 2 semaines', text: 'Situation administrative complexe pour mon véhicule importé, mais tout a été géré avec compétence. Résultat impeccable, je suis très satisfait.' },
  { initials: 'LB', name: 'Laura B.', service: 'Certificat de Non-Gage', time: 'Il y a 3 semaines', text: 'Certificat reçu le jour même ! Parfait pour finaliser la vente rapidement. Tarif très correct et service ultra-efficace. Merci !' },
  { initials: 'JL', name: 'Julien L.', service: "Fiche d'Identification", time: 'Il y a 1 mois', text: 'Fiche d\'identification obtenue avec toutes les caractéristiques techniques. Très pratique pour le contrôle technique. Service rapide et document officiel.' },
  { initials: 'AM', name: 'Amina M.', service: 'Assurance au Tiers', time: 'Il y a 1 mois', text: 'Assurance activée immédiatement, attestation reçue par email dans l\'heure. Prix fixe comme annoncé, aucune surprise. Service de qualité que je conseille.' },
  { initials: 'PD', name: 'Pierre D.', service: 'Duplicata Carte Grise', time: 'Il y a 6 semaines', text: 'Suite à la perte de ma carte grise, tout a été pris en charge rapidement. Nouveau document reçu en une semaine. Service excellent, très professionnel.' },
  { initials: 'NC', name: 'Nadia C.', service: "Changement d'Adresse", time: 'Il y a 2 mois', text: "Démarche simple et rapide. J'avais peur des formalités mais tout a été simplifié. Tarif abordable et service efficace. Je n'hésiterai pas à revenir." },
]

const REQUIRED_DOCS: Record<string, string[]> = {
  default: [
    'Pièce d\'identité valide (recto/verso)',
    'Permis de conduire (recto/verso)',
    'Justificatif de domicile de moins de 3 mois (hors facture mobile)',
    'Carte grise actuelle ou déclaration d\'achat',
  ],
  'Changement de Titulaire': [
    'Pièce d\'identité valide (recto/verso)',
    'Permis de conduire (recto/verso)',
    'Justificatif de domicile de moins de 3 mois',
    'Certificat de cession (acte de vente)',
    'Carte grise barrée et signée de l\'ancien propriétaire',
    'Contrôle technique valide (si véhicule de plus de 4 ans)',
  ],
  'Véhicule Importé': [
    'Pièce d\'identité valide (recto/verso)',
    'Permis de conduire (recto/verso)',
    'Justificatif de domicile de moins de 3 mois',
    'Titre de propriété étranger original',
    'Quitus fiscal (si hors UE)',
    'Certificat de conformité européen',
    'Contrôle technique (si véhicule de plus de 4 ans)',
    'Attestation d\'assurance',
  ],
}

// ─── Small helpers ───────────────────────────────────────────────────────────

function Stars() {
  return <span style={{ color: '#c8960e', fontSize: '1.05rem', letterSpacing: '2px' }}>★★★★★</span>
}

function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill="#1a7a4a" />
      <path d="M4.5 7.5l2.2 2.2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.97)',
      boxShadow: scrolled ? '0 2px 24px rgba(12,45,110,0.1)' : '0 1px 0 #d0daf0',
      backdropFilter: 'blur(8px)',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{ width: 40, height: 40, background: 'var(--navy)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x="2" y="8" width="18" height="10" rx="2" stroke="white" strokeWidth="1.5" />
              <circle cx="6.5" cy="18" r="2" stroke="white" strokeWidth="1.5" />
              <circle cx="15.5" cy="18" r="2" stroke="white" strokeWidth="1.5" />
              <path d="M4.5 8l2.5-4h8l2.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="8" y="11" width="6" height="3" rx="1" fill="white" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem', lineHeight: 1.1, color: 'var(--navy-dark)' }}>Service</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '0.95rem', lineHeight: 1.1, color: 'var(--gold)' }}>Carte Grise</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {(['Accueil', 'hero'], [['Accueil', 'hero'], ['Avis', 'avis'], ['Services', 'services'], ['Processus', 'processus']] as [string, string][]).map(([label, id]) => (
            <button key={id} onClick={() => goto(id)} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
              {label}
            </button>
          ))}
          <button className="btn-primary" onClick={() => goto('processus')} style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
            Démarrer <Arrow />
          </button>
        </nav>

        {/* Mobile burger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }} className="burger">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {mobileOpen
              ? <path d="M6 6l12 12M18 6L6 18" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" />
              : <path d="M4 7h16M4 12h16M4 17h16" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#fff' }}>
          {([['Accueil', 'hero'], ['Avis', 'avis'], ['Services', 'services'], ['Processus', 'processus']] as [string, string][]).map(([label, id]) => (
            <button key={id} onClick={() => goto(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)', padding: '0.5rem 0' }}>
              {label}
            </button>
          ))}
          <button className="btn-primary" onClick={() => goto('processus')} style={{ alignSelf: 'flex-start' }}>Démarrer ma demande</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          nav { display: none !important; }
          .burger { display: block !important; }
        }
      `}</style>
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" style={{ background: 'linear-gradient(135deg, #081d47 0%, #0c2d6e 55%, #1a4a9e 100%)', padding: 'clamp(3.5rem, 8vw, 6rem) 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #c8960e, #f0c040, #c8960e)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(200,150,14,0.2)', border: '1px solid rgba(200,150,14,0.4)', borderRadius: 100, padding: '0.4rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ color: '#f0c040', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Habilité SIV • Service Agréé
            </span>
          </div>

          <h1 className="animate-fade-up" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', lineHeight: 1.1, margin: '0 0 0.5rem' }}>
            Service Carte Grise
          </h1>
          <h2 className="animate-fade-up delay-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)', color: '#f0c040', lineHeight: 1.2, margin: '0 0 1.5rem' }}>
            100% En Ligne — Rapide &amp; Sécurisé
          </h2>
          <p className="animate-fade-up delay-2" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: 540, margin: '0 0 2rem' }}>
            Simplifiez vos démarches administratives avec notre service de carte grise en ligne. Traitement officiel via le Système d'Immatriculation des Véhicules (SIV), délai de 5 à 7 jours ouvrés.
          </p>

          <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-gold" onClick={() => document.getElementById('processus')?.scrollIntoView({ behavior: 'smooth' })}>
              Démarrer ma demande <Arrow />
            </button>
            <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'white', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.95rem', padding: '0.85rem 1.8rem', borderRadius: 4, border: '2px solid rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.2s' }}>
              Voir les tarifs
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-4" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '1.5rem', minWidth: 200 }}>
          {[
            { value: '2 500+', label: 'Clients satisfaits' },
            { value: '5 – 7', label: 'Jours ouvrés' },
            { value: '20+', label: 'Services proposés' },
            { value: '100 %', label: 'En ligne' },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: 'center', padding: '1rem 0.5rem', borderBottom: '1px solid rgba(255,255,255,0.09)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 900, color: '#f0c040' }}>{value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.15rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 700px) { #hero > div > div:last-child { display: none; } }`}</style>
    </section>
  )
}

// ─── Trust Bar ───────────────────────────────────────────────────────────────

function TrustBar() {
  return (
    <section style={{ background: 'var(--cream)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { icon: <LockIcon />, title: 'Paiement Sécurisé', desc: 'Virement bancaire instantané et PayPal' },
          { icon: <ShieldIcon />, title: 'Habilité SIV', desc: 'Traitement officiel via le système national' },
          { icon: <FlashIcon />, title: 'Traitement Rapide', desc: '5 à 7 jours ouvrés après validation' },
          { icon: <MailIcon />, title: 'Support par Email', desc: 'Réponse rapide à toutes vos questions' },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem' }}>
            <div style={{ flexShrink: 0, marginTop: 2 }}>{icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy-dark)' }}>{title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-mid)', marginTop: '0.15rem' }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function LockIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="9" width="14" height="9" rx="2" stroke="var(--gold)" strokeWidth="1.5" /><path d="M7 9V6a3 3 0 016 0v3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" /><circle cx="10" cy="13.5" r="1.5" fill="var(--gold)" /></svg>
}
function ShieldIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4-3 7-7 8C7 17 4 14 4 10V5l6-3z" stroke="var(--gold)" strokeWidth="1.5" strokeLinejoin="round" /><path d="M7.5 10l2 2 3-3" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function FlashIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function MailIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="var(--gold)" strokeWidth="1.5" /><path d="M2 7l8 5 8-5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" /></svg>
}

// ─── Testimonials ────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="avis" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-eyebrow">Avis Clients</div>
          <h2 className="section-title">Ce que disent nos clients</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <Stars />
            <span style={{ fontWeight: 700, color: 'var(--navy)' }}>4.9/5</span>
            <span style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>• 2 500+ clients satisfaits</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--navy)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-mid)' }}>{t.service} · {t.time}</div>
                </div>
              </div>
              <Stars />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.65, marginTop: '0.6rem', marginBottom: 0 }}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  const [cat, setCat] = useState(Object.keys(SERVICES)[0])

  return (
    <section id="services" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: 'var(--light-blue)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-eyebrow">Nos Tarifs</div>
          <h2 className="section-title">Tous nos services</h2>
          <p style={{ color: 'var(--text-mid)', maxWidth: 480, margin: '0 auto' }}>Tarifs fixes, sans surprise. Frais de timbre fiscal en sus si applicable.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {Object.keys(SERVICES).map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.85rem', padding: '0.6rem 1.2rem', borderRadius: 100, cursor: 'pointer', border: '2px solid', borderColor: cat === c ? 'var(--navy)' : 'var(--border)', background: cat === c ? 'var(--navy)' : '#fff', color: cat === c ? '#fff' : 'var(--text-mid)', transition: 'all 0.2s' }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {(SERVICES[cat as keyof typeof SERVICES] || []).map((s) => (
            <div key={s.name} className="service-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'var(--navy-dark)', lineHeight: 1.3, flex: 1 }}>{s.name}</h3>
                <span className="service-price" style={{ marginLeft: '0.5rem', whiteSpace: 'nowrap' }}>{s.price}€</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: '0 0 1rem', lineHeight: 1.5 }}>{s.desc}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                {s.features.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-mid)' }}>
                    <Check /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className="btn-primary"
                style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center', fontSize: '0.85rem', padding: '0.7rem' }}
                onClick={() => {
                  document.getElementById('processus')?.scrollIntoView({ behavior: 'smooth' })
                  setTimeout(() => window.dispatchEvent(new CustomEvent('selectService', { detail: s.name })), 600)
                }}
              >
                Démarrer ma demande <Arrow />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Process / Form ──────────────────────────────────────────────────────────

type FormData = { prenom: string; nom: string; email: string; telephone: string; adresse: string; codePostal: string; ville: string; service: string; message: string }
const emptyForm: FormData = { prenom: '', nom: '', email: '', telephone: '', adresse: '', codePostal: '', ville: '', service: '', message: '' }

function Process() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')
  const [form, setForm] = useState<FormData>(emptyForm)
  const [captureFile, setCaptureFile] = useState<File | null>(null)
  const [captureErr, setCaptureErr] = useState('')
  const [captureSending, setCaptureSending] = useState(false)
  const [captureSent, setCaptureSent] = useState(false)

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  useEffect(() => {
    const h = (e: Event) => setForm(prev => ({ ...prev, service: (e as CustomEvent).detail }))
    window.addEventListener('selectService', h)
    return () => window.removeEventListener('selectService', h)
  }, [])

  const allFlat = Object.values(SERVICES).flat()
  const selectedPrice = allFlat.find(s => s.name === form.service)?.price

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setErr('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setSent(true); setStep(2) }
      else {
        const d = await res.json().catch(() => ({}))
        setErr((d as { message?: string }).message || 'Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setErr('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSending(false)
    }
  }

  const sendCapture = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captureFile) { setCaptureErr("Veuillez sélectionner une capture d'écran."); return }
    setCaptureSending(true)
    setCaptureErr('')
    try {
      const fd = new FormData()
      fd.append('nom', form.nom)
      fd.append('prenom', form.prenom)
      fd.append('email', form.email)
      fd.append('service', form.service)
      fd.append('capture', captureFile)
      const res = await fetch('/api/upload-payment', { method: 'POST', body: fd })
      if (res.ok) { setCaptureSent(true) }
      else {
        const d = await res.json().catch(() => ({}))
        setCaptureErr((d as { message?: string }).message || 'Une erreur est survenue. Veuillez réessayer.')
      }
    } catch {
      setCaptureErr('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setCaptureSending(false)
    }
  }

  const docs = REQUIRED_DOCS[form.service] || REQUIRED_DOCS.default

  return (
    <section id="processus" style={{ padding: 'clamp(3rem, 6vw, 5rem) 1.5rem', background: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="section-eyebrow">Comment ça marche</div>
          <h2 className="section-title">Votre demande en 3 étapes</h2>
        </div>

        {/* Step indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {([{ n: 1, label: 'Informations' }, { n: 2, label: 'Documents' }, { n: 3, label: 'Paiement' }] as { n: 1 | 2 | 3; label: string }[]).map(({ n, label }, i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <div className={`step-indicator ${step > n ? 'step-done' : step === n ? 'step-active' : 'step-pending'}`}>
                  {step > n
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : n}
                </div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: step === n ? 'var(--navy)' : 'var(--text-mid)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 'clamp(40px, 8vw, 100px)', height: 2, background: step > n ? 'var(--navy)' : 'var(--border)', marginBottom: 24, transition: 'background 0.3s', margin: '0 4px 22px' }} />}
            </div>
          ))}
        </div>

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div style={{ background: 'var(--light-blue)', borderRadius: 12, padding: 'clamp(1.5rem, 4vw, 2.5rem)', border: '1px solid var(--border)' }}>
            <h3 style={{ margin: '0 0 1.5rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--navy-dark)' }}>Étape 1 — Vos informations personnelles</h3>
            <form onSubmit={submit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-field"><label>Prénom *</label><input type="text" required placeholder="Jean" value={form.prenom} onChange={set('prenom')} /></div>
                <div className="form-field"><label>Nom *</label><input type="text" required placeholder="Dupont" value={form.nom} onChange={set('nom')} /></div>
                <div className="form-field"><label>Email *</label><input type="email" required placeholder="votre@email.fr" value={form.email} onChange={set('email')} /></div>
                <div className="form-field"><label>Téléphone *</label><input type="tel" required placeholder="06 12 34 56 78" value={form.telephone} onChange={set('telephone')} /></div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}><label>Adresse *</label><input type="text" required placeholder="15 rue de la République" value={form.adresse} onChange={set('adresse')} /></div>
                <div className="form-field"><label>Code postal *</label><input type="text" required placeholder="75001" maxLength={5} value={form.codePostal} onChange={set('codePostal')} /></div>
                <div className="form-field"><label>Ville *</label><input type="text" required placeholder="Paris" value={form.ville} onChange={set('ville')} /></div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Service souhaité *</label>
                  <select required value={form.service} onChange={set('service')}>
                    <option value="">— Sélectionnez un service —</option>
                    {Object.entries(SERVICES).map(([c, svcs]) => (
                      <optgroup key={c} label={c}>
                        {svcs.map(s => <option key={s.name} value={s.name}>{s.name} — {s.price}€</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                  <label>Informations complémentaires</label>
                  <textarea rows={3} placeholder="Numéro de plaque, modèle du véhicule, précisions..." value={form.message} onChange={set('message')} style={{ resize: 'vertical' }} />
                </div>
              </div>
              {err && <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '0.75rem 1rem', marginBottom: '1rem', color: '#b91c1c', fontSize: '0.9rem' }}>{err}</div>}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                  {sending ? 'Envoi en cours...' : <>Continuer <Arrow /></>}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <div style={{ background: 'var(--light-blue)', borderRadius: 12, padding: 'clamp(1.5rem, 4vw, 2.5rem)', border: '1px solid var(--border)' }}>
            {sent && (
              <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="10" cy="10" r="10" fill="#22c55e" />
                  <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <div style={{ fontWeight: 700, color: '#166534' }}>Demande reçue avec succès !</div>
                  <div style={{ color: '#15803d', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                    Votre dossier a été transmis. Vous recevrez une confirmation à <strong>{form.email}</strong>. Pensez à vérifier vos spams.
                  </div>
                </div>
              </div>
            )}
            <h3 style={{ margin: '0 0 0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--navy-dark)' }}>Étape 2 — Documents requis</h3>
            {form.service && (
              <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                Pour votre demande de <strong style={{ color: 'var(--navy)' }}>{form.service}</strong>, préparez les documents suivants et envoyez-les à&nbsp;
                <a href="mailto:garageautomobilefrance30@gmail.com" style={{ color: 'var(--navy-light)', fontWeight: 700 }}>garageautomobilefrance30@gmail.com</a>
              </p>
            )}
            <div style={{ background: '#fff', borderRadius: 8, border: '1px solid var(--border)', padding: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '0.75rem' }}>Documents à fournir</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {docs.map(d => (
                  <li key={d} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                    <Check /> <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 8, padding: '0.875rem 1rem', marginTop: '1rem', fontSize: '0.85rem', color: '#78350f' }}>
              <strong>Important :</strong> Envoyez vos documents en pièces jointes à <strong>garageautomobilefrance30@gmail.com</strong> en précisant votre nom et le service demandé en objet du mail.
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <button onClick={() => { setStep(1); setSent(false) }} className="btn-outline" style={{ fontSize: '0.85rem' }}>← Retour</button>
              <button onClick={() => setStep(3)} className="btn-primary">Voir les instructions de paiement <Arrow /></button>
            </div>
          </div>
        )}

        {/* ── Step 3 ── */}
        {step === 3 && (
          <div style={{ background: 'var(--light-blue)', borderRadius: 12, padding: 'clamp(1.5rem, 4vw, 2.5rem)', border: '1px solid var(--border)' }}>
            <h3 style={{ margin: '0 0 0.25rem', fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--navy-dark)' }}>Étape 3 — Paiement</h3>
            {selectedPrice && (
              <p style={{ margin: '0 0 1.5rem', color: 'var(--text-mid)', fontSize: '0.9rem' }}>
                Montant pour <strong>{form.service}</strong> :&nbsp;
                <strong style={{ color: 'var(--navy)', fontSize: '1.1rem' }}>{selectedPrice}€</strong>
              </p>
            )}

            <div style={{ display: 'grid', gap: '1.25rem' }}>
              {/* Bank transfer */}
              <div style={{ background: '#fff', borderRadius: 8, border: '2px solid var(--navy)', overflow: 'hidden' }}>
                <div style={{ background: 'var(--navy)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="1" y="6" width="15" height="9" rx="1.5" stroke="white" strokeWidth="1.4" /><path d="M5 6V4.5a3.5 3.5 0 017 0V6" stroke="white" strokeWidth="1.4" strokeLinecap="round" /><circle cx="8.5" cy="10.5" r="1.5" fill="white" /></svg>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Virement Bancaire Instantané — Obligatoire</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[
                      { label: 'Bénéficiaire', value: 'Contable Annexe Carte Grise France : Celine Gaborit' },
                      { label: 'IBAN', value: 'FR76 1723 8000 0100 4389 1931 826' },
                      { label: 'RIB', value: '17238000010043891931826' },
                      { label: 'BIC / SWIFT', value: 'SCSYFRP2' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-mid)', marginBottom: '0.2rem' }}>{label}</div>
                        <div style={{ fontFamily: 'Courier New, monospace', fontWeight: 700, color: 'var(--navy-dark)', fontSize: '0.9rem', wordBreak: 'break-all' }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fffbeb', border: '1px solid #fcd34d', borderRadius: 6, fontSize: '0.82rem', color: '#78350f' }}>
                    <strong>Important :</strong> Effectuez un virement instantané uniquement. Après paiement, envoyez la capture d'écran de confirmation à <strong>garageautomobilefrance30@gmail.com</strong>
                  </div>
                </div>
              </div>

              {/* PayPal */}
              <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #003087', overflow: 'hidden' }}>
                <div style={{ background: '#003087', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M12 4.5c0 2.5-2 4-4 4H6.5l-.9 4.5H4l2-10h4.5C11 3 12 3.6 12 4.5z" fill="white" opacity=".9" /><path d="M14 3c0 2.5-2 4-4 4H8L7 11.5H5L7 1.5h4.5C13 1.5 14 2 14 3z" fill="white" opacity=".45" /></svg>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>PayPal — Option Alternative</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {[
                      { label: 'Adresse PayPal', value: 'jeannefelicienne617@gmail.com' },
                      { label: 'Nom du destinataire', value: 'Jeanne Felicienne' },
                      { label: 'Motif / Objet', value: 'entre proches' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-mid)', marginBottom: '0.2rem' }}>{label}</div>
                        <div style={{ fontWeight: 700, color: 'var(--navy-dark)', fontSize: '0.9rem' }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '0.875rem', padding: '0.75rem', background: '#f0f4ff', borderRadius: 6, fontSize: '0.82rem', color: 'var(--text-mid)' }}>
                    Envoyez en tant que paiement entre proches et joignez la confirmation à <strong>garageautomobilefrance30@gmail.com</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background: '#fff', borderRadius: 8, border: '1px solid var(--border)', padding: '1.25rem', marginTop: '1.25rem' }}>
              <div style={{ fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--navy)', marginBottom: '0.75rem' }}>Délais de traitement</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  'Votre dossier est traité dès réception du paiement et des documents',
                  'Délai de traitement : 5 à 7 jours ouvrés après validation',
                  'Vous serez informé par email à chaque étape',
                  'Le document officiel vous sera transmis par voie postale et/ou numérique',
                ].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-mid)', alignItems: 'flex-start' }}>
                    <Check /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <button onClick={() => setStep(2)} className="btn-outline" style={{ fontSize: '0.85rem' }}>← Retour</button>
              <button onClick={() => { setStep(1); setForm(emptyForm); setSent(false); setCaptureFile(null); setCaptureErr(''); setCaptureSent(false) }} className="btn-primary">Nouvelle demande</button>
            </div>

            {/* Payment screenshot upload */}
            <div style={{ marginTop: '2rem', background: '#fff', borderRadius: 8, border: '2px solid var(--gold)', overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(90deg, #c8960e, #f0c040)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="2" y="2" width="13" height="13" rx="2" stroke="white" strokeWidth="1.4" /><path d="M5 9l3-3 4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="6" cy="6" r="1" fill="white" /></svg>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Envoyer la capture d'écran du paiement</span>
              </div>

              <div style={{ padding: '1.25rem' }}>
                {captureSent ? (
                  <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: '1rem 1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                      <circle cx="10" cy="10" r="10" fill="#22c55e" />
                      <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <div style={{ fontWeight: 700, color: '#166534' }}>Capture de paiement envoyée !</div>
                      <div style={{ color: '#15803d', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Votre preuve de paiement a bien été transmise. Votre dossier sera traité dans les 5 à 7 jours ouvrés.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={sendCapture}>
                    <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: 'var(--text-mid)', lineHeight: 1.6 }}>
                      Après avoir effectué votre paiement, envoyez-nous la capture d'écran de confirmation ci-dessous. Formats acceptés : JPG, PNG, PDF (5 Mo max).
                    </p>
                    <div className="form-field">
                      <label>Capture d'écran du paiement *</label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        required
                        onChange={e => { setCaptureFile(e.target.files?.[0] ?? null); setCaptureErr('') }}
                        style={{ padding: '0.5rem', background: '#fff', border: '1px solid var(--border)', borderRadius: 4, cursor: 'pointer', width: '100%' }}
                      />
                      {captureFile && (
                        <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: 'var(--navy)', fontWeight: 600 }}>
                          ✓ {captureFile.name} ({(captureFile.size / 1024).toFixed(0)} Ko)
                        </div>
                      )}
                    </div>
                    {captureErr && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 6, padding: '0.75rem 1rem', marginBottom: '1rem', color: '#b91c1c', fontSize: '0.9rem' }}>{captureErr}</div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                      <button type="submit" className="btn-gold" disabled={captureSending} style={{ opacity: captureSending ? 0.7 : 1 }}>
                        {captureSending ? 'Envoi en cours...' : <>Envoyer la capture <Arrow /></>}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Send request button */}
            <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '2px solid #22c55e', borderRadius: 12, padding: '1.75rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', color: '#166534', marginBottom: '0.5rem' }}>
                Prêt à envoyer votre demande ?
              </div>
              <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: '#15803d', lineHeight: 1.6 }}>
                Cliquez ci-dessous pour envoyer votre demande complète directement à notre équipe. Votre client de messagerie s'ouvrira avec toutes les informations pré-remplies.
              </p>
              <a
                href={`mailto:garageautomobilefrance30@gmail.com?subject=${encodeURIComponent(`Demande ${form.service} — ${form.prenom} ${form.nom}`)}&body=${encodeURIComponent(`Bonjour,\n\nJe souhaite effectuer une demande de ${form.service}.\n\nMes coordonnées :\n• Nom : ${form.prenom} ${form.nom}\n• Email : ${form.email}\n• Téléphone : ${form.telephone}\n• Adresse : ${form.adresse}, ${form.codePostal} ${form.ville}\n${form.message ? `\nInformations complémentaires :\n${form.message}\n` : ''}\nJ'ai effectué le paiement de ${selectedPrice ?? '—'}€ et vous transmets ci-joint la capture d'écran de confirmation.\n\nCordialement,\n${form.prenom} ${form.nom}`)}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  background: '#16a34a', color: '#fff',
                  fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: '1rem',
                  padding: '0.9rem 2rem', borderRadius: 6, textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(22,163,74,0.35)',
                  transition: 'all 0.2s',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1" y="3" width="16" height="12" rx="2" stroke="white" strokeWidth="1.5" />
                  <path d="M1 6l8 5 8-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Envoyer votre demande
              </a>
              <p style={{ margin: '0.75rem 0 0', fontSize: '0.78rem', color: '#166534', opacity: 0.8 }}>
                Envoi vers <strong>garageautomobilefrance30@gmail.com</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#081d47', color: 'rgba(255,255,255,0.65)', padding: 'clamp(2rem, 5vw, 4rem) 1.5rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', color: '#fff', marginBottom: '0.25rem' }}>
              Service <span style={{ color: '#f0c040' }}>Carte Grise</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Habilité SIV • 100% en ligne
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>Service professionnel de carte grise en ligne. Traitement rapide, sécurisé et officiel via le Système d'Immatriculation des Véhicules.</p>
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '1rem' }}>Services</div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Carte Grise', 'Changement de Titulaire', 'Duplicata', "Changement d'Adresse", 'Véhicule Importé', 'Certificat de Non-Gage'].map(s => (
                <li key={s}>
                  <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', padding: 0, fontFamily: 'var(--font-body)', textAlign: 'left' }}>{s}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={{ fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fff', marginBottom: '1rem' }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.2rem' }}>Email</div>
                <a href="mailto:garageautomobilefrance30@gmail.com" style={{ color: '#f0c040', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none', wordBreak: 'break-all' }}>
                  garageautomobilefrance30@gmail.com
                </a>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.2rem' }}>Délais</div>
                <div style={{ fontSize: '0.875rem' }}>5 à 7 jours ouvrés</div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.2rem' }}>Horaires</div>
                <div style={{ fontSize: '0.875rem' }}>Lun–Ven, 9h–18h</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem' }}>© 2026 Service Carte Grise — Tous droits réservés</div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', fontSize: '0.8rem' }}>
            <span style={{ background: 'rgba(200,150,14,0.2)', color: '#f0c040', padding: '0.2rem 0.6rem', borderRadius: 3, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Habilité SIV</span>
            <span>Traitement rapide et sécurisé</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Testimonials />
        <Services />
        <Process />
      </main>
      <Footer />
    </>
  )
}
