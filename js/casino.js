
class SlotMachine {
  constructor (cash){
    this.money = cash;
    this.lucky = false;

  }
  getCash (){
    return this.money;
  }
  setCash (newCash){
    this.money = newCash;
  }
  addCash(number){
    if (number<0)
    {
      alert('Error');
    }else {
      return this.money += number;
    }
  }
  subCash(number){
    if(number>this.money)
    {
      alert('В автоматі немає такої суми!');
    }else {
      return this.money -= number;
    }
  }
  setLucky (lucky){
    this.lucky =lucky;
  }
  getLucky (){
    return this.lucky;
  }
  play (wager){
    if  (wager * 5 <this.money) {
      this.addCash(wager);
      let random1 = Math.floor((Math.random() * (10)));
      let random2 = Math.floor((Math.random() * (10)));
      let random3 = Math.floor((Math.random() * (10)));
      if (this.lucky || random1 === random2 === random3 === 7){
        random1=7;
        console.log('Your combination:',random1,random1,random1 );
        console.log ('Your prize:',this.getCash());
        this.setCash(0);
      }
      else if( random1 === random2 === random3){
        console.log('Your combination;',random3,random2,random1 );
        console.log ('Your prize:',wager*5);
        this.subCash(wager * 5);
      }
      else if(random1 === random2||random1 === random3||random3 === random2){
        console.log('Your combination;',random3,random2,random1 );
        console.log ('Your prize:',wager*2);
        this.subCash(wager * 2);
      }
      else{
        console.log('Your combination;',random3,random2,random1 );
        console.log('You lost,try again!');
      }
    }else {
      console.log('Make a smaller bet')
    }
  }
}
class Casino  {
  constructor (_numberSlotMachine,_cash){
    this.numberSlotMachine = _numberSlotMachine;
    this.cash = _cash;
    this.casino = [];
    let cashInSlot =(this.cash-(this.cash % this.numberSlotMachine))/this.numberSlotMachine ;
    this.cash = this.cash % this.numberSlotMachine;
    for(let j =0 ; j< this.numberSlotMachine ; j++) {
      this.casino[j] = new SlotMachine(cashInSlot);
    }
    this.casino[0].addCash(this.cash);
    this.casino[ Math.floor((Math.random() * (this.numberSlotMachine )))].setLucky(true);
    this.cash = 0;
  }
  getCash (){ return this.cash;}
  getnumberSlotMachine(){return this.numberSlotMachine;}
  createSlotMachine (){
    let maxCashInSlotMachine =this.casino[0].getCash();
    let numberSlotMachinWhithMaxCash=0;
    for (let i=1 ;i<this.casino.length ; i++){
      if (maxCashInSlotMachine<this.casino[i].getCash())  {
        maxCashInSlotMachine = this.casino[i].getCash();
        numberSlotMachinWhithMaxCash = i;
      }
    }
    this.casino[this.casino.length] = new SlotMachine(((maxCashInSlotMachine + maxCashInSlotMachine % 2)/2))
    this.casino[numberSlotMachinWhithMaxCash].subCash((maxCashInSlotMachine + maxCashInSlotMachine % 2)/2);
    this.numberSlotMachine++;
  }
  getSumAllCash () {
    let SumAllCash=0;
    for (let i = 0; i < this.casino.length; i++) {
      SumAllCash += this.casino[i].getCash();
    }
    return SumAllCash;
  }
  deleteSlotMachine(numberSlotMachine){
      numberSlotMachine--;
    if (numberSlotMachine<this.casino.length && numberSlotMachine >= 0) {
      let cashDeletSlotMachine = this.casino[numberSlotMachine].getCash();

      for (var j = numberSlotMachine; j < this.casino.length - 1; j++) {
        this.casino[j].setLucky(this.casino[j + 1].getLucky());
        this.casino[j].setCash(this.casino[j + 1].getCash());
      }
      this.casino.pop();
      this.numberSlotMachine--;
      let cashInSlot =(cashDeletSlotMachine -(cashDeletSlotMachine % this.numberSlotMachine))/this.numberSlotMachine ;
      cashDeletSlotMachine = cashDeletSlotMachine % this.numberSlotMachine;
      for(let j =0 ; j< this.casino.length ; j++) {
        this.casino[j].addCash(cashInSlot);
      }
      this.casino[0].addCash(cashDeletSlotMachine);

    } else {
      alert (numberSlotMachine +1 +' Автомат  не знайдено!');
    }

  }
  takeMoney (numberMoney) {
    if (numberMoney<this.getSumAllCash()&& numberMoney > 0) {
      console.log('Ви забрали з казино ',numberMoney ,'$');
      let exit=true;
      while (exit) {
        let maxCashInSlotMachine =this.casino[0].getCash();
        let numberSlotMachinWhithMaxCash=0;
        for (let i=1 ;i<this.casino.length ; i++){
          if (maxCashInSlotMachine<this.casino[i].getCash())  {
            maxCashInSlotMachine = this.casino[i].getCash();
            numberSlotMachinWhithMaxCash = i;
          }
        }
        if (numberMoney <= this.casino[numberSlotMachinWhithMaxCash].getCash()){
          this.casino[numberSlotMachinWhithMaxCash].subCash(numberMoney);
          console.log(this.casino[numberSlotMachinWhithMaxCash].getCash());
          numberMoney = 0;
        }
        else{
          numberMoney-=this.casino[numberSlotMachinWhithMaxCash].getCash();
          this.casino[numberSlotMachinWhithMaxCash].setCash(0);
        }
        if (numberMoney === 0){
          exit= false;
        }
      }
    }
    else {
      console.log('Недостатньо коштів в казино!');
    }
  }
}

var goga = new Casino(5,7259);
function statusCasino(){
console.log("Казино має ",goga.getnumberSlotMachine(),' ігрових автоматів.' );
console.log("Загальна сума грошей в казино становить:",goga.getSumAllCash(), '$');
for(var i = 0 ;i<goga.getnumberSlotMachine();i++)
{
  console.log('Ігровий автомат №',i+1,'містить грошей:',  goga.casino[i].getCash(), "$");
}
}
statusCasino();
console.log("Добавимо новий автомат.");
goga.createSlotMachine();
statusCasino();
console.log("Видалимо автомат №3 новий автомат.");
goga.deleteSlotMachine(3);
statusCasino();
console.log("Спробуэмо видалити автомат під  №8 новий автомат.");
goga.deleteSlotMachine(8);
statusCasino();
console.log("Заберем з казино 2000 $");
goga.takeMoney(2000);
statusCasino();
console.log("Сробуэмо забрати з казино 1 000 000 $");
goga.takeMoney(1000000);
console.log("Заберем з автомата №1 300 $");
goga.casino[0].subCash(300);
statusCasino();
console.log("Заберем з автомата №1 3 000 $");
goga.casino[0].subCash(3000);
statusCasino();

console.log("Добавимо в автомата №2 5 000 $");
goga.casino[1].addCash(5000);
statusCasino();
console.log("Зіграємо на автомата №2 зі ставкою 400 $");
goga.casino[1].play(400);
statusCasino();


// console.log(goga.getnumberSlotMachine());
// console.log(goga.getSumAllCash());
//goga.takeMoney(10);
//goga.casino[0].play(5);
console.log(goga );
