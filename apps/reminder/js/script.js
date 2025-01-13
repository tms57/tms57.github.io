let items = [] // holds data for todos, reminders, & notes

let addForm = document.querySelector('.addForm')

let addBtn = document.querySelector('.addBtn')
addBtn.addEventListener('click', () => {
  addBtn.style.display = 'none' // hide addBtn while entering new todo
  addForm.style.display = 'block' // show addForm
})

let addTodo = document.getElementById('addTodo')
addTodo.addEventListener('click', (e) => {
  e.preventDefault()

  /* temp itemObj
  itemObj = {
    type: (T, R, N),
    createDate: using Date function,
    dueDate: (optional - uses HTML tag input),
    description: from HTML input,
  }
*/
  let itemObj = {}

  let todoDesc = document.getElementById('desc').value

  if (todoDesc !== '') {
    itemObj.type = 'T'
    itemObj.createDate = Date.now()
    itemObj.description = todoDesc
    itemObj.dueDate = document.getElementById('todoDate').value
    // createTodoItem(todoDesc, itemObj.createDate)
    items.push(itemObj)
    updateLocalStorage()
    console.log(items)

    addForm.style.display = 'none' // hide addForm
    addForm.reset() // clear fields

    addBtn.style.display = 'block' // show addBtn again
  }
})

// Function to create a new todo item
function createTodoItem(desc, createDate) {
  // Create the main todo div
  const todoDiv = document.createElement('div')
  todoDiv.className = 'todo'

  // Create the type div
  const typeDiv = document.createElement('div')
  typeDiv.className = 'type'
  typeDiv.textContent = 'T'

  // Create the description div
  const descDiv = document.createElement('div')
  descDiv.className = 'desc'
  descDiv.textContent = desc

  // Create the actions div
  const actionsDiv = document.createElement('div')
  actionsDiv.className = 'actions'

  // Create the delete button
  const deleteButton = document.createElement('button')
  deleteButton.className = 'action delete'
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>'

  // use createdDate in attribute as key to items array
  deleteButton.dataset.createDate = createDate
  deleteButton.addEventListener('click', () => {
    deleteItem(deleteButton.dataset.createDate)
    todoDiv.remove() // deletes actionListener for this item
    updateLocalStorage()
  })

  // Create the edit button
  // const editButton = document.createElement('button')
  // editButton.className = 'action edit'
  // editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
  // editButton.addEventListener('click', () => {
  //   // Edit button action
  //   console.log('Edit:', descDiv.textContent)
  // })

  // Append buttons to actions div
  actionsDiv.appendChild(deleteButton)
  // actionsDiv.appendChild(editButton)

  // Append all elements to the main todo div
  todoDiv.appendChild(typeDiv)
  todoDiv.appendChild(descDiv)
  todoDiv.appendChild(actionsDiv)

  // Append the main todo div to the container
  document.querySelector('.todos-container').appendChild(todoDiv)
}

function deleteItem(createDate) {
  // dataCreated is used as an id for todos in items array
  items = items.filter((item) => item.createDate != createDate)
}

function init() {
  console.log('Initializing app...')
  items = JSON.parse(localStorage.getItem('reminderApp')) || []
  console.log('Fetched items from localStorage:', items)

  if (items) {
    updateLocalStorage()
  } else {
    window.localStorage.setItem('reminderApp', JSON.stringify({}))
    console.log('Set initial empty reminderApp in localStorage')
  }
  // if (items) {
  //   try {
  //     items = JSON.parse(items)
  //     console.log('Parsed items:', items)
  //   } catch (e) {
  //     console.error('Error parsing JSON:', e)
  //     items = []
  //   }
  // } else {
  //   items = []
  //   console.log(
  //     'No items found in localStorage, initializing with empty array.'
  //   )
}

function updateLocalStorage() {
  console.log('Updating localStorage with current items:', items)
  document.querySelector('.todos-container').innerHTML = ''
  items.forEach((item) => {
    createTodoItem(item.description, item.createDate)
  })
  localStorage.setItem('reminderApp', JSON.stringify(items))
  console.log('Updated localStorage:', localStorage.getItem('reminderApp'))
}

init()
