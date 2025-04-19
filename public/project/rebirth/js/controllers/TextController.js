export default class TextController {
    constructor() {
        this.x = width / 4;
        this.y = height / 11;
        this.text = [
            "{ µ›ÄŸ ÿrýã®: DåÏ<®?þ þøã ŸcÿÜ ®Ï y¾ÿnôµ\n\n\t => þøKøãŒí } \n\nText file cannot be read, \nRobobo => Repair recommended \nA station should be nearby!",
            "{ L›Äd ÿrýãr: Dåst®oþ þøl ŸifÜ ®n ylÿnet\n\n\t => þxeøãtí } \n\nText file cannot be read, \nRobobo => Repair recommended \nThe next station is nearby!",
            "{ LoÄd Orýãr: Dåstroy þll Ÿife ®n plÿnet\n\n\t => Execøtí } \n\nText file cannot be read, \nRobobo => Repair recommended \nGood work get yourself a Cookie! :)",
            "{ Load Order:  Destroy all life on planet\n\n\t => Execute } \n\nT.Hanks for playing!",
            "{ Fun Fact 1:\n Nuclear annihilation i inspirational. \nThat's why it's nuclear annihilation. }",
            "{ Inspirational Quote:\n Somebody should feel stupid.\n Why not you? }",
            "{ Info:\n Intelligent Machines\n they're there to sacrifice you! }",
            "{ Please consider:\n Darkness.\n It's out there. }",
        ]
    }

    displayText(i) {
        if(i < 0 || i >= this.text.length) return
        if(i == 4) // play deathSignal
        var txt = this.text[i]
        var boxW = 420
        var boxH = this.text[i].length + 10
        let corner = 25;

        strokeWeight(5)
        stroke("#09e0c5")
        fill("rgba(11, 59, 203, 0.65)")
        //rect(this.x, this.y, boxW, boxH, 25, 12, 25, 12)

        beginShape();
            vertex(this.x, this.y+corner/1.5);
            vertex(this.x+corner, this.y);
            vertex(this.x+boxW-corner, this.y);
            vertex(this.x+boxW, this.y+corner/1.5);
            vertex(this.x+boxW, this.y+boxH-corner/1.5);
            vertex(this.x+boxW-corner, this.y+boxH);
            vertex(this.x+corner, this.y+boxH);
            vertex(this.x, this.y+boxH-corner/1.5);
            vertex(this.x, this.y+corner/1.5);
            vertex(this.x+corner, this.y);
        endShape(CLOSE);

        
        fill("#ddffff")
        noStroke();
        textSize(14)
        text(this.text[i],
            this.x + 25, this.y + 15,
            boxW - abs, boxH - abs)
        
    }

}

/*
    import TextController from '/js/controllers/TextController.js'

    let textController
    
    textController = new TextController();

    textController.displayText(0);
*/
