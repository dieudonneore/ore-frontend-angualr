import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public continents: any =[];
  public filterContinents: any =[];
  public translateData: any = [];
  public translateDatas: any = [];
  public headersContinentsTable = ["Code", "Name"];
  public headersContinentsTableFr = ["Code", "Nom"];

  public iscliked: boolean = false;
  public displayLanguage: string="en";
  public dataFr:any =[];

  public code: string='';
  public name: string='';
  public keyword: string='';
  public translated: any;

  constructor(private homeservice: HomeService) {}

  ngOnInit(): void {
    this.getData();
    this.fiterDataEN();
    this.fiterDataFR();
  }

  public englich(){
    this.iscliked = true;
    this.displayLanguage="en"
  }
  public french(){
    this.iscliked = true;
    this.displayLanguage="fr"
  }

  public getData(){
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

  public fiterDataEN(){
    this.homeservice.filterData(this.code, this.name, this.keyword)
    .subscribe(data => {
      this.filterContinents=data;
      console.log(this.filterContinents);
    })
  }
  public fiterDataFR(){
    this.homeservice.filterData(this.code, this.name, this.keyword)
    .subscribe(data => {
      this.translateData=data;
      this.translateData.forEach((e: any) => {
        this.translated= e.translation['0'];
        this.translateDatas.push(this.translated);
      });
      this.dataFr = this.translateDatas.splice(0, 8);
      console.log(this.dataFr);

    })
  }
}
