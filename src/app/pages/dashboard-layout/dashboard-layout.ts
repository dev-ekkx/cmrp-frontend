import {ChangeDetectionStrategy, Component, computed, inject, OnInit} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {RouterOutlet} from "@angular/router";
import {Message} from 'primeng/message';
import {Dialog} from 'primeng/dialog';
import {Auth} from '@/components/auth/auth';
import {UserStore} from '@/store/user-store';
import {Sidebar} from '@/components/sidebar/sidebar';
import {LoaderComponent} from "@/components/loader-component/loader-component";
import {checkTokenExpiry} from "@/lib/utils";

@Component({
    selector: 'cmrp-dashboard-layout',
    imports: [
        ButtonDirective,
        RouterOutlet,
        Message,
        Dialog,
        Auth,
        Sidebar,
        LoaderComponent
    ],
    templateUrl: './dashboard-layout.html',
    styleUrl: './dashboard-layout.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayout implements OnInit {
    protected userStore = inject(UserStore)
    protected user = this.userStore.userData()();
    protected auth = this.userStore.authData()()
    protected isSignedIn = computed(() => this.userStore.isUserSignedIn()());
    protected showAuthDialog = false

    protected isFetchingUser = computed(() => this.userStore.isLoading());

    ngOnInit() {
        const isTokenExpired = checkTokenExpiry(this.auth.expiry)
        if (this.isSignedIn() && !isTokenExpired) {
            this.userStore.fetchUserInfo()
        }
    }

    protected setAuthModalAfterAuthentication() {
        this.showAuthDialog = false
    }

}
