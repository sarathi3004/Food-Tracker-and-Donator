const axios = require('axios');

const sendWhatsAppMessage = async (recipientNumber, message) => {
  const options = {
    method: 'POST',
    url: 'whatsapp-messaging-hub.p.rapidapi.com', // Replace with the actual URL from RapidAPI
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'whatsapp-messaging-hub.p.rapidapi.com', // Replace with your API host
    },
    data: {
      to: +919488159651, // WhatsApp number with country code (e.g., '+911234567890')
      message: message,
    },
  };

  try {
    const response = await axios.request(options);
    console.log('Message sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
  }
};
const sendWhatsAppMessage = require('./whatsappService');

app.post('api/whatappservies', async (req, res) => {
  const { phoneNumber, message } = req.body;

  try {
    await sendWhatsAppMessage(phoneNumber, message);
    res.status(200).send('Message sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send message');
  }
});

module.exports = sendWhatsAppMessage;