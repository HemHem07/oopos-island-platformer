namespace SpriteKind {
    export const MANJUICE = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.MANJUICE, function (sprite, otherSprite) {
    info.changeLifeBy(2)
    otherSprite.destroy()
    otherSprite.startEffect(effects.disintegrate)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (P1.isHittingTile(CollisionDirection.Bottom)) {
        P1.vy = -150
    }
    if (level == 3 || level == 4) {
        if (P1.isHittingTile(CollisionDirection.Left) || P1.isHittingTile(CollisionDirection.Right)) {
            P1.vy = -150
        }
    }
})
function StartLevel () {
    info.changeLifeBy(1)
    if (level == 1) {
        tiles.setTilemap(tilemap`level1`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level2`)
    } else if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level6`)
    } else if (level == 0) {
        tiles.setCurrentTilemap(tilemap`level8`)
    } else if (level == 4) {
        tiles.setCurrentTilemap(tilemap`level10`)
    } else {
        tiles.setCurrentTilemap(tilemap`level12`)
    }
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.destroy()
    }
    for (let value of sprites.allOfKind(SpriteKind.Food)) {
        value.destroy()
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        tiles.placeOnTile(P1, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        Captain_America_Shield = sprites.create(assets.image`myImage0`, SpriteKind.Projectile)
        tiles.placeOnTile(Captain_America_Shield, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        animation.runMovementAnimation(
        Captain_America_Shield,
        "c 0 -25 0 25 0 0",
        1000,
        true
        )
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        Coin = sprites.create(assets.image`myImage1`, SpriteKind.Food)
        tiles.placeOnTile(Coin, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        animation.runMovementAnimation(
        Coin,
        "c 0 -25 0 25 0 0",
        1000,
        true
        )
    }
    for (let value of tiles.getTilesByType(assets.tile`manjuice`)) {
        ManJuice = sprites.create(assets.image`myImage4`, SpriteKind.MANJUICE)
        tiles.placeOnTile(ManJuice, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        animation.runMovementAnimation(
        ManJuice,
        "c 0 -25 0 25 0 0",
        1000,
        true
        )
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    P1.setImage(assets.image`left`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    if (level == 1) {
        if (info.score() == 4) {
            level += 1
            StartLevel()
        }
    } else if (level == 2) {
        if (info.score() == 9) {
            level += 1
            StartLevel()
        }
    } else if (level == 0) {
        level += 1
        StartLevel()
    } else if (level == 3) {
        if (info.score() == 12) {
            level += 1
            StartLevel()
        }
    } else if (level == 4) {
        if (info.score() == 17) {
            level += 1
            StartLevel()
        }
    } else {
        if (info.score() == 20) {
            game.over(true)
        }
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    P1.setImage(assets.image`right`)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
    otherSprite.startEffect(effects.disintegrate)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
    otherSprite.startEffect(effects.disintegrate)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile11`, function (sprite, location) {
    Bee = sprites.create(assets.image`myImage2`, SpriteKind.Enemy)
    Bee.setFlag(SpriteFlag.GhostThroughWalls, true)
    tiles.setTileAt(location, assets.tile`transparency16`)
    Bee.setPosition(P1.x + randint(-80, 80), P1.y + randint(-80, -50))
    Bee.follow(P1, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite.y > otherSprite.y) {
        info.changeLifeBy(-1)
    }
    otherSprite.destroy()
    otherSprite.startEffect(effects.disintegrate)
})
let Bee: Sprite = null
let ManJuice: Sprite = null
let Coin: Sprite = null
let Captain_America_Shield: Sprite = null
let level = 0
let gravity = 0
let P1: Sprite = null
P1 = sprites.create(assets.image`right`, SpriteKind.Player)
P1.ay = gravity
controller.moveSprite(P1, 100, 0)
scene.cameraFollowSprite(P1)
info.setLife(1)
let dontworryaboutthisisglideronornot = 0
level = 0
StartLevel()
gravity = 300
scene.setBackgroundColor(9)
forever(function () {
    if (level == 1 || level == 4) {
        if (P1.y == 248) {
            game.over(false)
        }
    }
    if (level == 2 || level == 3 || level == 5) {
        if (P1.y == 792) {
            game.over(false)
        }
    }
    if (dontworryaboutthisisglideronornot == 1) {
        gravity = 100
    } else {
        gravity = 300
    }
    P1.ay = gravity
})
