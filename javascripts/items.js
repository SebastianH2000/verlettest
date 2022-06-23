var items = {
    dirt: {

    }
}

var tileData = {
    dirt: {
        toughness: 10,
        type: 1,
        color: rgbToHex(200, 100, 50)
    },
    stone: {
        toughness: 30,
        type: 1,
        color: rgbToHex(100, 100, 120)
    },
    coal: {
        toughness: 25,
        type: 1,
        color: rgbToHex(10, 10, 10)
    },
    iron: {
        toughness: 50,
        type: 1,
        color: 'beige'
    },
    gold: {
        toughness: 50,
        type: 1,
        color: 'gold'
    },
    water: {
        toughness: 5,
        type: 2,
        color: rgbToHex(0, 0, 255)
    },
    grass: {
        toughness: 10,
        type: 1,
        color: 'green'
    }
}

function drawHotbar() {
    for (let i = 0; i < 9; i++) {
        if (player.inventory[i].material !== undefined && player.inventory[i].amount !== 0) {
            ctx.fillStyle = tileData[player.inventory[i].material].color;
            ctx.fillRect(0+((i-4)*60),260,60,60);
            ctx.fillStyle = 'white';
            ctx.font = "30px Arial";
            ctx.fillText(player.inventory[i].amount, -230+(i*60), 300);
        }
    }
    for (let i = -4; i < 5; i++) {
        ctx.beginPath();
        if (player.hotbarSelect === i+4) {
            ctx.strokeStyle = "white";
            ctx.fillStyle = 'white';
            ctx.globalAlpha = 0.25;
            ctx.fillRect(0+(i*60),260,60,60);
            ctx.globalAlpha = 1;
        }
        else {
            ctx.strokeStyle = "black";
        }
        ctx.rect(0+(i*60),260,60,60);
        ctx.stroke();
    }
}

function addItem (materialName,materialAmount) {
    let foundItem = false;
    let firstEmpty = 10;
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].material === materialName) {
            foundItem = true;
            player.inventory[i].amount += materialAmount;
        }
        else if (player.inventory[i].material === undefined) {
            console.log(firstEmpty)
            firstEmpty = Math.min(firstEmpty,i);
        }
    }
    if (!foundItem && firstEmpty < 10) {
        console.log('foundSimilar ' + firstEmpty)
        player.inventory[firstEmpty].material = materialName;
        player.inventory[firstEmpty].amount = materialAmount;
    }
}

function subItem (materialName,materialAmount) {
    for (let i = 0; i < player.inventory.length; i++) {
        if (player.inventory[i].material === materialName && (player.inventory[i].amount - materialAmount) > 0) {
            player.inventory[i].amount -= materialAmount;
        }
        else if (!(player.inventory[i].amount - materialAmount) > 0) {
            player.inventory[i] = {};
        }
    }
}