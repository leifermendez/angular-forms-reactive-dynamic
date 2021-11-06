import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public formParent: FormGroup = new FormGroup({});//TODO: Declaramos el Form

  //TODO: Ciclo de vida
  ngOnInit(): void {

    this.initFormParent()

  }

  //TODO: FormGroup -> [FormArray, FormControls, FormGroup]
  initFormParent(): void {
    this.formParent = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        skills: new FormArray([], [Validators.required])
      }
    )
  }

  //TODO: Iniciar el formulario hijo (Skill) 🤣
  initFormSkill(): FormGroup {
    return new FormGroup(
      {
        language: new FormControl('', [Validators.required]),
        projectUrl: new FormControl(''),
        expYear: new FormControl('', [Validators.required])
      }
    )
  }

  //TODO: Agregar nuevo skill en form 🤨
  addSkill(): void {
    const refSkills = this.formParent.get('skills') as FormArray;
    refSkills.push(this.initFormSkill())
  }


  /**
   * 
   */

  //TODO: Obtener referencia a un formControl

  getCtrl(key: string, form: FormGroup): any {
    return form.get(key)
  }

  //TODO: Quitar validaciones 1,2,3,4 (language)
  removeValidation(index: number, key: string): void {

    const refParent = this.formParent.get('skills') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;

    refSingle.clearValidators();
    refSingle.updateValueAndValidity();

  }

  //TODO: Agregar validaciones
  addValidation(index: number, key: string): void {

    const refParent = this.formParent.get('skills') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;

    refSingle.setValidators(
      [
        Validators.required,
        Validators.email,
        Validators.minLength(5)
      ]
    )
    refSingle.updateValueAndValidity();
  }


}

