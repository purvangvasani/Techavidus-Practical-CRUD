import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from './shared/services/products.service';
import { CustomValidator } from './shared/services/custom-validator';
import swal from 'sweetalert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public productId: any = '';
  public products: any = [];
  public totalPrice: any = 0;
  productName: any;
  public addProductForm: FormGroup;
  public errorMessage: any;
  public productModal: any = {
    productName: '',
    detail: '',
    price: 0,
    quantity: 0,
    totalPrice: 0,
  }

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getBy();

    this.buildProductForm();
  }

  onChangeEvent(event) {
    this.totalPrice = this.addProductForm.value['quantity'] * this.addProductForm.value['price']
  }

  getBy() {
    this.productService.GetProducts().subscribe(res => {
      console.log(res)
      this.products = res;
    });
  }

  onClose() {
    this.productName = null;
    this.productId = null;
    this.productModal = {
      productName: '',
      detail: '',
      price: 0,
      quantity: 0,
      totalPrice: 0,
    }
    this.imageSrc = null
    this.buildProductForm();
  }

  imageSrc: string;

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.addProductForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  buildProductForm = () => {
    this.addProductForm = this.formBuilder.group({
      productName: [this.productModal.productName, [Validators.required]],
      detail: [this.productModal.detail, [Validators.required]],
      price: [this.productModal.price, [Validators.required, CustomValidator.checkNumber]],
      quantity: [this.productModal.quantity, [Validators.required]],
      file: [''],
      fileSource: ['']
    });
  }

  delete(id: any, i: any) {
    let that = this
    swal("Delete", "Are you sure you want to delete?", "error", {
      buttons: {
        cancel: true,
        // confirm: "Confirm",
        ok: {
          text: "Delete!",
          value: "ok",
        },
      },
    }).then(function () {
      that.productService.deleteProduct(id).subscribe((res) => {
        that.products.splice(i, 1);
        console.log(that.products.length)
      })
    })
  }

  update(_id: any) {
    let index = this.products.findIndex(x => x._id === _id)
    this.productId = this.products[index]._id
    this.productModal.productName = this.products[index].productName;
    this.productModal.detail = this.products[index].detail;
    this.productModal.price = this.products[index].price;
    this.productModal.quantity = this.products[index].quantity;
    this.totalPrice = this.products[index].quantity * this.products[index].price
    this.imageSrc = this.products[index].file
    this.buildProductForm()
  }

  onUpdate(): any {
    this.addProductForm.value['totalPrice'] = this.totalPrice;
    this.addProductForm.value['fileSource'] = this.imageSrc;
    this.productService.updateProduct(this.productId, this.addProductForm.value)
      .subscribe(() => {
        this.onClose()
        this.getBy()
        this.buildProductForm()
        console.log('Data updated successfully!')
      }, (err) => {
        console.log(err);
      });
  }

  addProduct = () => {
    if (this.addProductForm.valid) {
      this.errorMessage = '';
      let productData = {
        productName: this.addProductForm.value.productName,
        detail: this.addProductForm.value.detail,
        price: this.addProductForm.value.price,
        quantity: this.addProductForm.value.quantity,
        totalPrice: this.totalPrice
      }
      this.productService.add(productData).subscribe(res => {
        this.onClose()
        this.getBy();
        this.buildProductForm()
      }, (err) => {
        console.log(err);
      });
    } else {
      this.errorMessage = 'Form not filled Properly';
    }
  }
}