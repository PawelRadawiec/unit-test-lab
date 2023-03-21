import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum ButtonType {
  PRIMARY = 'primary',
  DANGER = 'danger',
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() type = ButtonType.PRIMARY;
  @Input() outline: boolean;
  @Output() onClick = new EventEmitter<void>();

  buttonTypes = ButtonType;
  
  constructor() {}

  ngOnInit() {}

  handleClick() {
    this.onClick.next();
  }
}
