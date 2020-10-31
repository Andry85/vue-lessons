var app = new Vue({
  el: '#app',
  data: {
    message: 'Привет, Vue!',
	seen: false,
	 todos: [
      { text: 'Изучить JavaScript' },
      { text: 'Изучить Vue' },
      { text: 'Создать что-нибудь классное' }
    ]
  }
});

console.log(app);
