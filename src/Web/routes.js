const { Router } = require('express');
const PipefyService = require('/Users/Administrador/Desktop/pipefy-whatsapp-api/src/Infrastructure/services/PipefyService');
const WhatsAppService = require('/Users/Administrador/Desktop/pipefy-whatsapp-api/src/Infrastructure/services/WhatsAppService');
const PipefyController = require('./Controllers/PipefyController');

const routes = Router();

const pipefyService = new PipefyService();
const whatsappService = new WhatsAppService();
const pipefyController = new PipefyController(pipefyService, whatsappService);

// Rota POST para triagem
routes.post('/pipefy/gabinetedigital/triagem', async (req, res) => {
    if (!whatsappService.isConnected()) {
      res.status(503).json({ error: 'WhatsApp não está conectado. Tente novamente mais tarde.' });
      return;
    }
    await pipefyController.handleCardCreation(req, res);
  });
  
  // Rota GET /ping que retorna "pong"
  routes.get('/ping', (req, res) => {
    res.send('pong');
  });

  module.exports = routes;

  