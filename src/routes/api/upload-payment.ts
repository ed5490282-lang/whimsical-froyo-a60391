import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/upload-payment')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData()
          const nom = formData.get('nom') as string
          const prenom = formData.get('prenom') as string
          const email = formData.get('email') as string
          const service = formData.get('service') as string
          const capture = formData.get('capture') as File | null

          if (!nom || !prenom || !email || !service) {
            return Response.json({ message: 'Données manquantes.' }, { status: 400 })
          }

          if (!capture || capture.size === 0) {
            return Response.json({ message: "Veuillez joindre une capture d'écran du paiement." }, { status: 400 })
          }

          const MAX_SIZE = 5 * 1024 * 1024
          if (capture.size > MAX_SIZE) {
            return Response.json({ message: 'Le fichier est trop volumineux (5 Mo maximum).' }, { status: 400 })
          }

          const DEST = 'garageautomobilefrance30@gmail.com'
          const SMTP_HOST = process.env.SMTP_HOST
          const SMTP_PORT = process.env.SMTP_PORT || '587'
          const SMTP_USER = process.env.SMTP_USER
          const SMTP_PASS = process.env.SMTP_PASS

          const subject = `[Capture Paiement] ${service} – ${nom} ${prenom}`
          const text = `
CONFIRMATION DE PAIEMENT – SERVICE CARTE GRISE
===============================================

SERVICE : ${service}
CLIENT  : ${nom} ${prenom}
EMAIL   : ${email}

La capture d'écran du paiement est jointe à cet email.

---
Reçu via le site Service Carte Grise.
`

          if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
            const buffer = Buffer.from(await capture.arrayBuffer())
            const nodemailer = await import('nodemailer')
            const transporter = nodemailer.default.createTransport({
              host: SMTP_HOST,
              port: Number(SMTP_PORT),
              secure: Number(SMTP_PORT) === 465,
              auth: { user: SMTP_USER, pass: SMTP_PASS },
            })

            await transporter.sendMail({
              from: `"Service Carte Grise" <${SMTP_USER}>`,
              to: DEST,
              replyTo: email,
              subject,
              text,
              html: text.replace(/\n/g, '<br>').replace(/={3,}/g, '<hr>').replace(/^-{3,}$/gm, '<hr>'),
              attachments: [{ filename: capture.name || 'capture-paiement.png', content: buffer }],
            })
          } else {
            console.log('=== CAPTURE PAIEMENT REÇUE ===')
            console.log(`Service: ${service} — Client: ${nom} ${prenom} (${email})`)
            console.log(`Fichier: ${capture.name} (${capture.size} octets)`)
            console.log("SMTP non configuré. Configurez SMTP_HOST, SMTP_USER, SMTP_PASS dans les variables d'environnement Netlify.")
          }

          return Response.json({ ok: true, message: 'Capture de paiement envoyée avec succès.' })
        } catch (err) {
          console.error('Erreur upload capture:', err)
          return Response.json({ message: 'Une erreur interne est survenue. Veuillez réessayer.' }, { status: 500 })
        }
      },
    },
  },
})
