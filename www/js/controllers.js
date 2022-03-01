myApp.controllers = {
  cardMgmtPage: function(page) {
    page.querySelector('ons-select').addEventListener('change', function(event) {
      var toggle = page.querySelector('ons-switch');
      toggle.checked = myApp.services.dummyData[event.target.selectedIndex].frozen;
      //Improvement: should update request replacement with replacing
    });

    page.querySelector('[component="button/submit"]').onclick = async function() {
      var modal = page.querySelector('ons-modal');
      var replacementReason = page.querySelector('#replaceReasonSelect').value;
      var currentCardID = page.querySelector('#cardSelect').value;
      console.log(currentCardID);
      if (replacementReason === "") {
        ons.notification.alert('Please select a replacement reason.')
      } else {
        modal.show();
        success = await myApp.services.cardControls.reportCardIssue({
          cardId: currentCardID,
          reason: replacementReason,
          comment: page.querySelector('#commentsTextArea').value,
        });
        if (success && replacementReason != 'Damaged') { //stolen/lost accts lock
            page.querySelector("#freezeSwitch").checked = true;
        }
        modal.hide();
        ons.notification.alert(success ? 'Replacement Request Submitted' : 'Something went wrong');
      }
    };

    page.querySelector('#freezeSwitch').addEventListener('change', async function(event) {
      var modal = page.querySelector('ons-modal');
      modal.show();
      var currentCardID = page.querySelector('#cardSelect').value;
      console.log(currentCardID);
      var success = await myApp.services.cardControls.onOff({
        cardId: currentCardID,
        frozen: this.value,
      });
      var checked = event.switch.checked
      if (event.isInteractive) {
        event.switch.checked = success ? checked : !checked //invert
      } else {
          event.switch.checked = success;
      }
      modal.hide();
    });
  }
}