const axios = require('axios');

class PipefyService {
  constructor() {
    this.apiUrl = process.env.PIPEFY_API_URL;
    this.token = process.env.PIPEFY_API_TOKEN;
  }

  async getCard(cardId) {
    const response = await axios.post(
      this.apiUrl,
      {
        query: `
          query {
            card(id: ${cardId}) {
              fields {
                name
                value
              }
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    );

    return response.data.data.card;
  }
}

module.exports = PipefyService;
