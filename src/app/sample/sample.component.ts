import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service'

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {

   constructor(private general: GeneralService) { }

   ngOnInit(): void {

      this.general.getSample().subscribe(data =>{
         console.log(data);
      });
   }



}
