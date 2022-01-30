import {ApplicationRef, Component, OnInit} from '@angular/core';
import {Model} from "../model/repository.model";
import {Product} from "../model/product.model";
import {NgForm} from "@angular/forms";
import {ProductFormGroup} from "../model/form.model";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  form: any = new ProductFormGroup()
  showTable: boolean = true
  model: Model = new Model();

  getProduct(key: number): any {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts();
  }

  newProduct: any = new Product();

  get jsonProduct() {
    return JSON.stringify(this.newProduct);
  }

  addProduct(p: Product) {
    this.model.saveProduct(p);
    console.log("New Product: " + this.jsonProduct);
  }

  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            messages.push(`You must enter a ${thing}`);
            break;
          case "minlength":
            messages.push(`A ${thing} must be at least
             ${state.errors['minlength'].requiredLength} characters`);
            break;
          case "pattern":
            messages.push(`The ${thing} contains illegal characters`);
            break;
        }
      }
    }
    return messages;
  }

  getFormValidationMessages(form: NgForm): string[] {
    let messages: string[] = [];
    Object.keys(form.controls).forEach(k => {
      this.getValidationMessages(form.controls[k], k).forEach(m => messages.push(m));
    });
    return messages;
  }

  formSubmitted: boolean = false;

  // submitForm(form: NgForm) {
  //   this.formSubmitted = true;
  //   if (form.valid) {
  //     this.addProduct(this.newProduct);
  //     this.newProduct = new Product();
  //     form.reset();
  //     this.formSubmitted = false;
  //   }
  // }

  submitForm(form: any) {
    this.formSubmitted = true;
    if (form.valid) {
      this.addProduct(this.newProduct);
      this.newProduct = new Product();
      form.reset();
      this.formSubmitted = false;
    }
  }
}
