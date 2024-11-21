const PipefyService = require('/Users/Administrador/Desktop/pipefy-whatsapp-api/src/Infrastructure/services/PipefyService');
const WhatsAppService = require('/Users/Administrador/Desktop/pipefy-whatsapp-api/src/Infrastructure/services/WhatsAppService');

class PipefyController {
  constructor(pipefyService, whatsappService) {
    this.pipefyService = pipefyService;
    this.whatsappService = whatsappService;
  }

  async handleCardCreation(req, res) {
    try {
      const { data } = req.body;
      if (!data || !data.card_id) {
        res.status(400).json({ error: 'Card ID is required.' });
        return;
      }

      // Consulta os dados do card no Pipefy
      const card = await this.pipefyService.getCard(data.card_id);

      // Extrair os campos necessários
      const nome = this.extractFieldValue(card.fields, 'Nome:');
      const tituloSolicitacao = this.extractFieldValue(card.fields, 'Título da solicitação:');
      const numeroChamado = data.card_id;
      let numeroDestinatario = this.extractFieldValue(card.fields, 'Telefone:');
      numeroDestinatario = numeroDestinatario.replace(/\D/g, '');

      if (numeroDestinatario.startsWith('5562')) {
        const parteLocal = numeroDestinatario.slice(4);
        if (parteLocal.startsWith('9')) {
          numeroDestinatario = '5562' + parteLocal.slice(1);
        }
      }

      // Formatar a mensagem
      const message = this.formatWhatsAppMessage(nome, tituloSolicitacao, numeroChamado);

      // Enviar a mensagem pelo WhatsApp
      await this.whatsappService.sendMessage(numeroDestinatario, message);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error handling card creation:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }

  extractFieldValue(fields, fieldName) {
    const field = fields.find((f) => f.name === fieldName);
    return field ? field.value : 'N/A';
  }

  formatWhatsAppMessage(name, title, id) {
    return `
Olá, ${name}!

Recebemos sua solicitação "${title}" e nossa assessoria já está cuidando disso.

Número do chamado: #${id}

Atenciosamente,
Vereadora Kátia.
    `;
  }
}

module.exports = PipefyController;