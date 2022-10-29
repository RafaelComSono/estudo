import { Component, OnInit } from '@angular/core';
import { faker } from '@faker-js/faker';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-finger-speed',
  templateUrl: './finger-speed.component.html',
  styleUrls: ['./finger-speed.component.sass']
})
export class FingerSpeedComponent implements OnInit {
  poiting: number = 0
  actualPoiting: number = 0;
  randomWord: string = this.getRandomWords();
  inputValue: string = '';
  timerOver: boolean = false;
  interval: NodeJS.Timer = null!;
  timeLeft: number = 10;
  startTimeLeft: number = 5;
  cantWrite: boolean = true;
  gameStarted: boolean = false;
  introductionText: string = 'Clique no botão de Play para jogar!';
  record: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getPoints();
  }

  getPoints(): void {
    let hasLocalStorage = localStorage.getItem('pontuação') !== null;
    localStorage['pontuação'] = hasLocalStorage ? localStorage['pontuação'] : 0;
    this.record = hasLocalStorage ? localStorage['pontuação'] : this.record;
    this.poiting = localStorage['pontuação'] ? localStorage['pontuação'] : 0;
  }

  getRandomWords(): string{
    let randomWordList = [ 
      faker.name.fullName(), faker.animal.insect(), faker.address.cityName(), faker.company.name(),
      faker.animal.cat(), faker.animal.fish(), faker.name.jobArea(), faker.music.songName(), faker.hacker.verb()
    ]
    return randomWordList.sort()[0];
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
      this.randomWord = this.getRandomWords();
      this.inputValue = '';
      this.actualPoiting = + this.actualPoiting + 100;
      this.timeLeft = 10;
      if (this.actualPoiting > localStorage['pontuação']) {
        localStorage['pontuação'] = this.actualPoiting;
        this.poiting = this.actualPoiting;
      }
    }
  }

  gameOver(): void{
    if(localStorage['pontuação'] > this.record && this.timeLeft === 0){
      Swal.fire({
        title: 'Boa, você ultrapassou seu recorde!',
        text: 'Seu recorde era de: ' + this.record + ' pontos, e agora é: ' + localStorage['pontuação'] + ' pontos! 😀' ,
        imageUrl: '../../../assets/giphy.gif',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        confirmButtonText: 'Valeu!',
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      this.record = localStorage['pontuação'];
    }
    this.timeLeft = 0;
    this.timerOver = true;
    this.inputValue = '';
    this.cantWrite = true;
    this.introductionText = 'Tempo esgotado! Clique no play para começar novamente'
    this.gameStarted = false;
    this.pauseTimer(this.interval)
    this.timeLeft = 10;
    this.startTimeLeft = 5;
    this.actualPoiting = 0;
  }

  startTimer(): void {
    this.cantWrite = false;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.gameOver();
      }
    },1000)
  }

  pauseTimer(interval: NodeJS.Timer): void {
    clearInterval(interval);
  }
}