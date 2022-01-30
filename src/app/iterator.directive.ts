import {
  ChangeDetectorRef,
  Directive,
  Input,
  IterableDiffer,
  IterableDiffers,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";

@Directive({
  selector: "[paForOf]"
})
export class PaIteratorDirective {
  differ!: IterableDiffer<any>

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<Object>,
              private differs: IterableDiffers,
              private changeDetector: ChangeDetectorRef
  ) {
  }

  @Input("paForOf")
  dataSource: any;

  ngOnInit() {
    //@ts-ignore
    this.differ = this.differs.find(this.dataSource).create(this.changeDetector)
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.dataSource);
    if (changes !== null) {
      console.log("ngDoCheck called, changes detected");
      changes.forEachAddedItem(addition => {
        this.container.createEmbeddedView(this.template,
          new PaIteratorContext(addition.item,
            // @ts-ignore
            addition.currentIndex, changes.length));
      });
    }
  }

  private updateContent() {
    this.container.clear();
    for (let i = 0; i < this.dataSource.length; i++) {
      this.container.createEmbeddedView(this.template,
        new PaIteratorContext(this.dataSource[i],
          i, this.dataSource.length));
    }
  }
}

class PaIteratorContext {
  odd!: boolean;
  even!: boolean;
  first!: boolean;
  last!: boolean;

  constructor(public $implicit: any,
              public index: number, total: number) {
    this.odd = index % 2 == 1;
    this.even = !this.odd;
    this.first = index == 0;
    this.last = index == total - 1;
    // setInterval(() => {
    //   this.odd = !this.odd; this.even = !this.even;
    //   this.$implicit.price++;
    // }, 2000);
  }
}
