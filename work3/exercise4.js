const TicketSystem = function () {
    const events = new Map();  // [event, price]
    const tickets = new Map(); // [ticketId, event]
    let cashbox = 0;

    this.createEvent = function (event, price) {
        events.set(event, price);
    };

    this.buyTicket = function (event) {
        if (events.has(event)) {
            const newTicketId = Math.round(100000 + Math.random() * 99999).toString();
            tickets.set(newTicketId, event);
            const price = events.get(event);  
            cashbox = cashbox + price;
            return newTicketId;
        }
        return 'No such event';
    };
    
    this.returnTicket = function (returnedTicket) {
        if (tickets.has(returnedTicket)) {
            const event = tickets.get(returnedTicket);
            const price = events.get(event);
            cashbox = cashbox - price;
            tickets.delete(returnedTicket);
            return `returned ${price}`;
        }
        return 'No such ticket.';
    };
};

const ticketWindow = new TicketSystem();
ticketWindow.createEvent('concert', 100);
ticketWindow.createEvent('bar', 200);

ticketWindow.buyTicket('bar');
