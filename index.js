    if (localStorage.getItem('game') == null) {
    makeGame()
    } else {
    runGame()
    }

    function makeGame() {
    var obj = {
        'gen': {
            'fuel': 100,
            'level': 1
        },
        'fridge': {
            'contents': {
                'mc': 5
            },
            'level': 1
        },
        'oven': {
            'level': 1
        },
        'bank': {
            'level': 1,
            'money': 0
        }
    }
    localStorage.setItem('game', JSON.stringify(obj))
    location.reload()
    }


    function runGame() {
    var game = JSON.parse(localStorage.getItem('game'))
    var foodKey = {
        'mc': 'mac and cheese'
    }
    var p = document.createElement('p')
    console.log(Object.keys(game.fridge.contents).length)
    var list = []
    var lString = ''
    for (var i = 0; i < Object.keys(game.fridge.contents).length; i++) {
        var obk = Object.keys(game.fridge.contents)[i]
        var obj = {}
        obj[obk] = Object.values(game.fridge.contents)[i]
        list.push(obj)
    }
    for (var i = 0; i < list.length; i++) {
        if (list.length == 0) {break}
        lString += `${foodKey[String(Object.keys(list[i]))]}: ${Object.values(list[i])[i]} `
    }
    if (lString == '') {lString = 'Nothing!'}
    console.log(list, lString)
    p.innerText = `
    Generator: ${game.gen.fuel}
    Fridge: ${lString}
    `
    document.body.append(p)
    drawButtons()
}

function drawButtons() {
    var refuel = document.createElement('button')
    var bank = document.createElement('button')
    var eat = document.createElement('button')
    refuel.innerText = 'refuel'
    bank.innerText = 'bank'
    eat.innerText = 'eat'
    try {
        refuel.addEventListener('click', function() {btnHandler('refuel')})        
        bank.addEventListener('click', function() {btnHandler('bank')})        
        eat.addEventListener('click', function() {btnHandler('eat')})        
    } catch (error) {
        location.reload()
    }
    document.body.append(refuel, bank, eat)
}

function btnHandler(btn) {
    switch (btn) {
        case 'refuel': {

            break
        }
        case 'bank': {
            
            break
        }
        case 'eat': {
            
            break
        }
    }
}