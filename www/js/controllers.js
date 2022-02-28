ccncc.controllers = {
  cardMgmtPage: function(page) {
    page.querySelector('[component="button/submit"]').onclick = function() {
      var replacementReason = page.querySelector('#replaceReasonSelect').value;
      if (replacementReason === "") {
        ons.notification.alert('Please select a replacement reason.')
      } else {
        ccncc.services.cardControls.reportCardIssue({
          reason: replacementReason,
          comment: page.querySelector('#commentsTextArea').value,
        });
      }
    };

    document.querySelector('ons-switch').addEventListener('change', function() {
      var currentCardID = page.querySelector('#cardSelect').value.cardID;
      var success = ccncc.services.cardControls.onOff({
        cardID: currentCardID,
        frozen: value,
      });
      if (!success) document.querySelector('ons-switch').checked = false;
    });
  }
}