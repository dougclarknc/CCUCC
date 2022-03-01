myApp.services = {
  baseURL: "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/1a662d35-8008-4343-b811-226e2284646b/appdeveloperinterview/1.0.1/m",
  userId: '12345',

  cardControls: {
    onOff: async function(data){
      const headers = new Headers();
      headers.append('API-Key', 'C5F5A63C-E604-47AA-A7CC-B01F95FFBF09');
      
      const init = {
        method: 'POST',
        headers
      };
      await fetch(`${myApp.services.baseURL}/cardcontrols/onoff/${data.cardId}`, init)
      .then((response) => {
        //console.log("service response: " +response.ok);
        success = response.ok; // or .text() or .blob() ..
        return success;
      })
      .then((success) => {
        //console.log("service ok: " +success);
      })
      .catch((e) => {
        console.error(e.message);
      });
      //FIXME: simulate network delay
      await new Promise(r => setTimeout(r, 2000));

      return success;
    },

    reportCardIssue: async function(data){
      const headers = new Headers();
      headers.append('API-Key', 'C5F5A63C-E604-47AA-A7CC-B01F95FFBF09');
      headers.append('content-type', 'application/json');

      var bodyBuilder = {
        cardId: data.cardId,
        cardStatus: data.reason,
        comment: data.comment,              
      };
      const input = {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyBuilder),
      };

      await fetch(`${myApp.services.baseURL}/cardcontrols/reportcardissue`, input)
      .then((response) => {
        success = response.ok
        return response.ok; // or .text() or .blob() ...
      })
      .then((body) => {
          //console.log(JSON.stringify(body));
      })
      .catch((e) => {
        console.error(e);
      });
      //FIXME: simulate network delay
      await new Promise(r => setTimeout(r, 2000));
      return success;
    }
  },

  cardInfo: function() {
    const headers = new Headers();
    headers.append('API-Key', 'C5F5A63C-E604-47AA-A7CC-B01F95FFBF09');
    
    const init = {
      method: 'GET',
      headers
    };
    fetch(`${myApp.services.baseURL}/cardInfo/${myApp.services.userId}`, init)
    .then((response) => {
      return response.json(); // or .text() or .blob() ...
    })
    .then((text) => {
      for (var card of text.cards) {
        myApp.services.cards.create({
            cardId: card.cardId,
            cardName: card.cardName,
            maskedCardNumber: card.maskedCardNumber,
            frozen: false
        });
      }
      //console.log(JSON.stringify(text));
    })
    .catch((e) => {
      console.error(e);
    });
  },

  cards: {
    create: function(data) {
      // Task item template.
      var cardItem = ons.createElement(
        `<option value=${data.cardId}>`+
          `<ons-list-item class='card' tappable id=${data.cardId}">` +
            '<div class="left">' +
              data.maskedCardNumber +
            '</div>' +
            '<div class="right">' +
              data.cardName +
            '</div>' +
          '</ons-list-item>'+
        '</option>'
      );
      cardItem.data = data;

      // Add functionality to update form when card changed
      cardItem.querySelector('.card').onclick = function() {
        document.querySelector("#cardSelect");
        document.querySelector('#freezeSwitch').checked = data.frozen
      };

      var cardList = document.querySelector('#cardSelect');
      cardList.add(cardItem);
    }
  }
}