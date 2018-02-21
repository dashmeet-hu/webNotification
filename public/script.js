var sambha = document.createElement('script');
sambha.id = 'sambha';
sambha.src = 'https://f894800e.ngrok.io/gabbar/js/sambha.js';
sambha.async = false;
var sb = document.getElementsByTagName('script')[0];
sb.parentNode.insertBefore(sambha, sb);
window.GabbarQueue = [], "undefined" == typeof Gabbar && (window.Gabbar = {
    recognize: function(a) {
        GabbarQueue.push({
            _action: "recognize",
            _args: {
                id: a
            }
        })
    },
    track: function(a, e, r, c) {
        GabbarQueue.push({
            _action: "track",
            _args: {
                eventToTrack: a,
                params: e,
                callback: r,
                associateEarlierAnonEvents: c
            }
        })
    },
    register: function(a, e, r) {
        GabbarQueue.push({
            _action: "register",
            _args: {
                customer: a,
                id: e,
                callback: r
            }
        })
    },
    login: function(a, e, r) {
        GabbarQueue.push({
            _action: "login",
            _args: {
                customer: a,
                id: e,
                callback: r
            }
        })
    },
    captureLead: function(a, e) {
        GabbarQueue.push({
            _action: "captureLead",
            _args: {
                lead: a,
                callback: e
            }
        })
    },
	onLoad: function(a) {
		GabbarQueue.push({
			_action: "onLoad",
			_args: {
				callback: a
			}
		})
	}
});
