#! /usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
 

class spaceship {
    name: string;
    health: number;
    fuel: number;
    bodystrenght: number;
    constructor(
      name: string,
      health: number,
      fuel: number,
      bodystrenght: number,
    ) {
      this.name = name;
      this.health = health;
      this.fuel = fuel;
      this.bodystrenght = bodystrenght;
    }
    
    statOnLand(){
        this.fuel -= 50
        this.health -= 20
        this.bodystrenght -= 10 
      }
    showstatus() {
        console.log(chalk.blue(
          `\n\nSHIP STATUS
    Name: ${this.name}
    Health:${this.health}
    Fuel:${this.fuel}
    Body Strength:${this.bodystrenght}`
        ));
        console.log(chalk.greenBright.bold(`\n__________________________________________________________________`))
      }
    RapairShip(ans: number){
        if(ans <= 0){
            console.log(`\nU Need To Found Some Resource To Repair The Ship\n`);
            
        }else {
            console.log(`
            ${this.name} Is Repaired SuccessfUlly
    Health: ${this.health = 100}
    Fuel: ${this.fuel = 100}
    Body: ${this.bodystrenght = 100}    `);
            
        }
    }
    
}

class Player{
    name: string;
    spaceship: spaceship;
    resources: number
    constructor(name: string){
        this.name = name;
        this.spaceship = new spaceship("CosmoJet", 100, 100, 100)
        this.resources = 0
    }
}

class Spaceadventuregame {
    player: Player;
    currentplanet: string
    constructor(playername: string) {
        this.player = new Player(playername)
        this.currentplanet = "Earth"
    }

    private planetQuestion (){
        inquirer.prompt([
            {
                name: "planet", type: "list", message: "What would you like Todo?", 
                choices: ["Explore", "Ship Status", "Repair Ship","Back T0 Earth", "Exist"]
            }
            ]).then(ans => {
            if (ans.planet === "Explore") {
                 
                let resource = this.player.resources += 1
            if(resource > 5){
                console.log("\nReSourse Did not FOund  !!!");
                console.log('Pls Check Your Resources U cant Hold More Than #5 !!!\n');
            }else if(resource <= 5){
                console.log(`\nCongratulation ${this.player.name} ! U Found 1 Item !`);
                console.log(`Your Resources: ${resource}\n`);
            }
                this.planetQuestion()     
            }
             else if(ans.planet === "Ship Status"){
                this.player.spaceship.showstatus()
                this.planetQuestion()
            }else if(ans.planet === "Repair Ship"){
                this.player.spaceship 
            if(this.player.resources < 2){
                console.log(chalk.red(`\nU need To Found Atleast 2 Resources For Repair The ship\n`));
                this.planetQuestion()
            }else{
                this.player.spaceship.RapairShip(this.player.resources)
                this.player.resources -= 2
                this.planetQuestion()
            }
            }else if(ans.planet === "Back T0 Earth"){

                let fuel = this.player.spaceship.fuel 
                if(fuel <= 0){
                  console.log(`U Dont Have Enough Fuel To Go Back To Earth \nPls Use your Resources To Refuel Ship By Using ${'Repair Ship'} Option`)
                  this.planetQuestion()
                }else{
      
                  console.log(chalk.yellow(`\n\tSucessfull Land on Earth\n`))
                  console.log(chalk.greenBright.bold(`\n__________________________________________________________________`))
                  this.player.spaceship.statOnLand()
                  this.DisplayLocation()
                }
      
              }else if(ans.planet === "Exist"){
                console.log(chalk.greenBright.bold(`\n__________________________________________________________________`))
                console.log( `\n\tThank You For Playing `)
                console.log(chalk.greenBright.bold(`\n__________________________________________________________________`))
              }else{
                console.log('Error')
                console.log(ans)
              }

        })

    } 


 async DisplayLocation(){
        let locInput = await inquirer.prompt([{
            name: "location", type: "list", message: "Select a location",
            choices: ["Moon", "Jupiter", "Mars", "Repair Ship"]
        }])
        let location = locInput.location
     if(location == "Moon"){
            this.currentplanet = "Moon"
            let fuel = this.player.spaceship.fuel
        if (fuel <= 0) {
            console.log(`U Dont Have Enough Fuel To Go Back To Earth \nPls Use your Resources To Refuel Ship By Using ${chalk.bold.bgCyan('Repair Ship')} Option`)
            this.DisplayLocation()
        } else {
            console.log(`\nSuccesfully Landed On ${chalk.greenBright(this.currentplanet)} \nExplore to Found some Resoure`)
            this.player.spaceship.statOnLand()
            this.planetQuestion()
        }
    } else if(location === "Jupiter"){
            this.currentplanet = "Jupiter"
            let fuel = this.player.spaceship.fuel
        if(fuel <= 0){
            console.log(`U Dont Have Enough Fuel To Go Back To Earth \nPls Use your Resources To Refuel Ship By Using ${chalk.bold.bgCyan('Repair Ship')} Option`)
            this.DisplayLocation()
        } else {
            console.log(`\nSuccesfully Landed On ${chalk.greenBright(this.currentplanet)} \nExplore to Found some Resoure`)
            this.player.spaceship.statOnLand()
            this.planetQuestion()
        }
    } else if(location === "Mars"){
            this.currentplanet = "Mars"
            let fuel = this.player.spaceship.fuel
        if(fuel <= 0){
            console.log(`U Dont Have Enough Fuel To Go Back To Earth \nPls Use your Resources To Refuel Ship By Using ${chalk.bold.bgCyan('Repair Ship')} Option`)
            this.DisplayLocation()
        } else {
            console.log(`\nSuccesfully Landed On ${chalk.greenBright(this.currentplanet)} \nExplore to Found some Resoure`)
            this.player.spaceship.statOnLand()
            this.planetQuestion()
        }

    } else if(location === "Repair Ship"){
        this.player.spaceship.RapairShip(this.player.resources)
        this.DisplayLocation()
    }
              
    }
    

    Startgame(){
        console.log(`Welcome ${this.player.name} To Space Exploration Adventure Game`);
        this.DisplayLocation()
    }
}


let username = await inquirer.prompt([{
    name: "input", type: "input", message: "Enter your name :"

}])

let game = new Spaceadventuregame(username.input)
console.log("Current Location is on Earth!!");
game.Startgame()
