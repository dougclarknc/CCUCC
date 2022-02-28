ccucc.services = {
  baseURL = "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/1a662d35-8008-4343-b811-226e2284646b/appdeveloperinterview/1.0.1/m",
  userId = '12345',

  cardControls: {
    onOff: function(data){
      const headers = new Headers();
      headers.append('API-Key', 'C5F5A63C-E604-47AA-A7CC-B01F95FFBF09');
      
      const init = {
        method: 'POST',
        headers
      };
      
      fetch(`${baseURL}/cardcontrols/onoff/${data.cardId}`, init)
      .then((response) => {
        return response.json(); // or .text() or .blob() ...
      })
      .then((text) => {
        // text is the response body
      })
      .catch((e) => {
        // error in e.message
      });
    },

    reportCardIssue: function(data){
      const headers = new Headers();
      headers.append('API-Key', 'C5F5A63C-E604-47AA-A7CC-B01F95FFBF09');
      
      var bodyBuilder = {
        "cardId":data.cardId,
        "cardStatus":data.reason,
        "comment":data.comment,              
      };
      
      const init = {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyBuilder),
      };
      
      fetch(`${baseURL}/cardcontrols/reportcardissue`, init)
      .then((response) => {
        return response.json(); // or .text() or .blob() ...
      })
      .then((text) => {
        // text is the response body
      })
      .catch((e) => {
        // error in e.message
      });
    }
  },

  cardInfo: function() {
    const headers = new Headers();
    headers.append('API-Key', 'C5F5A63C-E604-47AA-A7CC-B01F95FFBF09');
    
    const init = {
      method: 'GET',
      headers
    };
    
    fetch(`${baseURL}/cardInfo/${userId}`, init)
    .then((response) => {
      return response.json(); // or .text() or .blob() ...
    })
    .then((text) => {
      // text is the response body
    })
    .catch((e) => {
      // error in e.message
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
            '<div class="center">' +
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

      var cardList = document.querySelector('#card-list');
      cardList.insert(cardItem);
    }
  }
}