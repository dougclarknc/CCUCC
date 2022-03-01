myApp.services = {
  baseURL: "https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/1a662d35-8008-4343-b811-226e2284646b/appdeveloperinterview/1.0.1/m",
  userId: '12345',
  dummyData: [], //Improvement: should be dataService operating on model/

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
        success = response.ok; // or .text() or .blob() ..
        return success;
      })
      .then((success) => {
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
            //FIXME: mockupdata has no frozen toggle
            frozen: card.cardId % 2==0,
            replacing: "false", //damaged, lost, stolen
        });
        //Improvement: bind to model insert into localData
      }
      console.log(JSON.stringify(myApp.services.dummyData));
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
            '<div class="right">' +
              data.maskedCardNumber +
            '</div>' +
            '<div class="left">' +
              data.cardName +
            '</div>' +
          '</ons-list-item>'+
        '</option>'
      );
      cardItem.data = data;
//Improvement: options/cards should be updated/created by controller
      var cardList = document.querySelector('#cardSelect');
      cardList.add(cardItem);
      myApp.services.dummyData.push(data);
    }
  }
}