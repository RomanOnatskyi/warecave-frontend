import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthContentComponent } from './components/content/auth-content.component';
import { SignUpComponent } from './components/sign-up.component';
import { SignInComponent } from './components/sign-in.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        TranslateModule,
    ],
    declarations: [
        AuthContentComponent,
        SignUpComponent,
        SignInComponent,
    ],
})
export class AuthModule {}
