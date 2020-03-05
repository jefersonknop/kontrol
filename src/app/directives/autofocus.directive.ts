

import { Directive, ElementRef, AfterContentInit, Input, OnInit } from '@angular/core';


@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements OnInit{
  

  @Input() public autoFocus: boolean;

  constructor(private el: ElementRef) { }


  public ngOnInit():void{
     this.setFocus();
    
  }

  public setFocus(){
    setTimeout(()=>{    

      this.el.nativeElement.focus();
    },50);
  }

  

}
