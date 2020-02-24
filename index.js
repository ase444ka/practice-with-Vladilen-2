const fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
]

/*

* ---------
* 4. На основе $.modal нужно сделать другой плагин $.confirm (Promise)
* */
let showCards = function(goods) {
  let row = document.createElement('div');
  row.classList.add('row');
  let str = ``;
  let i = 0;
  for (let item of goods) {
    str += `
    <div class="col">
    <div class="card">
      <img class="card-img-top" style="height: 300px;" src="${item.img}">      
      <div class="card-body">
      <i style = "display:none">${i}</i>
        <h5 class="card-title">${item.title}</h5>
        <a href="#" class="btn btn-primary"  data-price="true">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-delete="true">Удалить</a>
      </div>
    </div>
  </div>
    `
    i++;
  }
  row.insertAdjacentHTML('afterbegin', str);
  document.querySelector('h1').after(row);
  

}
showCards(fruits);
document.body.addEventListener('click', (event) => {
  let tar = event.target;
  if(tar.dataset.price) {
    let i = tar.closest('.card').querySelector('i').textContent
    let modal = $.modal({
      title: fruits[i].title,
      closable: true,
      content: `
        <p>Эти прекрасные ${fruits[i].title} стоят ${fruits[i].price}&#8381; за килограмм!</p>
        
      `,
      width: '400px',
      footerButtons: [
        {text: 'Покупаю!', type: 'primary', handler() {
          console.log('Primary btn clicked')
          modal.close()
        }},
        {text: 'Дороговато:(', type: 'danger', handler() {
            console.log('Danger btn clicked')
            modal.close()
          }}
      ]
    })
    modal.open();
    
  }
  if(tar.dataset.delete) {
    let col = tar.closest('.col');
    let modal = $.modal({
      title: "Внимание!!!",
      closable: true,
      content: `
        <p>Вы уверены, что хотите удалить карточку??</p>
        
      `,
      width: '400px',
      footerButtons: [
        {text: 'Уверен!', type: 'primary', handler() {
          col.remove()
          modal.close()
        }},
        {text: 'Сомневаюсь уже', type: 'danger', handler() {
            console.log('Danger btn clicked')
            modal.close()
          }}
      ]
    })
    modal.open();
  }
})

