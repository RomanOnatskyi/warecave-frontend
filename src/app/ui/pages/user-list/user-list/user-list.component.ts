import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';
import { User } from '../../../../responses/user-list-response';
import { UserRole } from '../../../../app-state.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {

    constructor(
        private userListService: UserListService,
    ) {}

    async ngOnInit() {

        this.users = await this.getAllUsers();
    }

    users: User[];
    userTypes = {
        [UserRole.Analyst]: "Аналітик",
        [UserRole.StoreAdmin]: "Адміністратор магазину",
    };

    private async getAllUsers() {

        const userListResponse = await this.userListService.getUsers().toPromise();

        const error = [ userListResponse.errors ];

        this.showError(error);

        return userListResponse.userList;
    }

    async deleteUser(userId: number) {

        const response = await this.userListService.deleteUser(userId).toPromise();

        this.showError([ response.errors ]);

        this.users = await this.getAllUsers();
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
