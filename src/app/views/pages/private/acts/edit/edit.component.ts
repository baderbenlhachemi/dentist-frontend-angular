import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActService} from "src/app/core/service/act/act.service";
import {PlanCategoryService} from "../../../../../core/service/planCategory/plan-category.service";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:string | number=this.route.snapshot.paramMap.get('id')||0
  act={
    id:+this.id,
    label:'',
    description:'',
    basePrice:'',
    planCategory: {
      id:''
    }
  }
  planCategories: any[];
  constructor(private route:ActivatedRoute,private actService:ActService,private planCategoryService:PlanCategoryService) { }

  submitted: boolean = false;

  success = {
    message: 'Act updated successfully',
    actId: this.act.id
  };
  ngOnInit(): void {
    this.planCategoryService.getAll().subscribe((data) => {
       this.planCategories = data;
    });

    this.actService.get(this.act.id).subscribe((data)=>{
      console.log(data);
      this.act.label=data.label;
      this.act.description=data.description;
      this.act.basePrice=data.basePrice;
      this.act.planCategory.id=data.planCategory.id;
      console.log(this.act);
    })

  }
  updateAct(){
    const data={
      label: this.act.label,
      description:this.act.description,
      basePrice:this.act.basePrice,
      planCategory:{
        id:this.act.planCategory.id
      }
    }
    console.log(data)
    this.actService.update(this.act.id,data).subscribe({
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

}
