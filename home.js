/*       wrappers       */
const log = function(_toLog) { return console.log(_toLog) }
const doc = {
  getById: function (_id) { return document.getElementById(_id) },
  getByClass: function (_class) { return document.getElementsByClassName(_class) },
  getFirst: function (_selector) { return document.querySelector(_selector) },
  get: function (_selector) { return document.querySelectorAll(_selector) }
}

let localStorageValue = localStorage.getItem('filterValues')
let jsObj = JSON.parse(localStorageValue)

if (jsObj) {
  doc.getById('nome').value = jsObj['nome'] || null
  doc.getById('sobrenome').value = jsObj['sobrenome'] || null
  doc.getById('idade').value = jsObj['idade'] || null
  doc.getById('cidade').value = jsObj['cidade'] || null
  doc.getById('cor').value = jsObj['cor'] || null
  doc.getById('select-field').value = jsObj['selectField'] || null
  doc.getById('checkbox1').checked = jsObj['checkbox1'] || false
  doc.getById('checkbox2').checked = jsObj['checkbox2'] || false
  doc.getById('checkbox3').checked = jsObj['checkbox3'] || false
  doc.getById(jsObj['radio']).checked = true
}

doc.getById('form').addEventListener('change', function () {
  function validateCheckbox (checkbox) {
    return checkbox ? checkbox : false
  }

  let myObj = {
    nome: doc.getById('nome').value.trim(),
    sobrenome: doc.getById('sobrenome').value.trim(),
    idade: doc.getById('idade').value.trim(),
    cidade: doc.getById('cidade').value.trim(),
    cor: doc.getById('cor').value.trim(),
    selectField: doc.getById('select-field').value,
    checkbox1: validateCheckbox(doc.getById('checkbox1').checked),
    checkbox2: validateCheckbox(doc.getById('checkbox2').checked),
    checkbox3: validateCheckbox(doc.getById('checkbox3').checked),
    radio: doc.getFirst('input[name="le-radio"]:checked').id
  }

  for (let i in myObj) {
    if (!myObj[i]) {
      delete myObj[i]
    }
  }

  log(JSON.stringify(myObj))
  localStorage.setItem('filterValues', JSON.stringify(myObj))
})

doc.getById('form').addEventListener('reset', function () {
  localStorage.removeItem('filterValues')
})
