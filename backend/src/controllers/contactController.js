const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const asyncHandler = require('express-async-handler');

/**
 * Handles transactional email delivery from the Contact Form
 * POST /api/contact
 */
exports.sendContactEmail = async (req, res, next) => {
    try {
        const { name, email, phone, service, message, image } = req.body;

        // Validation checks
        if (!name || !email || !message) {
            res.status(400);
            throw new Error("Veuillez remplir les champs obligatoires (nom, email, message).");
        }

        // Sauvegarder le message en base de données pour l'admin
        await Contact.create({
            name,
            email,
            phone,
            service,
            message,
            image
        });

        const dateString = new Date().toLocaleString('fr-FR', { timeZone: 'Indian/Mayotte' });

        console.log(`[Contact] Nouveau message de ${name} (${email}) - Service: ${service || 'Général'}`);

        // Setup Nodemailer Transport
        const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
        const smtpPort = parseInt(process.env.SMTP_PORT || '587');
        const smtpUser = process.env.SMTP_USER || 'dembenimairie@gmail.com';
        const smtpPass = process.env.SMTP_PASS;

        const isMockTransport = !smtpPass || smtpPass.includes('votre_mot_de_passe_d_application');

        // Premium HTML Template for Mairie Admin
        const adminEmailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
                    .email-card { max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                    .email-header { background: linear-gradient(135deg, #0f3c28 0%, #06180f 100%); color: #ffffff; padding: 30px; text-align: center; }
                    .email-header h2 { margin: 0; font-size: 20px; letter-spacing: 0.05em; font-weight: 800; }
                    .email-header p { margin: 5px 0 0 0; font-size: 13px; color: #4ade80; font-weight: 700; }
                    .email-body { padding: 40px 30px; }
                    .field-section { margin-bottom: 24px; border-bottom: 1px dotted #e2e8f0; padding-bottom: 12px; }
                    .field-label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
                    .field-val { font-size: 15px; font-weight: 700; color: #1e293b; }
                    .message-box { background-color: #f8fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #16a34a; font-size: 14px; color: #334155; line-height: 1.5; font-style: italic; }
                    .email-footer { background-color: #f8fafc; text-align: center; padding: 20px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-weight: 600; }
                </style>
            </head>
            <body>
                <div class="email-card">
                    <div class="email-header">
                        <h2>NOUVEAU MESSAGE CITOYEN</h2>
                        <p>Plateforme Civique de Dembéni</p>
                    </div>
                    <div class="email-body">
                        <div class="field-section">
                            <div class="field-label">Nom Complet</div>
                            <div class="field-val">${name}</div>
                        </div>
                        <div class="field-section">
                            <div class="field-label">Adresse E-mail</div>
                            <div class="field-val"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></div>
                        </div>
                        <div class="field-section">
                            <div class="field-label">Téléphone</div>
                            <div class="field-val">${phone || 'Non renseigné'}</div>
                        </div>
                        <div class="field-section">
                            <div class="field-label">Service Municipal Concerné</div>
                            <div class="field-val"><span style="background-color: #eafaf1; color: #15803d; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 800;">${service || 'Secrétariat Général'}</span></div>
                        </div>
                        <div class="field-section" style="border: none; padding-bottom: 0;">
                            <div class="field-label">Message Détaillé</div>
                            <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                    <div class="email-footer">
                        Reçu le ${dateString} • Mairie de Dembéni, Mayotte
                    </div>
                </div>
            </body>
            </html>
        `;

        // Auto-reply HTML Template for Citizen
        const citizenReplyHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; }
                    .email-card { max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
                    .email-header { background: linear-gradient(135deg, #0f3c28 0%, #06180f 100%); color: #ffffff; padding: 30px; text-align: center; }
                    .email-header h2 { margin: 0; font-size: 20px; letter-spacing: 0.05em; font-weight: 800; }
                    .email-header p { margin: 5px 0 0 0; font-size: 13px; color: #4ade80; font-weight: 700; }
                    .email-body { padding: 40px 30px; text-align: left; }
                    .greeting { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 16px; }
                    .reply-text { font-size: 14px; color: #475569; line-height: 1.6; margin-bottom: 24px; }
                    .info-box-confirm { background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; display: flex; align-items: flex-start; gap: 12px; margin-bottom: 28px; }
                    .info-box-text { color: #14532d; font-size: 13px; line-height: 1.5; font-weight: 600; }
                    .email-footer { background-color: #f8fafc; text-align: center; padding: 20px; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-weight: 600; }
                </style>
            </head>
            <body>
                <div class="email-card">
                    <div class="email-header">
                        <h2>CONFIRMATION DE RÉCEPTION</h2>
                        <p>Mairie de Dembéni</p>
                    </div>
                    <div class="email-body">
                        <div class="greeting">Bonjour ${name},</div>
                        <div class="reply-text">
                            Nous vous confirmons avoir bien reçu votre message adressé au service <strong>${service || 'Général'}</strong>. 
                            Votre demande a été enregistrée dans notre système de gestion citoyenne et sera traitée dans les plus brefs délais par nos agents communaux.
                        </div>
                        <div class="info-box-confirm">
                            <div class="info-box-text">
                                ⏳ <strong>Délai de traitement moyen :</strong> Les agents municipaux s'efforcent de vous répondre sous un délai maximal de <strong>48 heures ouvrées</strong>.
                            </div>
                        </div>
                    </div>
                    <div class="email-footer">
                        Cordialement,<br>L'équipe administrative de Dembéni
                    </div>
                </div>
            </body>
            </html>
        `;

        if (isMockTransport) {
            console.log("⚠️ Mode simulation SMTP. L'e-mail ne sera pas réellement envoyé.");
            return res.status(200).json({
                success: true,
                message: "Message enregistré avec succès (Mode Simulation).",
                mode: "mock"
            });
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false,
            auth: {
                user: smtpUser,
                pass: smtpPass
            }
        });

        // 1. Send to Admin
        await transporter.sendMail({
            from: `"Portail Citoyen Dembéni" <${smtpUser}>`,
            to: smtpUser,
            subject: `[CONTACT] ${service || 'Message'} de ${name}`,
            html: adminEmailHtml
        });

        // 2. Send confirmation to Citizen
        await transporter.sendMail({
            from: `"Mairie de Dembéni" <${smtpUser}>`,
            to: email,
            subject: "Accusé de réception - Votre message à la Mairie de Dembéni",
            html: citizenReplyHtml
        });

        res.status(200).json({
            success: true,
            message: "Votre message a été envoyé et enregistré avec succès."
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact/all
 * @access  Private (Admin)
 */
exports.getAllMessages = asyncHandler(async (req, res) => {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
    });
});

/**
 * @desc    Delete a message
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin)
 */
exports.deleteMessage = asyncHandler(async (req, res) => {
    const message = await Contact.findById(req.params.id);
    if (!message) {
        res.status(404);
        throw new Error('Message non trouvé');
    }
    await message.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Message supprimé'
    });
});

/**
 * @desc    Get messages for the logged-in user
 * @route   GET /api/contact/my
 * @access  Private
 */
exports.getMyMessages = asyncHandler(async (req, res) => {
    const messages = await Contact.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
    });
});
