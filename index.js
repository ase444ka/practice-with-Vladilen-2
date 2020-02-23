
let myForm = document.forms[0];
myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let myContent = this.setModalContent.value;
    let myTitle = this.setModalTitle.value;
    let myClosable = this.setClosable.checked;
    let modal = $.modal({title: myTitle, content: myContent, closable: myClosable});
    modal.open();

  });

