import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../service/user.service';
//DATATABLE
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
//MODAL DIALOG
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../service/dialog.service';
// NOTIFICATION SERVICE
import { NotificationService } from '../../service/notification.service';
//MODELO
import { User } from '../../model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [UsersService],
})
export class UserComponent implements OnInit {
  save = true;
  edit = false;
  id: number;
  fullname: string;
  username: string;
  age: number;
  user: User;
  noData: boolean = false;
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Fullname', 'Username', 'Age', 'actions'];

  searchKey: string;
  //Directives
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public service: UsersService,
    private dialog: MatDialog,
    public dialogService: DialogService,
    public notificationService: NotificationService
  ) {
    this.service.getUsers().subscribe((users) => {
      console.log(users);

      if (users.length === 0) {
        this.noData = true;
      }

      this.listData = new MatTableDataSource(users);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }

  ngOnInit(): void {}

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onEditForm(row) {
    const { id, fullname, username, age } = row;
    this.id = id;
    this.fullname = fullname;
    this.username = username;
    this.age = age;

    //change form
    this.edit = true;
    this.save = false;
  }
  onSaveForm(e) {
    console.log(e);
    this.edit = false;
    this.save = true;
  }

  onDelete(row) {
    const id = row.id;
    console.log(id);
    this.dialogService
      .openConfirmDialog('Estas seguro de eliminar el registro ?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          try {
            this.service.deleteUser(id).subscribe((res) => {
              console.log(res);

              this.notificationService.warn(`!${res.message}!`);
            });
          } catch (error) {
            console.log(error);
          }
        }
      });
  }
}
