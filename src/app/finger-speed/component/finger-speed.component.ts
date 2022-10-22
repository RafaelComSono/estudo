import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import 'jquery';

@Component({
  selector: 'app-finger-speed',
  templateUrl: './finger-speed.component.html',
  styleUrls: ['./finger-speed.component.sass']
})
export class FingerSpeedComponent implements OnInit {
  poiting: number = 0
  actualPoiting: number = 0;
  randomWord: string = faker.animal.insect();
  inputValue: string = ''!;
  timerOver: boolean = false;
  interval: NodeJS.Timer = null!;
  timeLeft: number = 5;
  startTimeLeft: number = 5;
  cantWrite: boolean = true;
  gameStarted: boolean = false;
  introductionText: string = 'Clique no botão de Play para jogar!'

  constructor() { }

  ngOnInit(): void {
    this.getPontuacao();
  }

  getPontuacao(): void {
    this.poiting = localStorage['pontuação'] ? localStorage['pontuação'] : 0;
  }

  start(){
    this.gameStarted = true;
   let startInterval = setInterval(() => {
      if(this.startTimeLeft > 0) {
        this.introductionText = 'Vai começar em: ' + this.startTimeLeft;
        this.startTimeLeft--;
      } else {
        this.startTimeLeft = 0;
        this.introductionText = 'VAI!!'
        this.pauseTimer(startInterval)
        this.startTimer();
      }
    },1000)
  }

  checkText(): void {
    if (this.inputValue == this.randomWord) {
      this.randomWord = faker.animal.insect();
      this.inputValue = '';
      this.actualPoiting = +this.actualPoiting + 10;
      this.timeLeft = 5;
      if (this.actualPoiting > localStorage['pontuação']) {
        localStorage['pontuação'] = this.actualPoiting;
        this.poiting = this.actualPoiting;
      }
    }
  }

  gameOver(){
    this.timeLeft = 0;
    this.timerOver = true;
    this.inputValue = '';
    this.cantWrite = true;
    this.introductionText = 'Tempo esgotado! Clique no play para começar novamente'
    this.gameStarted = false;
    this.pauseTimer(this.interval)
    this.timeLeft = 5;
    this.startTimeLeft = 5;
    this.actualPoiting = 0;
  }

  startTimer() {
    this.cantWrite = false;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.gameOver();
      }
    },1000)
  }

  pauseTimer(interval: NodeJS.Timer) {
    clearInterval(interval);
  }
}
