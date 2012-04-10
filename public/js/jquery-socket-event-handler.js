(function($) {

    
    var methods = {
        init : function(options) {
            options = $.extend({host:'http://localhost/'},options)
            this.data('socketOptions',options)
            this.data('sockets', {})
            return this;
        },

        //params = ns, event, data
        _trigger : function(params) {
            var sockets = this.data('sockets') || {}
            var options = this.data('socketOptions');
            var self=this;
            if (!sockets[params.ns]) {
                sockets[params.ns] = io.connect(options.host + params.ns)
                sockets[params.ns].on('eventMsg', function(obj) {
                    if(typeof obj == 'string'){
                        obj=JSON.parse(obj);
                    }
                    if(typeof obj.data=='string'){
                        obj.data=JSON.parse(obj.data);
                    }

                    if ('event' in obj) {
                        $(self).trigger(obj.event, obj.data);
                    }
                })
                this.data('sockets', sockets)
            }
            sockets[params.ns].emit(params.event, params.data)
            return this
        },
        getSocket :function(ns) {
            var sockets = $(this).data('sockets') || {}
            return sockets[ns]
        }

    }


    $.fn.socketEventHandler = function(method) {
        if (methods[method]) {
            return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.socket-event-handler');
        }
    }


})(jQuery);