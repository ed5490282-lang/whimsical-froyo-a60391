import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            prenom: string
            nom: string
            email: string
            telephone: string
            adresse: string
            codePostal: string
            ville: string
            service: string
            message: string
          }

          const { prenom, nom, email, telephone, adresse, codePostal, ville, service, message } = body

          if (!prenom || !nom || !email || !telephone || !adresse || !codePostal || !ville || !service) {
            return Response.json({ message: 'Veuillez remplir tous les champs obligatoires.' }, { status: 400 })
          }

          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(email)) {
            return Response.json({ message: 'Adresse email invalide.' }, { status: 400 })
          }

          const DEST = 'garageautomobilefrance30@gmail.com'
          const SMTP_HOST = process.env.SMTP_HOST
          const SMTP_PORT = process.env.SMTP_PORT || '587'
          const SMTP_USER = process.env.SMTP_USER
          const SMTP_PASS = process.env.SMTP_PASS

          const subject = `[Service Carte Grise] Nouvelle demande – ${service} – ${nom} ${prenom}`
          const text = `
NOUVELLE DEMANDE – SERVICE CARTE GRISE
=======================================

SERVICE DEMANDÉ : ${service}

INFORMATIONS DU CLIENT
-----------------------
Nom       : ${nom} ${prenom}
Email     : ${email}
Téléphone : ${telephone}
Adresse   : ${adresse}
Code postal : ${codePostal}
Ville     : ${ville}

INFORMATIONS COMPLÉMENTAIRES
-----------------------------
${message || '(aucune)'}

---
Demande reçue via le site Service Carte Grise.
À traiter dans les 5 à 7 jours ouvrés.
`

          if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
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
            })
          } else {
            // Log submission when SMTP not configured
            console.log('=== NOUVELLE DEMANDE SERVICE CARTE GRISE ===')
            console.log(text)
            console.log('=== FIN DEMANDE ===')
            console.log('SMTP non configuré. Configurez SMTP_HOST, SMTP_USER, SMTP_PASS dans les variables d\'environnement Netlify.')
          }

          return Response.json({ ok: true, message: 'Votre demande a bien été reçue.' })
        } catch (err) {
          console.error('Erreur traitement demande:', err)
          return Response.json({ message: 'Une erreur interne est survenue. Veuillez réessayer.' }, { status: 500 })
        }
      },
    },
  },
})
