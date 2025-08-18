import {bootstrapApplication} from '@angular/platform-browser';
import {cmrpConfig} from './app/cmrp.config';
import {Cmrp} from './app/cmrp';
import {Amplify} from 'aws-amplify';
import {environment} from '@/environments/environment';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: environment.userPoolId,
      userPoolClientId: environment.userClientPoolId,
      identityPoolId: environment.identityPoolId
    }
  }
});

bootstrapApplication(Cmrp, cmrpConfig)
  .catch((err) => console.error(err));
