// alertService.js - exemplo simples
const sendEmail = async (payload) => {
  // implementar envio via nodemailer ou serviço externo
  console.log('Sending EMAIL alert for', payload.device_id, 'current', payload.current);
};

const sendWhatsApp = async (payload) => {
  // implementar integração (Twilio / WABA / API própria / n8n)
  console.log('Sending WhatsApp alert (placeholder) for', payload.device_id);
};

async function sendAlert(payload) {
  await sendEmail(payload);
  await sendWhatsApp(payload);
}

module.exports = { sendAlert };
