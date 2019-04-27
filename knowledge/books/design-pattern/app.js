var publisher = {
    subscribers: {
        any: []
    },
    on (fn, type, context) {
        type = type || 'any';
        fn = typeof fn === "function" ? fn : context[fn];
        if (typeof this.subscribes[type] === "undefined") {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push({ fn: fn, context: context || this });
    },
    remove (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type, context);
    },
    fire(type, publication) {
        this.visitSubscribers('public', type, publication);
    },
    visitSubscribers(action, type, arg, context) {
        var pubtype = type || 'any',
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers ? subscribers.length : 0;
        for (i = 0; i < max; i++) {
            if (action === 'publish') {
                subscribers[i].fn.call(subscibers[i].context, arg);
            } else {
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
}
function makePublisher(o) {
    var i;
    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === "function") {
            o[i] = publisher[i];
        }
    }
    o.subscribers = { any: [] }
}