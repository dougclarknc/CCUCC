myApp.controllers = {
  cardMgmtPage: function(page) {
    page.querySelector('[component="button/submit"]').onclick = async function() {
      var modal = page.querySelector('ons-modal');
      var replacementReason = page.querySelector('#replaceReasonSelect').value;
      if (replacementReason === "") {
        ons.notification.alert('Please select a replacement reason.')
      } else {
        modal.show();
        success = await myApp.services.cardControls.reportCardIssue({
          cardId: page.querySelector('#cardSelect').value,
          reason: replacementReason,
          comment: page.querySelector('#commentsTextArea').value,
        });
        modal.hide();
        ons.notification.alert(success ? 'Replacement Request Submitted' : 'Something went wrong');
      }
    };

    page.querySelector('#freezeSwitch').addEventListener('change', async function(event) {
      var modal = page.querySelector('ons-modal');
      modal.show();
      var currentCardID = page.querySelector('#cardSelect').value.cardID;
      var success = await myApp.services.cardControls.onOff({
        cardId: currentCardID,
        frozen: this.value,
      });
      event.switch.checked = success;
      modal.hide();
    });
  }
}