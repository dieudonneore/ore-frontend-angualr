import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

interface Continent {
  _id: string;
  Code: string;
  Name: number;
  translation: [];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchTerm = '';
  continents: any =[];
  filterContinents: any =[];
  translateData: any = [];
  term = '';
  headersContinentsTable = ["Code", "Name"];
  headersContinentsTableFr = ["Code", "Nom"];

  iscliked: boolean = false;
  displayLanguage: string="en";

  public code: string='';
  public name: string='';
  public keyword: string='';
  translated: any;

  constructor(private homeservice: HomeService) {}

  ngOnInit(): void {
    this.getData();
    this.fiterDataEN();
  }

  englich(){
    this.iscliked = true;
    this.displayLanguage="en"
  }
  french(){
    this.iscliked = true;
    this.displayLanguage="fr"
  }

  getData(){
    this.homeservice.loadData()
    .subscribe(data => {
      this.continents = data;
      console.log(this.continents);
      this.continents.forEach((e: any) => {
        this.translated= e.translation['0'];
        this.translateData.push(this.translated);
      });
      console.log(this.translateData);
    })
  }

  fiterDataEN(){
    this.homeservice.filterData(this.code, this.name, this.keyword)
    .subscribe(data => {
      this.filterContinents=data;
      console.log(this.filterContinents);
    })
  }
  fiterDataFR(){
    console.log('data')
  }
}
