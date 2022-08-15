import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActService} from "src/app/core/service/act/act.service";
import {PlanCategoryService} from "../../../../../core/service/planCategory/plan-category.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  act={
    label:'',
    description:'',
    basePrice:'',
    planCategory: {
      id:''
    }
  }
  planCategories: any[];
  constructor( private actService:ActService,private planCategoryService:PlanCategoryService) { }

  submitted: boolean = false;

  success = {
    message: 'Act created successfully',
    actId: 0
  };

  ngOnInit(): void {
    this.planCategoryService.getAll().subscribe((data) => {
      this.planCategories = data;
    });
  }

  saveAct(){
    console.log(this.act)
    const data={
      label: this.act.label,
      description:this.act.description,
      basePrice:this.act.basePrice,
      planCategory:{
        id:this.act.planCategory.id
      }
    }
    console.log(data);
    this.actService.create(data).subscribe({
      next : (data:any)=>{
        this.submitted=true;
        this.success.actId = data.id;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  newAct(){
    this.submitted=false;
    this.act={
      label: '',
      description:'',
      basePrice:'',
      planCategory: {
        id:''
      }
    }
  }
}
