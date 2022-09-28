import { getObstacleEvents } from './computer-vision';
//Question 3
interface AutonomousCar {
  isRunning?: boolean;
  respond: (events: Events) => void;
}

interface AutonomousCarProps {
  isRunning?: boolean;
  steeringControl: Steering; 
  }
  interface Events {
    [events: string]: boolean;
  }
   interface Control{
     execute: (command: string) => void;
   }
   interface Steering {
     turn:(direction: string) => void;
    }
class SteeringControl implements Steering {
  execute(command:string){
    console.log(`Executing: ${command}`)
  }
  turn(direction: string) {
    this.execute(`Turn ${direction}`)

  }
}
class Car implements AutonomousCar {
  isRunning;
  steeringControl;
  constructor(props: AutonomousCarProps){
    this.isRunning = props.isRunning;
    this.steeringControl = props.steeringControl;
  }
 respond(events: Events){
   if(!this.isRunning){
     return console.log('the car is off')
   }
   Object.keys(events).forEach(eventKey => {

     if(events[eventKey]) {
       return;
     }
     if(eventKey === 'ObstacleRight'){
       this.steeringControl.turn('right');
     }
     if(eventKey === 'ObstacleLeft'){
       this.steeringControl.turn('Left');
     }

   })
 }
}
const steering = new SteeringControl();
const autonomousCar = new Car({isRunning: true, steeringControl: steering});

autonomousCar.respond(getObstacleEvents());
steering.turn(`right`);
console.log(autonomousCar.isRunning);
