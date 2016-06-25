Events = new Mongo.Collection('events');

Events.attachSchema(new SimpleSchema({
    'title': {
        type: String,
        label: '이벤트'
    },
    'summary': {
        type: String,
        label: '행사개요'
    },
    'start': {
        type: String,
        label: '시작일'
    },
    'end': {
        type: String,
        label: '종료일'
    }
}))
