// start: house: {
//     generator (100 uses)
//     fridge
//     oven
//     sink
//     bed
//     }
//     generator needs gas
//     you start with one hundred money
//     electricity/water bill every 10 turns
//     can upgrade appliances for the cost of more utilites
//     upgrading utilites costs money
    
//     apartment: {
//     cost: 20k
//     you are the owner
//     same things as the house (x30)
//     set prices to get maxium pay out
//     }
    
//     goal: get 100000 dollars
    
//     cookies: {
//      game: {
      
//      }
//     }

var stage = 1
if (localStorage.getItem('game')==null) {
    localStorage.setItem('game', '1')
    stage = 1
} else {

}
if (localStorage.getItem('estate')==null) {
    stage = 1
    var obj = {
        'money': 500,
        'house': {
            'gen': {
                'level': 1,
                'fuel': 100
            },
            'fridge': {
                'storage': ["Nothing!"],
                'level': 1
            },
            'oven': {
                'storage': ["Nothing!"],
                'level': 1
            },
            'sink': {
                'level': 1
            },
            'bed': {
                'level': 1
            }
        }
    }
    var strObj = JSON.stringify(obj)
    localStorage.setItem('estate', String(strObj))
    location.reload()
} else {

}

var msgs = [
    "Welcome! Please select one of the options!"
]

var h1 = document.createElement('h1')
var body = document.getElementsByClassName('body')[0]
var infoP = document.createElement('p')


if (stage==1) {
    h1.innerText = msgs[0]
    body.append(h1)
}

var infoJ = JSON.parse(localStorage.getItem('estate'))

var info = `
Money: ${infoJ.money}
House: 
Generator: {
    Level: ${infoJ.house.gen.level}
    Fuel: ${infoJ.house.gen.fuel}
}
Fridge: {
    Level: ${infoJ.house.fridge.level}
    Storage: ${infoJ.house.fridge.storage}
}
Oven: {
    Level: ${infoJ.house.oven.level}
    Storage: ${infoJ.house.oven.storage}
}
Sink: {
    Level: ${infoJ.house.sink.level}
}
Bed: {
    Level: ${infoJ.house.bed.level}
}
`


var btns = ["Fuel Generator", "Level an appliance", "Check Fridge/Eat", "Cook Food", "Bank", "Clean Hands", "Sleep", "Wash Hands", "End Turn"]
var btnI = ["FG", "LU", "EF", "CF", "BA", "CH", "SL", "WH", "ET"]

    body.innerHTML = ''
    infoP.innerText = info
    infoP.style.fontWeight = 'bold'
    body.append(document.createElement('br'))
    body.append(document.createElement('br'))
    body.append(infoP)

    for (var i = 0; i < btns.length; i++) {
        var btn = document.createElement('button')
        btn.id = btnI[i]
        btn.name = 'Button'
        btn.innerText = btns[i]
        body.append(btn)
    }    

document.getElementById('FG').addEventListener('click', e => {
    body.innerHTML = ''
    var afuel = infoJ.house.gen.fuel
    var fP = document.createElement('p')
    fP.innerText = afuel
    body.append(fP)
    var refill = document.createElement('button')
    var back = document.createElement('button')
    back.innerText = 'Back'
    refill.innerText = `Refill (${100 - afuel})`
    refill.addEventListener('click', e => {
        console.log('r', (100 - afuel))
        infoJ.money -= (100 - afuel)
        var newObjJ = infoJ
        newObjJ.house.gen.fuel = 100
        localStorage.setItem('estate', JSON.stringify(newObjJ))
        location.reload()
    })
    back.addEventListener('click', e => {
        console.log('b')
        setHome()
    })
    body.append(refill)
    body.append(back)
})

var costs = {
    'gen': 5,
    'fridge': 2.5,
    'oven': 2.5,
    'sink': 1.25,
    'bed': 1.10
}

var maxLvls = {
    'gen': 20,
    'fridge': 25,
    'oven': 20,
    'sink': 10,
    'bed': 5
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}  

document.getElementById('LU').addEventListener('click', e => {
    body.innerHTML = '<h1> Which Appliance do you wish to upgrade?</h1>'
    var btns = ["Generator", "Fridge", "Oven", "Sink", "Bed"]
    var btnsC = ["gen", "fridge", "oven", "sink", "bed"]
    for (var i = 0; i < btns.length; i++) {
        var btn = document.createElement('button')
        btn.innerText = btns[i]
        btn.id = btnsC[i]
        body.append(btn)
    }
    
    for (var i = 0; i < btnsC.length; i++) {
        document.getElementById(btnsC[i]).addEventListener('click', e => {
            if (infoJ.house[e.target.id].level >= maxLvls[e.target.id]) {
                body.innerHTML = `<h1>You cannot level ${btns[btnsC.indexOf(e.target.id)]}!</h1>`
                sleep(2000).then(() => {location.reload()});
            }
            var cost = 100 * infoJ.house[e.target.id].level * costs[e.target.id]
            body.innerHTML = `<h1>Cost: ${cost}<h1>`
            var pay = document.createElement('button')
            var back = document.createElement('button')
            pay.innerText = 'Pay'
            back.innerText = 'Back'
            if (cost > infoJ.money) {
                body.innerHTML = `<h1>You don't have enough money to upgrade ${btns[btnsC.indexOf(e.target.id)]}`
                pay.disabled = true
            }
            back.addEventListener('click', f => {
                location.reload() 
            })
            pay.addEventListener('click', f => {
                var newOBJ = infoJ
                newOBJ.money -= cost
                newOBJ.house[e.target.id].level++
                localStorage.setItem('estate', JSON.stringify(newOBJ))
                location.reload() 
            })
            body.append(back)
            body.append(pay)
        })
    }
})