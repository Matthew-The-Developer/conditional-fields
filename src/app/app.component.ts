import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

interface Race {
  value: string;
  label: string;
}

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  conditionalGroup: FormGroup = new FormGroup({});
  races: Race[] = [
    { value: 'yuzzum', label: 'Yuzzum' },
    { value: 'utapaun', label: 'Utapaun' },
    { value: 'chagrian', label: 'Chagrian' },
    { value: 'talz', label: 'Talz' },
    { value: 'clawdites', label: 'Clawdites' },
    { value: 'kitonak', label: 'Kitonak' },
    { value: 'dressellians', label: 'Dressellians' },
    { value: 'arcona', label: 'Arcona' },
    { value: 'yarkora', label: 'Yarkora' },
    { value: 'kubaz', label: 'Kubaz' },
    { value: 'Dug', label: 'Dug' },
    { value: 'quarren', label: 'Quarren' },
    { value: 'gran', label: 'Gran' },
    { value: 'klatooinians', label: 'Klatooinians' },
    { value: 'devaronian', label: 'Devaronian' },
    { value: 'amanin', label: 'Amanin' },
    { value: 'ishiTib', label: 'Ishi Tib' },
    { value: 'ortolan', label: 'Ortolan' },
    { value: 'shistavanen', label: 'Shistavanen' },
    { value: 'gungans', label: 'Gungans' },
    { value: 'muun', label: 'Muun' },
    { value: 'aqualish', label: 'Aqualish' },
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }
    
  ngOnInit(): void {
    this.conditionalGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      isHuman: [true]
    });

    this.watchIsHuman();
  }

  get firstName(): AbstractControl | null {
    return this.conditionalGroup.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.conditionalGroup.get('lastName');
  }

  get isHuman(): AbstractControl | null {
    return this.conditionalGroup.get('isHuman');
  }

  get race(): AbstractControl | null {
    return this.conditionalGroup.get('race');
  }

  save(): void {
    this.conditionalGroup.markAllAsTouched();
    this.conditionalGroup.updateValueAndValidity();

    if (this.conditionalGroup.valid) {
      console.log(this.conditionalGroup.value);
    } else {
      this.snackBar.open('Invalid form', 'DISMISS', { duration: 3000 });
    }
  }

  reset(): void {
    this.conditionalGroup.reset();
  }

  private watchIsHuman(): void {
    this.isHuman!.valueChanges.pipe(
      untilDestroyed(this),
      tap((value: boolean) => {
        if (value !== null && !value) {
          if (this.conditionalGroup.contains('race')) {
            this.conditionalGroup.setControl('race', this.fb.control(null, Validators.required));
          } else {
            this.conditionalGroup.addControl('race', this.fb.control(null, Validators.required));
          }
        } else if (this.conditionalGroup.contains('race')) {
          this.conditionalGroup.removeControl('race');
        }
      })
    ).subscribe();
  }
}
