function fullFormatDate(date = new Date()){
    return date.toLocaleString('default', {
        weekday:'long',
        day:'numeric',
        month:'short',
        year:'numeric',
        hour:'numeric',
        minute:'2-digit',
        hour12:true
    })
}

function regularFormatDateTime(date= new Date()){
     return date.toLocaleString('default', {
        day:'numeric',
        month:'short',
        year:'numeric',
        hour:'numeric',
        minute:'2-digit',
        hour12:true
    })
}

function regularFormatDate(date= new Date()){
     return date.toLocaleString('default', {
        day:'numeric',
        month:'short',
        year:'numeric'
        
    })
}

function monthFormatDate(dates ){
 const date = new Date(dates)
     return date.toLocaleString('default', {  
        month:'short',
        year:'numeric'
    })
}

module.exports = {fullFormatDate, regularFormatDate, regularFormatDateTime, monthFormatDate}