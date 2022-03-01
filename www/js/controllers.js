myApp.controllers = {
  cardMgmtPage: function(page) {
    

    page.querySelector('[component="button/submit"]').onclick = function() {
      var replacementReason = page.querySelector('#replaceReasonSelect').value;
      if (replacementReason === "") {
        ons.notification.alert('Please select a replacement reason.')
      } else {
        myApp.services.cardControls.reportCardIssue({
          reason: replacementReason,
          comment: page.querySelector('#commentsTextArea').value,
        });
      }
    };

    page.querySelector('#freezeSwitch').addEventListener('change', function() {
      var currentCardID = 1; //page.querySelector('#cardSelect').value.cardID;
      var success = myApp.services.cardControls.onOff({
        cardId: currentCardID,
        frozen: this.value,
      });
      if (!success) document.querySelector('#freezeSwitch').checked = false;
    });
  }
}