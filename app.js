const limit = 20;

const socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');

socket.onopen = function () {
	console.log('Connection established.');
};

socket.onclose = function (event) {
	if (event.wasClean) {
		console.log('Connection closed.');
	} else {
		console.log('Connection lost.');
	}
	console.log('Code: ' + event.code + ' reason: ' + event.reason);
};

socket.onmessage = function (event) {
	const data = JSON.parse(event.data)
	table.add = {
		id: data.t,
		time: new Date(data.E).toUTCString(),
		price: data.p,
		quantity: data.q,
		type: data.m ? 'MM' : 'Not MM'
	};
};

socket.onerror = function (error) {
	console.log('Error: ' + error.message);
};

const table = {
	data: [],
	set add(obj) {
		if (this.data.length >= limit) {
			this.data.pop();
		}

		this.data.unshift(obj);
		document.getElementById('table').innerHTML = this.data.map(item => '<tr><td>' + item.id + '</td><td>' + item.time + '</td><td>' + item.price + '</td><td>' + item.quantity + '</td><td>' + item.type + '</td></tr>').reduce((a, b) => a + b, '');
	}
};
