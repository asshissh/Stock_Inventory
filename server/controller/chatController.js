require("dotenv").config();
const twilio = require("twilio");
const { getPrediction } = require("./data");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendWhatsAppMessage = async (req, res) => {
  const { companyId } = req.params;

  try {
    // Fetch prediction data
    const predictionData = await getPrediction(companyId);

    if (req.method === "GET") {
      return res.status(200).json(predictionData);
    }

    // Construct message body
    const messageBody = predictionData
      .map((p) => `Stock: ${p.stockName}, Purchase Quantity: ${p.purchaseQuantity}`)
      .join("\n");

    // Send WhatsApp message via Twilio
    const message = await client.messages.create({
      from: "whatsapp:+13012983243", // Correct Twilio sandbox number
      body: messageBody,
      to: "whatsapp:+918957564941" // Recipient WhatsApp number
    });

    res.status(200).json({ message: "WhatsApp message sent", sid: message.sid, predictionData });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendWhatsAppMessage };
