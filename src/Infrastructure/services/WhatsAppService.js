const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.connected = false;
    this.initialize();
  }

  initialize() {
    this.client = new Client({
      authStrategy: new LocalAuth({ clientId: 'whatsapp_client' }),
      puppeteer: {
        headless: false,
      },
    });

    this.client.on('qr', (qr) => {
      console.log('Escaneie este QR Code para conectar ao WhatsApp:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      console.log('Conectado ao WhatsApp Web com sucesso!');
      this.connected = true;
    });

    this.client.on('disconnected', (reason) => {
      console.log(`Conexão perdida devido a: ${reason}. Reconectando...`);
      this.connected = false;
      this.client.initialize();
    });

    this.client.initialize();
  }

  isConnected() {
    return this.connected;
  }

  async sendMessage(phoneNumber, message) {
    if (!this.client) {
      throw new Error('WhatsApp não está conectado!');
    }

    const formattedNumber = phoneNumber.includes('@c.us')
      ? phoneNumber
      : `${phoneNumber}@c.us`;

    await this.client.sendMessage(formattedNumber, message);
  }
}

module.exports = WhatsAppService;
